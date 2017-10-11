require('util.promisify/shim')()

exports.cli = require('./cli')
exports.transform = require('./transform')
exports.resolveConfig = require('./resolveConfig')
