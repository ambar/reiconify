module.exports = {
  svgoPlugins: [
    {
      removeAttrs: {
        attrs: [
          // remove `fill` attributes: https://github.com/google/material-design-icons/issues/281
          'fill',
          'svg:(width|height|viewBox)',
        ],
      },
    },
  ],
  baseDefaultProps: {
    defaultClassName: 'Mdi',
    viewBox: '0 0 24 24',
  },
}
