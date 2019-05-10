import { Project } from 'components/project/Project'
import React from 'react'
import ReactDOM from 'react-dom'

describe('Project.test', () => {
  it('should render without crashing', () => {
    const div = document.createElement('div')
    const callback = () => { return }

    ReactDOM.render(<Project
      project={{ id: 1, title: 'some title' }}
      rename={callback}
    />, div)
    ReactDOM.unmountComponentAtNode(div)
  })
})
