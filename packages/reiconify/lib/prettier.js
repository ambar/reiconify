const prettier = require('prettier')

const prettierConfig = Object.assign(
  {parser: 'babel'},
  require('../prettier.config.js')
)

exports.format = (code) => prettier.format(code, prettierConfig)
