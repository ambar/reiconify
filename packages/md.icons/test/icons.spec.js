import React from 'react'
import renderer from 'react-test-renderer'
import * as Icons from '../es'

describe('icons', () => {
  it(`renders all icons`, () => {
    for (const [name, Icon] of Object.entries(Icons)) {
      const tree = renderer.create(React.createElement(Icon)).toJSON()
      expect(tree).toMatchSnapshot(name)
    }
  })
})
