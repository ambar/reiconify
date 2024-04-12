const {pascalCase} = require('pascal-case')

module.exports = {
  filenameTemplate: (name) => `Md${pascalCase(name)}`,
}
