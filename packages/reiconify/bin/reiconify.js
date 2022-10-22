#!/usr/bin/env node

const yargs = require('yargs')
const transformFiles = require('../lib/transformFiles')

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
  .detectLocale(false)
  .help('h')

const run = async () => {
  const argv = yargs.argv
  if (argv.src || argv.es || argv.cjs) {
    await transformFiles({...argv, inputs: argv._})
  } else {
    yargs.showHelp()
  }
}

run()
