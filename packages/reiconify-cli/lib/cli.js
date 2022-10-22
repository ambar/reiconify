const path = require('path')
const yargs = require('yargs')
const {shell} = require('execa')
const transformFiles = require('reiconify/lib/transformFiles')
const {ensureTemplate} = require('./copy')

const resolveCwd = path.resolve.bind(null, process.cwd())
const resolveCli = path.resolve.bind(null, __dirname, '..')

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
  const root = resolveCwd('.reiconify')
  const shellOpts = {
    // use CLI's .playland/config
    cwd: resolveCli(),
    stdio: 'inherit',
    env: {CWD: process.cwd(), SRC_DIR: path.resolve(argv.srcDir)},
  }
  if (argv.serve) {
    await ensureTemplate(root)
    await shell(`playland start ${root}`, shellOpts)
  } else if (argv.static) {
    await ensureTemplate(root)
    await shell(`playland build ${root}`, shellOpts)
  } else if (argv.src || argv.es || argv.cjs) {
    await transformFiles({
      ...argv,
      inputs: argv._,
    })
  } else {
    yargs.showHelp()
  }
}

module.exports = run
