const {svg2jsx} = require('..')

let svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
  <!-- comment -->
  <desc>desc</desc>
  <metadata>meta</metadata>
  <path /><!-- empty -->
  <path pointer-events="none" fill-opacity="0.5" d="M0 0h24v24H0z" /><!-- sort -->
</svg>
`

describe('svg2jsx', () => {
  it('converts svg to jsx', async () => {
    expect(await svg2jsx(svg)).toMatchSnapshot()
  })

  it('converts svg to jsx (React <= 15)', async () => {
    expect(await svg2jsx(svg, {camelCaseProps: true})).toMatchSnapshot()
  })

  it('uses `removeAttrs` plugin', async () => {
    const svgoPlugins = [
      {
        removeAttrs: {
          attrs: ['svg:(width|height|viewBox)'],
        },
      },
    ]
    expect(await svg2jsx(svg, {svgoPlugins})).toMatchSnapshot()
  })

  it('reuses svgo instance', async () => {
    const toJsx = svg2jsx.createSvg2jsx({
      camelCaseProps: true,
      svgoPlugins: [
        {
          removeAttrs: {attrs: 'fill-opacity'},
        },
      ],
    })
    expect(await toJsx(svg)).toMatchSnapshot()
  })
})
