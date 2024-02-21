import type {LoaderContext} from 'webpack'
import {callbackify} from 'util'
import transform from 'reiconify/lib/transform'

/**
 * SVG to React Component loader
 */
export default function reiconifyLoader(
  this: LoaderContext<{native?: boolean}>,
  source: string
) {
  const {native} = this.getOptions()
  callbackify(() =>
    transform(source, native ? {native} : {baseName: 'base-icon'})
  )(this.async())
}
