const React = require('react')
const renderer = require('react-test-renderer')
const fs = require('fs')
const path = require('path')
const {promisify} = require('util')
const rimraf = require('rimraf')
const {transformFiles} = require('../lib')

describe('transform', () => {
  const srcDir = 'test/fixtures/transform/src'
  const esDir = 'test/fixtures/transform/es'
  const cjsDir = 'test/fixtures/transform/cjs'
  const cleanup = async () => {
    await Promise.all(
      [srcDir, esDir, cjsDir].map(dir => promisify(rimraf)(dir))
    )
  }

  beforeAll(async () => {
    await cleanup()
  })

  it('throws if no inputs', async () => {
    await expect(transformFiles()).rejects.toMatchSnapshot()
  })

  it('throws if no output dir', async () => {
    await expect(transformFiles({inputs: '*.svg'})).rejects.toMatchSnapshot()
  })

  it('throws if no matched files', async () => {
    await expect(
      transformFiles({inputs: 'xyz.svg', srcDir: 'src'})
    ).rejects.toMatchSnapshot()
  })

  it('transforms icons to src only', async () => {
    await transformFiles({
      inputs: 'test/fixtures/transform/icons/*.svg',
      src: true,
      srcDir,
    })

    const files = await promisify(fs.readdir)(srcDir)
    expect(files).toMatchSnapshot()
  })

  it('transforms icons to src/es/cjs', async () => {
    await transformFiles({
      inputs: 'test/fixtures/transform/icons/*.svg',
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
