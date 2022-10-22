#!/usr/bin/env node

const path = require('path')
const yargs = require('yargs')
const {shell} = require('execa')
const {ensureTemplate} = require('../lib/copy')

yargs
  .option('src-dir', {
    describe: 'JSX output directory',
    type: 'string',
    default: 'src',
  })
  .option('build', {
    describe: 'Build static site',
    type: 'boolean',
    default: false,
  })
  .detectLocale(false)
  .help('h')

const argv = yargs.argv
const resolveCwd = path.resolve.bind(null, process.cwd())
const resolveCli = path.resolve.bind(null, __dirname, '..')
const root = resolveCwd('.reiconify')
const shellOpts = {
  // use CLI's .playland/config
  cwd: resolveCli(),
  stdio: 'inherit',
  env: {CWD: process.cwd(), SRC_DIR: path.resolve(argv.srcDir)},
}

const run = async () => {
  if (argv.build) {
    await ensureTemplate(root)
    await shell(`playland build ${root}`, shellOpts)
  } else {
    await ensureTemplate(root)
    await shell(`playland start ${root}`, shellOpts)
  }
}

run()
