const path = require('path')
const yargs = require('yargs')
const shell = require('shelljs')
const which = require('npm-which')(__dirname)
const transformFiles = require('./transformFiles')

yargs
  .option('src', {
    describe: 'Build JSX source files',
    type: 'boolean',
    default: false,
  })
  .option('src-dir', {
    describe: 'JSX output directory',
    type: 'string',
    default: 'src',
  })
  .option('es', {
    describe: 'Build ES module files',
    type: 'boolean',
    default: false,
  })
  .option('es-dir', {
    describe: 'ES output directory',
    type: 'string',
    default: 'es',
  })
  .option('cjs', {
    describe: 'Build CommonJS files',
    type: 'boolean',
    default: false,
  })
  .option('cjs-dir', {
    describe: 'CommonJS output directory',
    type: 'string',
    default: 'cjs',
  })
  .option('serve', {
    describe: 'Serve source icons',
    type: 'boolean',
    default: false,
  })
  .option('static', {
    describe: 'Build static site',
    type: 'boolean',
    default: false,
  })
  .detectLocale(false)
  .help('h')

const argv = yargs.argv

const run = async () => {
  const resolveRelative = path.resolve.bind(null, __dirname)
  const resolveBin = name => which.sync(name)

  if (argv.serve) {
    const config = resolveRelative('../playland.config.js')
    shell.exec(`BABEL_ENV=docs ${resolveBin('playland')} --config ${config}`)
  } else if (argv.static) {
    const config = resolveRelative('../playland.config.js')
    shell.exec(
      `BABEL_ENV=docs ${resolveBin('playland')} --build --config ${config}`
    )
  } else if (argv.src || argv.es || argv.cjs) {
    await transformFiles({
      inputs: argv._,
      src: argv.src,
      es: argv.es,
      cjs: argv.cjs,
      srcDir: argv.srcDir,
      esDir: argv.esDir,
      cjsDir: argv.cjsDir,
    })
  }
}

module.exports = run
