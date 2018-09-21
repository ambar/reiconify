const React = require('react')
const renderer = require('react-test-renderer')
const path = require('path')
const {promisify} = require('util')
const rimraf = require('rimraf')
const {transformFiles} = require('..')

describe('component', () => {
  const orignalCwd = process.cwd()
  const cwd = path.resolve(__dirname, 'fixtures/component')
  const srcDir = path.resolve(cwd, 'src')
  let Icons

  beforeAll(async () => {
    process.chdir(cwd)
    await transformFiles({
      inputs: 'icons/*.svg',
      src: true,
      srcDir,
    })
  })

  beforeEach(() => {
    Icons = require(srcDir)
  })

  afterAll(async () => {
    await promisify(rimraf)(srcDir)
    process.chdir(orignalCwd)
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

  it('renders custom `x2` prop (literal mapper)', () => {
    const tree = renderer.create(<Icons.Check x2 />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('renders custom `gray` prop (function mapper)', () => {
    const tree = renderer.create(<Icons.Check gray />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
