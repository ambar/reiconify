import React from 'react'
import renderer from 'react-test-renderer'
import BaseIcon from '../src/BaseIcon'

describe('BaseIcon', () => {
  it('renders icon', () => {
    const tree = renderer
      .create(
        <>
          <BaseIcon name="Heart">
            <path />
          </BaseIcon>
          <BaseIcon name="Heart" className="MyIcon">
            <path />
          </BaseIcon>
          <BaseIcon name="Heart" fill={'red'}>
            <path />
          </BaseIcon>
          <BaseIcon name="Heart" size={40}>
            <path />
          </BaseIcon>
          <BaseIcon name="Heart" width={10} height={20}>
            <path />
          </BaseIcon>
          <BaseIcon name="Heart" text center>
            <path />
          </BaseIcon>
        </>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
