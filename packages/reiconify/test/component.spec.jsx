const React = require('react')
const renderer = require('react-test-renderer')
const fsp = require('fs/promises')
const path = require('path')
const transformFiles = require('../lib/transformFiles')

describe('component', () => {
  const fixtureDir = path.resolve(path.resolve(__dirname, 'fixtures/component'))
  const esDir = path.resolve(fixtureDir, 'src')
  let Icons

  beforeAll(async () => {
    await transformFiles({
      cwd: fixtureDir,
      inputs: 'icons/*.svg',
      es: true,
      esDir,
    })
    Icons = require(esDir)
  })

  afterAll(async () => {
    await fsp.rm(esDir, {recursive: true, force: true})
  })

  it('renders `size` prop', () => {
    const tree = renderer.create(<Icons.Check size={20} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('renders `className` prop', () => {
    const tree = renderer.create(<Icons.Check className="myIcon" />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('renders `text` prop', () => {
    const tree = renderer.create(<Icons.Check text />).toJSON()
    expect(tree).toMatchSnapshot()

    const tree2 = renderer.create(<Icons.Check text={false} />).toJSON()
    expect(tree2).toMatchSnapshot()
  })

  it('renders `center` prop', () => {
    const tree = renderer.create(<Icons.Check center />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('renders `text` and `center` prop', () => {
    const tree = renderer.create(<Icons.Check text center />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('renders `center` and `style` prop', () => {
    const tree = renderer
      .create(<Icons.Check center style={{color: 'red'}} />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
