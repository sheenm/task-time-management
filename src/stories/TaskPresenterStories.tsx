import { action } from '@storybook/addon-actions'
import { linkTo } from '@storybook/addon-links'
import { storiesOf } from '@storybook/react'
import React from 'react'
import { TaskPresenter } from '../components/task/TaskPresenter'
import { TimeStampPresenter } from '../components/timeStamp/TimeStampPresenter'

storiesOf('TaskPresenter', module)
  .add('folded', () => {
    return <TaskPresenter
      isOpen={false}
      onOpenChanged={linkTo('TaskPresenter', 'unfolded')}
      isStarted={false}
      toggleTaskStart={linkTo('TaskPresenter', 'folded started')}
      title='23451 - Create presenter components for this app'
      onTitleChanged={action('new title: ')}
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
      onOpenChanged={linkTo('TaskPresenter', 'unfolded started')}
      isStarted
      toggleTaskStart={linkTo('TaskPresenter', 'folded')}
      title='23451 - Create presenter components for this app'
      onTitleChanged={action('new title: ')}
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
      onOpenChanged={linkTo('TaskPresenter', 'folded')}
      isStarted={false}
      toggleTaskStart={linkTo('TaskPresenter', 'unfolded started')}
      title='23451 - Create presenter components for this app'
      onTitleChanged={action('new title: ')}
    >
      <TimeStampPresenter
        dateTime='26.3 Tue 21:57 - 22:18 (0:22)'
        comment='Created Task Presenter'
        onCommentChanged={action('comment changed')}
        onEdit={action('edit action')}
        onRemove={action('remove Timestamp action')}
      />

      <TimeStampPresenter
        dateTime='26.3 Tue 21:57 - 22:18 (0:22)'
        comment='Modified Grid for better layout'
        onCommentChanged={action('comment changed')}
        onEdit={action('edit action')}
        onRemove={action('remove Timestamp action')}
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
        onOpenChanged={linkTo('TaskPresenter', 'folded started')}
        isStarted
        toggleTaskStart={linkTo('TaskPresenter', 'unfolded')}
        title='23451 - Create presenter components for this app'
        onTitleChanged={action('new title: ')}>
        <TimeStampPresenter
          dateTime='26.3 Tue 21:57 - 22:18 (0:22)'
          comment='Created Task Presenter'
          onCommentChanged={action('comment changed')}
          onEdit={action('edit action')}
          onRemove={action('remove Timestamp action')}
        />

        <TimeStampPresenter
          dateTime='26.3 Tue 21:57 - 22:18 (0:22)'
          comment='Modified Grid for better layout'
          onCommentChanged={action('comment changed')}
          onEdit={action('edit action')}
          onRemove={action('remove Timestamp action')}
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
