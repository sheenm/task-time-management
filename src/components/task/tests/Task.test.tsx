import { Task } from 'components/task/Task'
import React from 'react'
import ReactDOM from 'react-dom'

describe('Task.test', () => {
  it('should render without crashing', () => {
    const div = document.createElement('div')
    const callback = () => { return }

    ReactDOM.render(<Task
      rename={callback}
      task={{ id: 1, title: 'some title', projectId: 1 }}
    />, div)
    ReactDOM.unmountComponentAtNode(div)
  })
})
