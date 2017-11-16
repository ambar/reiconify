const path = require('path')
const yargs = require('yargs')
const shell = require('shelljs')
const transform = require('./transform')

yargs
  .option('src', {
    describe: 'Build JSX source files',
    type: 'boolean',
    default: false,
  })
  .option('es', {
    describe: 'Build ES module files',
    type: 'boolean',
    default: false,
  })
  .option('cjs', {
    describe: 'Build CommonJS files',
    type: 'boolean',
    default: false,
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
  const resolveBin = name => resolveRelative('../node_modules/.bin', name)

  if (argv.serve) {
    const config = resolveRelative('../playland.config.js')
    shell.exec(`BABEL_ENV=docs ${resolveBin('playland')} --config ${config}`)
  } else if (argv.static) {
    const config = resolveRelative('../playland.config.js')
    shell.exec(
      `BABEL_ENV=docs ${resolveBin('playland')} --build --config ${config}`
    )
  } else if (argv.src || argv.es || argv.cjs) {
    await transform({
      inputs: argv._,
      src: argv.src,
      es: argv.es,
      cjs: argv.cjs,
      srcDir: argv.srcDir || 'src',
      esDir: argv.esDir || 'es',
      cjsDir: argv.cjsDir || 'cjs',
    })
  }
}

module.exports = run
