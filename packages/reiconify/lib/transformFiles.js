const fs = require('fs')
const path = require('path')
const {promisify} = require('util')
const globby = require('globby')
const mkdirp = require('mkdirp')
const log = require('fancy-log')
const prettier = require('./prettier')
const resolveConfig = require('./resolveConfig')
const transform = require('./transform')
const esTransform = require('./esTransform')

const getIndex = async (names) => {
  names = names.slice().sort()
  const lines = names.map(
    (name) => `export {default as ${name}} from './${name}'`
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

const esTransformContents = (contents, options) => {
  return Promise.all(
    contents.map(async ({name, code}) => ({
      name,
      code: await esTransform(code, options),
    }))
  )
}

const resolveDir = (dir) =>
  path.isAbsolute(dir) ? dir : path.resolve(process.cwd(), dir)

const transformFiles = async (options = {}) => {
  if (
    !options.inputs ||
    (Array.isArray(options.inputs) && !options.inputs.length)
  ) {
    throw new Error('Missing input files')
  }

  if (!options.srcDir && !options.esDir && !options.cjsDir) {
    throw new Error('Missing output directory')
  }

  const cwd = options.cwd || process.cwd()
  const files = await globby(options.inputs, {cwd})
  if (!files.length) {
    throw new Error('Cannot find source files')
  }

  const {
    baseName,
    baseClassName,
    template,
    baseTemplate,
    defaultProps,
    baseDefaultProps,
    filenameTemplate,
    svgoPlugins,
    camelCaseProps,
  } = await resolveConfig(cwd)

  log('transforming icons...')
  const contents = await Promise.all(
    files.map(async (file) => {
      const filePath = path.resolve(cwd, file)
      const svg = String(await promisify(fs.readFile)(filePath))
      const name = filenameTemplate(path.basename(file, '.svg'))
      const code = await transform(svg, {
        name,
        baseName,
        baseClassName,
        template,
        defaultProps,
        svgoPlugins,
        camelCaseProps,
        // format source only
        usePrettier: true,
      })
      return {name, code}
    })
  )

  const namesToExport = contents.map(({name}) => name)
  contents.push(
    {
      name: 'Icon',
      code: prettier(baseTemplate({baseDefaultProps})),
    },
    {name: 'index', code: await getIndex(namesToExport)}
  )

  const operations = [
    async () => {
      if (options.src) {
        log('writing src files...')
        const srcPath = resolveDir(options.srcDir)
        await writeFiles(contents, srcPath)
      }
    },

    async () => {
      if (options.es) {
        log('writing esm files...')
        const esPath = resolveDir(options.esDir)
        const transformedContents = await esTransformContents(contents, {
          format: 'esm',
        })
        await writeFiles(transformedContents, esPath)
      }
    },

    async () => {
      if (options.cjs) {
        log('writing cjs files...')
        const cjsPath = resolveDir(options.cjsDir)
        const transformedContents = await esTransformContents(contents, {
          format: 'cjs',
        })
        await writeFiles(transformedContents, cjsPath)
      }
    },
  ]

  await Promise.all(operations.map((f) => f()))
}

module.exports = transformFiles
