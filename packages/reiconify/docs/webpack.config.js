const fs = require('fs')
const path = require('path')

const resolvePath = path.resolve.bind(null, __dirname)
const docDir = resolvePath('.')
const srcDir = path.resolve(process.cwd(), 'src')

module.exports = {
  output: {
    publicPath: process.env.PUBLIC_PATH || '/',
  },
  node: {
    fs: 'empty',
  },
  resolve: {
    alias: {
      '~icons': srcDir,
    },
    modules: [resolvePath('../node_modules')],
  },
  resolveLoader: {
    modules: [resolvePath('../node_modules')],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [docDir, srcDir],
        exclude: [resolvePath('./webpack.config.js')],
        use: fs.existsSync('babel.config.js')
          ? 'babel-loader'
          : {
              loader: 'babel-loader',
              options: require('../.babelrc.js'),
            },
      },
      {
        test: /\.css$/,
        loaders: [
          'style-loader',
          {
            loader: 'css-loader',
            query: {
              modules: true,
              importLoaders: 1,
              localIdentName: '[name]-[local]-[hash:base64:4]',
            },
          },
          'postcss-loader',
        ],
        include: docDir,
      },
    ],
  },
}
