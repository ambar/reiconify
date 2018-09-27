import React from 'react'
import renderer from 'react-test-renderer'
import BaseIcon from '../src/BaseIcon'

describe('BaseIcon', () => {
  it('renders icon', () => {
    const tree = renderer
      .create(
        <>
          <BaseIcon>
            <path />
          </BaseIcon>
          <BaseIcon className="MyIcon">
            <path />
          </BaseIcon>
          <BaseIcon fill={'red'}>
            <path />
          </BaseIcon>
          <BaseIcon size={40}>
            <path />
          </BaseIcon>
          <BaseIcon width={10} height={20}>
            <path />
          </BaseIcon>
          <BaseIcon text center>
            <path />
          </BaseIcon>
          <BaseIcon text>
            <path />
          </BaseIcon>
          <BaseIcon center>
            <path />
          </BaseIcon>
        </>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
