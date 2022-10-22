const {pascalCase} = require('pascal-case')

/* 3d_rotation -> Md3dRotation */
const filenameTemplate = (name) =>
  pascalCase(/^\d+/.test(name) ? 'Md' + name : name).replace(/_/g, '')

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
    viewBox: '0 0 24 24',
    width: 24,
    height: 24,
  },
  filenameTemplate,
}
