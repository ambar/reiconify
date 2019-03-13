const path = require('path')
const yargs = require('yargs')
const {shell} = require('execa')
const transformFiles = require('reiconify/lib/transformFiles')

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
  const root = path.resolve(__dirname, '..')
  const shellOpts = {
    cwd: root,
    stdio: 'inherit',
    env: {CWD: process.cwd(), SRC_DIR: path.resolve(argv.srcDir)},
  }
  if (argv.serve) {
    await shell(`playland`, shellOpts)
  } else if (argv.static) {
    await shell(`playland --build`, shellOpts)
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
