const path = require('path')
const webpack = require('webpack')

const resolveCwd = path.resolve.bind(null, process.env.CWD)
const userPkg = require(resolveCwd('package.json'))

module.exports = {
  home: '🏠',
  title: userPkg.name,
  buildPath: resolveCwd('dist'),
  webpack(config) {
    config.plugins.push(
      new webpack.EnvironmentPlugin({REICONIFY_SHOW_ALIGN: false})
    )
    config.resolve.alias = {
      '~cwd/README.md': resolveCwd('README.md'),
      ...config.resolve.alias,
      '~icons': process.env.SRC_DIR,
    }
    return config
  },
}
