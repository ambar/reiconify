#!/usr/bin/env node

const yargs = require('yargs')
const transformFiles = require('../lib/transformFiles')

yargs
  .option('src', {
    describe: 'Whether to output JSX files',
    type: 'boolean',
    default: false,
  })
  .option('src-dir', {
    describe: 'JSX output directory',
    type: 'string',
    default: 'src',
  })
  .option('es', {
    describe: 'Whether to output ES module files',
    type: 'boolean',
    default: false,
  })
  .option('es-dir', {
    describe: 'ES output directory',
    type: 'string',
    default: 'es',
  })
  .option('cjs', {
    describe: 'Whether to output CommonJS files',
    type: 'boolean',
    default: false,
  })
  .option('cjs-dir', {
    describe: 'CommonJS output directory',
    type: 'string',
    default: 'cjs',
  })
  .option('svg', {
    describe: 'Whether to output optimized SVG files',
    type: 'boolean',
    default: false,
  })
  .option('svg-dir', {
    describe: 'Optimized SVG output directory',
    type: 'string',
    default: 'svg',
  })
  .option('svg-rename', {
    describe:
      'Whether to rename optimized SVG files (based on filename template)',
    type: 'boolean',
    default: true,
  })
  .detectLocale(false)
  .help('h')

const run = async () => {
  const argv = yargs.argv
  if (argv.src || argv.es || argv.cjs || argv.svg) {
    await transformFiles({...argv, inputs: argv._})
  } else {
    yargs.showHelp()
  }
}

run()
