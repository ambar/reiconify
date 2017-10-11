const isAsyncSupported = () => {
  try {
    new Function('async () => {}')
    return true
  } catch (_) {
    return false
  }
}

module.exports = require(`./${isAsyncSupported() ? 'lib' : 'lib_node6'}`)
