const {lilconfig} = require('lilconfig')
const merge = require('concat-merge')
const pkg = require('../package.json')
const defaultConfig = require('./defaultConfig')

module.exports = async (cwd = process.cwd()) => {
  const result = await lilconfig(pkg.name)
    .load(cwd)
    .catch((e) => {
      console.error(e)
    })
  return merge(defaultConfig, result && result.config)
}
