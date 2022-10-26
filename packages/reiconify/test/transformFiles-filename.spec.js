const fsp = require('fs/promises')
const path = require('path')
const {transformFiles} = require('../lib')

describe('transform-filename', () => {
  // const orignalCwd = process.cwd()
  const cwd = path.resolve(__dirname, 'fixtures/transform-filename')
  const srcDir = path.resolve(cwd, 'src')
  const cleanup = async () => {
    await fsp.rm(srcDir, {recursive: true, force: true})
  }

  beforeAll(() => {
    // process.chdir(cwd)
  })

  afterEach(async () => {
    await cleanup()
  })

  afterAll(() => {
    // process.chdir(orignalCwd)
  })

  it('transforms icons', async () => {
    await transformFiles({
      cwd,
      inputs: 'icons/*.svg',
      src: true,
      srcDir,
    })

    const files = await fsp.readdir(srcDir)
    expect(files).toMatchSnapshot()
  })
})
