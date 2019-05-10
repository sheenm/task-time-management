import { action } from '@storybook/addon-actions'
import { storiesOf } from '@storybook/react'
import React from 'react'
import { ProjectPresenter } from '../components/project/ProjectPresenter'

storiesOf('ProjectPresenter', module)
  .add('normal', () => {
    return <ProjectPresenter
      title='Task time management'
      onTitleChanged={action('title changed')}
      addTask={action('task added')}
    />
  },
    {
      info: {
        text: `
        ## Project Presenter
        - Can see the name of the project
        - Can change the name of the project
        - Can add tasks
        `
      },
    })
  .add('Long project name (if not too long, change window width', () => {
    return <ProjectPresenter
      title='Task time management 28372 83728 32893 2893 28937 289 2893 72893 7289372893 72893 28937283 2903 jasdnasj dhasd jsaklas jdlask djsakldj saldjaslkd asjklsa'
      onTitleChanged={action('title changed')}
      addTask={action('task added')}
    />
  },
    {
      info: {
        text: `
        ## Project Presenter
        - Can see the name of the project
        - Can change the name of the project
        - Can add tasks
        `
      },
    })
