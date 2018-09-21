const transform = require('../lib/transform')

const sampleSvg =
  '<svg width="24" height="24" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>'

describe('component', () => {
  it('transforms svg', async () => {
    expect(await transform(sampleSvg)).toMatchSnapshot()
  })

  it('transforms svg with options', async () => {
    expect(
      await transform(sampleSvg, {
        name: 'Component',
        baseName: 'base-icon',
      })
    ).toMatchSnapshot()
  })
})
