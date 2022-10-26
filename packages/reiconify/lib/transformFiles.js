const fsp = require('fs/promises')
const path = require('path')
const globby = require('globby')
const log = require('fancy-log')
const prettier = require('./prettier')
const resolveConfig = require('./resolveConfig')
const transform = require('./transform')
const esTransform = require('./esTransform')
const {optimize} = require('./svg2jsx')

const getIndex = (names, {indexTemplate}) => {
  log(`exporting ${names.length} icons: ${names.join(', ')}`)
  return prettier(indexTemplate(names))
}

const writeFiles = async (contents, path, ext = 'js') => {
  if (!(await fsp.stat(path).catch(() => false))) {
    await fsp.mkdir(path, {recursive: true})
  }

  return await Promise.all(
    contents.map(({name, code}) =>
      fsp.writeFile(`${path}/${name}.${ext}`, code)
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

  const shouldOutputJS = !!(options.srcDir || options.esDir || options.cjsDir)
  const shouldOutputSVG = !!options.svgDir
  if (!shouldOutputJS && !shouldOutputSVG) {
    throw new Error('Missing output directory')
  }

  const cwd = options.cwd || process.cwd()
  const files = await globby(options.inputs, {cwd})
  if (!files.length) {
    throw new Error('Cannot find source files')
  }

  const {
    baseName = './Icon',
    baseClassName,
    template,
    baseTemplate,
    defaultProps,
    baseDefaultProps,
    filenameTemplate,
    indexTemplate,
    svgoPlugins,
    camelCaseProps,
  } = await resolveConfig(cwd)

  log('transforming icons...')
  const contents = await Promise.all(
    files.map(async (file) => {
      const filePath = path.resolve(cwd, file)
      const content = String(await fsp.readFile(filePath))
      const basename = path.basename(file, '.svg')
      const name = filenameTemplate(basename)
      return {name, basename, content}
    })
  )

  let jsContents = []
  if (shouldOutputJS) {
    jsContents = await Promise.all(
      contents.map(async ({content, name}) => {
        const code = await transform(content, {
          name,
          baseName,
          baseClassName,
          template,
          defaultProps,
          svgoPlugins,
          camelCaseProps,
          // format source only
          usePrettier: true,
          format: 'jsx',
        })
        return {name, code}
      })
    )
    jsContents.push(
      // generate base icon
      {
        name: 'Icon',
        code: prettier(baseTemplate({baseDefaultProps})),
      },
      // generate index.js
      {
        name: 'index',
        code: await getIndex(
          contents.map(({name}) => name),
          {indexTemplate}
        ),
      }
    )
  }

  const operations = [
    async () => {
      if (options.src) {
        log('writing src files...')
        const srcPath = resolveDir(options.srcDir)
        await writeFiles(jsContents, srcPath, 'jsx')
      }
    },

    async () => {
      if (options.es) {
        log('writing esm files...')
        const esPath = resolveDir(options.esDir)
        const transformedContents = await esTransformContents(jsContents, {
          format: 'esm',
        })
        await writeFiles(transformedContents, esPath)
      }
    },

    async () => {
      if (options.cjs) {
        log('writing cjs files...')
        const cjsPath = resolveDir(options.cjsDir)
        const transformedContents = await esTransformContents(jsContents, {
          format: 'cjs',
        })
        await writeFiles(transformedContents, cjsPath)
      }
    },

    async () => {
      if (options.svg) {
        log('writing svg files...')
        const svgPath = resolveDir(options.svgDir)
        const svgContents = await Promise.all(
          contents.map(async ({name, basename, content}) => ({
            name: options.svgRename ? name : basename,
            code: await optimize(content, {svgoPlugins}),
          }))
        )
        await writeFiles(svgContents, svgPath, 'svg')
      }
    },
  ]

  await Promise.all(operations.map((f) => f()))
}

module.exports = transformFiles
