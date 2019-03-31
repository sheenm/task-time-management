import { action } from '@storybook/addon-actions'
import { linkTo } from '@storybook/addon-links'
import { storiesOf } from '@storybook/react'
import React from 'react'
import { ProjectPresenter } from '../components/project/ProjectPresenter'
import { TaskPresenter } from '../components/task/TaskPresenter'
import { TimeStampPresenter } from '../components/timeStamp/TimeStampPresenter'

storiesOf('ProjectPresenter', module)
  .add('folded', () => {
    return <ProjectPresenter
      isOpen={false}
      toggleOpen={linkTo('ProjectPresenter', 'unfolded')}
      title='Task time management'
      onTitleChanged={action('title changed')}
      addProject={action('project added')}
      addTask={action('task added')}
    />
  },
    {
      info: {
        text: `
        ## Project Presenter
        - Can see the name of the project
        - Can change the name of the project
        - Can click to unfold and see tasks and subprojects
        `
      },
    })
  .add('unfolded', () => {
    return <ProjectPresenter
      isOpen
      toggleOpen={linkTo('ProjectPresenter', 'folded')}
      title='Task time management'
      onTitleChanged={action('title changed')}
      addProject={action('project added')}
      addTask={action('task added')}
    >

      <TaskPresenter
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
    </ProjectPresenter>
  },
    {
      info: {
        text: `
          ## Project Presenter
          - Can see the name of the project
          - Can change the name of the project
          - Can click to fold and hide tasks and subprojects
          `
      },
    })
