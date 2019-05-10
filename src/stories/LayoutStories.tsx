import { storiesOf } from '@storybook/react'
import { Wrapper } from 'components/layout/Wrapper'
import React from 'react'

storiesOf('Layout', module)
  .add('Wrapper', () => {
    return <Wrapper>
      <div style={{
        height: '100px',
        backgroundColor: '#eee'
      }} />
    </Wrapper>
  },
    {
      info: {
        text: `
        ## Wrapper
        Limits children component's width
        `
      },
    }
  )
