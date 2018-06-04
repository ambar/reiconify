const {svg2jsx} = require('..')

const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
  <!-- comment -->
  <desc>desc</desc>
  <metadata>meta</metadata>
  <path /><!-- empty -->
  <path pointer-events="none" fill-opacity="0.5" d="M0 0h24v24H0z" /><!-- sort -->
</svg>
`

const svgWithFill = `
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
  <g fill="#f1f1f1" stroke="red">
    <path fill="red" d="M0 0h24v24H0z" />
  </g>
</svg>
`

const svgWithId = `
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
  <defs>
    <linearGradient id="hot-a" x1="63.313%" x2="46.604%" y1="-13.472%" y2="117.368%">
      <stop offset="2.35%" stop-color="#EC471E"/>
      <stop offset="100%" stop-color="#FF6DC4"/>
    </linearGradient>
  </defs>
  <path fill="url(#hot-a)" fill-rule="evenodd" d="M0 0h24v24H0z"/>
</svg>
`

const svgWithStyles = `
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
  <path d="M0 0h24v24H0z" style="background: red" />
  <path d="M0 0h24v24H0z" style="background: red;mix-blend-mode:overlay" />
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
    expect(await svg2jsx(svgWithFill, {svgoPlugins})).toMatchSnapshot()
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

  it('adds unique id prefix', async () => {
    expect(await svg2jsx(svgWithId)).toMatchSnapshot()
  })

  it('converts inline styles to style objects', async () => {
    expect(await svg2jsx(svgWithStyles)).toMatchSnapshot()
  })
})
