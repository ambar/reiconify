const path = require('path')
const resolveConfig = require('../lib/resolveConfig')

describe('resolveConfig', () => {
  it('gets default config', async () => {
    const cwd = __dirname
    expect(await resolveConfig(cwd)).toMatchSnapshot()
  })

  it('overwrites default config', async () => {
    const cwd = path.resolve(__dirname, 'fixtures/resolve-config')
    expect(await resolveConfig(cwd)).toMatchSnapshot()
  })
})
