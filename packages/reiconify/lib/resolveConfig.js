const cosmiconfig = require('cosmiconfig')
const merge = require('lodash/merge')
const pkg = require('../package.json')
const defaultConfig = require('./defaultConfig')

module.exports = async () => {
  const result = await cosmiconfig(pkg.name).load(process.cwd())
  return merge({}, defaultConfig, result && result.config)
}
