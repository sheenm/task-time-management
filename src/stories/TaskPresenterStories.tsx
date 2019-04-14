import { action } from '@storybook/addon-actions'
import { linkTo } from '@storybook/addon-links'
import { storiesOf } from '@storybook/react'
import React from 'react'
import { TaskPresenter } from '../components/task/TaskPresenter'
import { TimestampPresenter } from '../components/timeStamp/TimestampPresenter'

storiesOf('TaskPresenter', module)
  .add('folded', () => {
    return <TaskPresenter
      isOpen={false}
      toggleOpen={linkTo('TaskPresenter', 'unfolded')}
      isStarted={false}
      toggleTaskStart={linkTo('TaskPresenter', 'folded started')}
      title='23451 - Create presenter components for this app'
      changeTitle={action('new title: ')}
    />
  },
    {
      info: {
        text: `
        ## Task presenter folded
        - Can see the name of the task
        - Can change the name of the task
        - Can click to unfold and see timestamps
        - Can start task
        `
      },
    })
  .add('folded started', () => {
    return <TaskPresenter
      isOpen={false}
      toggleOpen={linkTo('TaskPresenter', 'unfolded started')}
      isStarted
      toggleTaskStart={linkTo('TaskPresenter', 'folded')}
      title='23451 - Create presenter components for this app'
      changeTitle={action('new title: ')}
    />
  },
    {
      info: {
        text: `
          ## Task presenter folded started
          - Can see the name of the task
          - Can change the name of the task
          - Can click to unfold and see timestamps
          - Can stop task
          `
      },
    })
  .add('unfolded', () => {
    return <TaskPresenter
      isOpen
      toggleOpen={linkTo('TaskPresenter', 'folded')}
      isStarted={false}
      toggleTaskStart={linkTo('TaskPresenter', 'unfolded started')}
      title='23451 - Create presenter components for this app'
      changeTitle={action('new title: ')}
    >
      <TimestampPresenter
        dateTime='26.3 Tue 21:57 - 22:18 (0:22)'
        comment='Created Task Presenter'
        changeComment={action('comment changed')}
        edit={action('edit action')}
        remove={action('remove Timestamp action')}
      />

      <TimestampPresenter
        dateTime='26.3 Tue 21:57 - 22:18 (0:22)'
        comment='Modified Grid for better layout'
        changeComment={action('comment changed')}
        edit={action('edit action')}
        remove={action('remove Timestamp action')}
      />
    </TaskPresenter>
  },
    {
      info: {
        text: `
          ## Task presenter unfolded
          - Can see the name of the task
          - Can change the name of the task
          - Can click to fold and hide timestamps
          - Can start task
          `
      },
    })
  .add('unfolded started', () => {
    return (
      <TaskPresenter
        isOpen
        toggleOpen={linkTo('TaskPresenter', 'folded started')}
        isStarted
        toggleTaskStart={linkTo('TaskPresenter', 'unfolded')}
        title='23451 - Create presenter components for this app'
        changeTitle={action('new title: ')}>
        <TimestampPresenter
          dateTime='26.3 Tue 21:57 - 22:18 (0:22)'
          comment='Created Task Presenter'
          changeComment={action('comment changed')}
          edit={action('edit action')}
          remove={action('remove Timestamp action')}
        />

        <TimestampPresenter
          dateTime='26.3 Tue 21:57 - 22:18 (0:22)'
          comment='Modified Grid for better layout'
          changeComment={action('comment changed')}
          edit={action('edit action')}
          remove={action('remove Timestamp action')}
        />
      </TaskPresenter>
    )
  },
    {
      info: {
        text: `
            ## Task presenter unfolded started
            - Can see the name of the task
            - Can change the name of the task
            - Can click to fold and hide timestamps
            - Can stop task
            `
      },
    })
