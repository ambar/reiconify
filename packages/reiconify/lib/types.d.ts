export type Options = {
  name?: 'Icon'
  baseName?: string
  baseClassName?: string
  template?: (opts: Options) => string
  baseTemplate?: (opts: Options) => string
  defaultProps?: Record<string, unknown>
  baseDefaultProps?: Record<string, unknown>
  filenameTemplate?: (filename: string) => string
  indexTemplate?: (names: string[]) => string
  svgoPlugins?: import('svgo').PluginDef[]
  format?: 'esm' | 'cjs'
  jsx?: 'transform' | 'preserve'
  camelCaseProps?: boolean
  native?: boolean
}
