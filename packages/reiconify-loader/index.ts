import type {LoaderContext} from 'webpack'
import {callbackify} from 'util'
import transform from 'reiconify/lib/transform'

/**
 * SVG to React Component loader
 */
export default function reiconifyLoader(
  this: LoaderContext<{native?: boolean; baseName?: string}>,
  source: string
) {
  const {native, baseName} = this.getOptions()
  callbackify(() =>
    transform(
      source,
      native
        ? {native, baseName: baseName ?? 'base-icon/native'}
        : {baseName: baseName ?? 'base-icon'}
    )
  )(this.async())
}
