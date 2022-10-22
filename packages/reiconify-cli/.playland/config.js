const path = require('path')

const resolveCli = path.resolve.bind(null, __dirname, '..')
const resolveCwd = path.resolve.bind(null, process.env.CWD)

module.exports = {
  vite(/** @type {import('vite').UserConfig} */ config) {
    config.base = process.env.PUBLIC_PATH || '/'
    config.resolve.alias = {
      ...config.resolve.alias,
      'reiconify:cwd': resolveCwd(),
      'reiconify:cli': resolveCli(),
      'reiconify:icons': process.env.SRC_DIR,
    }
  },
}
