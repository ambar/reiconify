const fs = require('fs')
const path = require('path')
const {promisify} = require('util')
const rimraf = require('rimraf')
const {transform} = require('..')

describe('transform', () => {
  const cwd = process.cwd()
  const srcDir = 'fixtures/transform/src'
  const esDir = 'fixtures/transform/es'
  const cjsDir = 'fixtures/transform/cjs'
  const cleanup = async () => {
    await Promise.all(
      [srcDir, esDir, cjsDir].map(dir => promisify(rimraf)(dir))
    )
  }

  beforeAll(() => {
    process.chdir(__dirname)
  })

  afterEach(async () => {
    await cleanup()
  })

  afterAll(() => {
    process.chdir(cwd)
  })

  it('throws if no inputs', async () => {
    await expect(transform()).rejects.toMatchSnapshot()
  })

  it('throws if no output dir', async () => {
    await expect(transform({inputs: '*.svg'})).rejects.toMatchSnapshot()
  })

  it('throws if no matched files', async () => {
    await expect(
      transform({inputs: 'xyz.svg', srcDir: 'src'})
    ).rejects.toMatchSnapshot()
  })

  it('transforms icons to src only', async () => {
    await transform({
      inputs: 'fixtures/transform/icons/*.svg',
      src: true,
      srcDir,
    })

    const files = await promisify(fs.readdir)(srcDir)
    expect(files).toMatchSnapshot()
  })

  it('transforms icons to src/es/cjs', async () => {
    await transform({
      inputs: 'fixtures/transform/icons/*.svg',
      src: true,
      es: true,
      cjs: true,
      srcDir,
      esDir,
      cjsDir,
    })

    const readDir = async dir => {
      const files = await promisify(fs.readdir)(dir)
      return {dir, files}
    }

    const groups = await Promise.all([srcDir, esDir, cjsDir].map(readDir))
    expect(groups).toMatchSnapshot()

    const contents = await Promise.all(
      groups.map(({dir, files}) =>
        Promise.all(
          files.map(file =>
            promisify(fs.readFile)(path.join(dir, file)).then(f => f.toString())
          )
        ).then(data => ({[dir]: data}))
      )
    )
    expect(contents).toMatchSnapshot()
  })
})
