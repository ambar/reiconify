const prettier = require('prettier')

const prettierConfig = Object.assign(
  {parser: 'babel'},
  require('../prettier.config.js')
)

module.exports = code => prettier.format(code, prettierConfig)
