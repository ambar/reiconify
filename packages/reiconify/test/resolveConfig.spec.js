const {resolveConfig} = require('..')

describe('resolveConfig', () => {
  const cwd = process.cwd()

  beforeEach(() => {
    process.chdir(__dirname)
  })

  afterAll(() => {
    process.chdir(cwd)
  })

  it('gets default config', async () => {
    expect(await resolveConfig()).toMatchSnapshot()
  })

  it('overwrites default config', async () => {
    process.chdir('fixtures/resolve-config/')
    expect(await resolveConfig()).toMatchSnapshot()
  })
})
