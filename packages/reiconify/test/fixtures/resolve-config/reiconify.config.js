module.exports = {
  baseDefaultProps: {
    defaultClassName: 'MyIcon',
  },
  svgoPlugins: [{removeAttrs: {attrs: 'fill'}}],
}
