import path from 'path'
import webpack from 'webpack'
import {createFsFromVolume, Volume} from 'memfs'

// https://webpack.js.org/contribute/writing-a-loader/#testing
export default function compiler(fixture) {
  const compiler = webpack({
    context: __dirname,
    entry: `./${fixture}`,
    experiments: {
      outputModule: true,
    },
    externals: {
      react: 'React',
    },
    output: {
      libraryTarget: 'module',
      path: path.resolve(__dirname),
      filename: 'bundle.js',
    },
    module: {
      rules: [
        {
          test: /\.svg$/,
          oneOf: [
            {
              resourceQuery: /react/,
              use: require.resolve('../index.ts'),
            },
          ],
        },
      ],
    },
  })

  compiler.outputFileSystem = createFsFromVolume(new Volume())
  compiler.outputFileSystem.join = path.join.bind(path)

  return new Promise<webpack.Stats>((resolve, reject) => {
    compiler.run((err, stats) => {
      if (err) reject(err)
      if (stats?.hasErrors()) reject(stats.toJson().errors)

      resolve(stats!)
    })
  })
}
