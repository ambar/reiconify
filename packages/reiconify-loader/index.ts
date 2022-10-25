import type {LoaderContext} from 'webpack'
import {callbackify} from 'util'
import transform from 'reiconify/lib/transform'

export default function reiconifyLoader(
  this: LoaderContext<{}>,
  source: string
) {
  callbackify(() => transform(source, {baseName: 'base-icon'}))(this.async())
}
