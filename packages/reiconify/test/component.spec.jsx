const React = require('react')
const renderer = require('react-test-renderer')
const path = require('path')
const {promisify} = require('util')
const rimraf = require('rimraf')
const transformFiles = require('../lib/transformFiles')

describe('component', () => {
  const cwd = process.cwd()
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
    await promisify(rimraf)(esDir)
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
