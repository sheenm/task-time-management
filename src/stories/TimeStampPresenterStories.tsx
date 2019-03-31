import { action } from '@storybook/addon-actions'
import { storiesOf } from '@storybook/react'
import React from 'react'
import { TimeStampPresenter } from '../components/timeStamp/TimeStampPresenter'

storiesOf('TimeStampPresenter', module)
  .add('simple', () => {
    return <TimeStampPresenter
      dateTime='26.3 Tue 21:57 - 22:18 (0:22)'
      comment='Added storybook to the project'
      changeComment={action('comment changed')}
      edit={action('edit action')}
      remove={action('remove Timestamp action')}
    />
  },
    {
      info: {
        text: `
        ## Timestamp presenter
        - See time and comment.
        - Edit comment
        - Edit / remove timestamp`,
      },
    }
  )
  .add('very long comment', () => {
    return <TimeStampPresenter
      dateTime='26.3 Tue 21:57 - 22:18 (0:22)'
      comment='Added storybook to the project and I worked hard to bring this to this site. And now it is awesome to see how this will help me! That comment was not enough for me so I will write something else to make this comment very big. I want to make this comment the biggest comment I ever will make in this app in production'
      changeComment={action('comment changed')}
      edit={action('edit action')}
      remove={action('remove Timestamp action')}
    />
  },
    {
      info: {
        text: `
        ## Timestamp presenter with long comment
        - You can check that layout does not break
        `
      },
    }
  )
