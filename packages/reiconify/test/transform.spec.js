const React = require('react')
const renderer = require('react-test-renderer')
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

  it('return promise', async () => {
    const [{name, code}] = await transform({
      inputs: 'fixtures/transform/icons/*.svg',
      src: true,
      srcDir,
    })
    expect(name).toBeTruthy()
    expect(code).toMatchSnapshot()
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

  it('no files output if shouldWriteFiles to be false', async () => {
    await transform({
      inputs: 'fixtures/transform/icons/*.svg',
      src: true,
      srcDir,
      shouldWriteFiles: false,
    })
    expect(promisify(fs.readdir)(srcDir)).rejects.toMatchSnapshot()
  })

  it('use options template', async () => {
    const [{code}] = await
      transform({
        inputs: 'fixtures/transform/icons/*.svg',
        src: true,
        srcDir,
        shouldWriteFiles: false,
        template: require('./fixtures/transform/createOptionsTemplate')({
          baseTemplatePath: 'foo',
          filePath: 'bar',
        }),
      })
    expect(code).toMatchSnapshot()
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

    const Icons = require(path.resolve(srcDir))
    const EsIcons = require(path.resolve(esDir))
    const CjsIcons = require(path.resolve(cjsDir))
    Object.keys(Icons).forEach(name => {
      const tree = renderer.create(React.createElement(Icons[name])).toJSON()
      const esTree = renderer
        .create(React.createElement(EsIcons[name]))
        .toJSON()
      const cjsTree = renderer
        .create(React.createElement(CjsIcons[name]))
        .toJSON()
      expect(tree).toMatchSnapshot()
      expect(tree).toEqual(esTree)
      expect(tree).toEqual(cjsTree)
    })
  })
})
