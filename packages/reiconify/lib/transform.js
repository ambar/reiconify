const fs = require('fs')
const path = require('path')
const {promisify} = require('util')
const babel = require('babel-core')
const globby = require('globby')
const mkdirp = require('mkdirp')
const svgReactTransformer = require('@mapbox/svg-react-transformer')
const log = require('fancy-log')
const prettier = require('./prettier')
const resolveConfig = require('./resolveConfig')

const getIndex = async names => {
  names = names.slice().sort()
  const lines = names.map(
    name => `export {default as ${name}} from './${name}'`
  )
  log(`exporting ${names.length} icons: ${names.join(', ')}`)
  return prettier(lines.join('\n'))
}

const writeFiles = async (contents, path) => {
  if (!fs.existsSync(path)) {
    await promisify(mkdirp)(path)
  }

  return await Promise.all(
    contents.map(({name, code}) =>
      promisify(fs.writeFile)(`${path}/${name}.js`, code)
    )
  )
}

const babelRc = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, '../.babelrc'))
)

const getBabelOptions = env => {
  const options = babelRc.env[env] || {}
  return Object.assign({}, options, {
    plugins: (babelRc.plugins || []).concat(options.plugins || []),
  })
}

const babelTransform = (contents, env) => {
  return contents.map(({name, code}) => ({
    name,
    code: babel.transform(code, getBabelOptions(env)).code,
  }))
}

const resolveDir = dir =>
  path.isAbsolute(dir) ? dir : path.resolve(process.cwd(), dir)

const transform = async (options = {}) => {
  if (
    !options.inputs ||
    (Array.isArray(options.inputs) && !options.inputs.length)
  ) {
    throw new Error('Missing input files')
  }

  if (!options.srcDir && !options.esDir && !options.cjsDir) {
    throw new Error('Missing output directory')
  }

  const files = await globby(options.inputs)
  if (!files.length) {
    throw new Error('Cannot find source files')
  }

  const {
    template,
    baseTemplate,
    defaultProps,
    baseDefaultProps,
    filenameTemplate,
    svgoPlugins,
  } = await resolveConfig()

  log('transforming icons...')
  const contents = await Promise.all(
    files.map(async file => {
      const svg = await promisify(fs.readFile)(file)
      const name = filenameTemplate(path.basename(file, '.svg'))
      const code = await svgReactTransformer.toComponentModule(svg, {
        name,
        template,
        defaultProps,
        svgoPlugins,
      })
      return {name, code}
    })
  )

  const namesToExport = contents.map(({name}) => name)
  contents.push(
    {name: 'Icon', code: baseTemplate({baseDefaultProps})},
    {name: 'index', code: await getIndex(namesToExport)}
  )

  if (options.src) {
    log('writing src files...')
    const srcPath = resolveDir(options.srcDir)
    await writeFiles(contents, srcPath)
  }

  if (options.es) {
    log('writing es files...')
    const esPath = resolveDir(options.esDir)
    const transformedContents = babelTransform(contents, 'es')
    await writeFiles(transformedContents, esPath)
  }

  if (options.cjs) {
    log('writing cjs files...')
    const cjsPath = resolveDir(options.cjsDir)
    const transformedContents = babelTransform(contents, 'cjs')
    await writeFiles(transformedContents, cjsPath)
  }
}

module.exports = transform
