import fsp from 'fs/promises'
import transform from 'reiconify/lib/transform'

/**
 * Convert SVG files to React icons
 *
 * @type {() => import('vite').Plugin}
 */
export default function reiconify({
  pattern = /\.svg\?react$/,
  native = false,
} = {}) {
  return {
    name: 'vite-plugin-reiconify',
    enforce: 'pre',
    async load(id) {
      if (pattern.test(id)) {
        const [file] = id.split('?')
        const source = await (await fsp.readFile(file)).toString()
        return {
          code: await transform(
            source,
            native ? {native} : {baseName: 'base-icon'}
          ),
          map: null,
        }
      }
    },
  }
}
