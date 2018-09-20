const fs = require('fs')
const path = require('path')
const {promisify} = require('util')
const babel = require('@babel/core')
const globby = require('globby')
const mkdirp = require('mkdirp')
const log = require('fancy-log')
const prettier = require('./prettier')
const resolveConfig = require('./resolveConfig')
const svg2jsx = require('./svg2jsx')

const getIndex = async (names, log = log) => {
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

const transform = async (options = {shouldWriteFiles: true}) => {
  const {
    inputs,
    src,
    es,
    cjs,
    srcDir,
    esDir,
    cjsDir,
    shouldWriteFiles = true,
    template: optionsTemplate,
  } = options
  if (!inputs || (Array.isArray(inputs) && !inputs.length)) {
    throw new Error('Missing input files')
  }

  if (!srcDir && !esDir && !cjsDir && shouldWriteFiles) {
    throw new Error('Missing output directory')
  }

  const files = await globby(inputs)
  if (!files.length) {
    throw new Error('Cannot find source files')
  }

  const {
    template: configTemplate,
    baseTemplate,
    defaultProps,
    baseDefaultProps,
    baseMapProps,
    filenameTemplate,
    svgoPlugins,
    camelCaseProps,
  } = await resolveConfig()

  const transFormLog = shouldWriteFiles ? log : () => {}
  const template = optionsTemplate || configTemplate

  transFormLog('transforming icons...')
  const contents = await Promise.all(
    files.map(async file => {
      const svg = String(await promisify(fs.readFile)(file))
      const name = filenameTemplate(path.basename(file, '.svg'))
      const jsxString = await svg2jsx(svg, {svgoPlugins, camelCaseProps})
      const code = prettier(template({name, defaultProps, jsxString}))
      return {name, code}
    })
  )

  const namesToExport = contents.map(({name}) => name)
  contents.push(
    {
      name: 'Icon',
      code: prettier(baseTemplate({baseDefaultProps, baseMapProps})),
    },
    {name: 'index', code: await getIndex(namesToExport, transFormLog)}
  )

  if (shouldWriteFiles) {
    if (src) {
      log('writing src files...')
      const srcPath = resolveDir(srcDir)
      await writeFiles(contents, srcPath)
    }

    if (es) {
      log('writing es files...')
      const esPath = resolveDir(esDir)
      const transformedContents = babelTransform(contents, 'es')
      await writeFiles(transformedContents, esPath)
    }

    if (cjs) {
      log('writing cjs files...')
      const cjsPath = resolveDir(cjsDir)
      const transformedContents = babelTransform(contents, 'cjs')
      await writeFiles(transformedContents, cjsPath)
    }
  }
  return contents
}

module.exports = transform
