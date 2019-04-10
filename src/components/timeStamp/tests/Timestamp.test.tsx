import React from 'react'
import ReactDOM from 'react-dom'
import { Timestamp } from '../Timestamp'

/**
 * * For now the component is simple and do not contains complex logic
 */
describe('timestamp tests', () => {
  it('should render without crashing', () => {
    const div = document.createElement('div')
    const callback = () => { return }

    ReactDOM.render(<Timestamp
      changeComment={callback}
      remove={callback}
      timestamp={{ id: 1, datetimeStart: '111', datetimeEnd: '222', taskId: 2, comment: 'some comment' }}
    />,
      div)
    ReactDOM.unmountComponentAtNode(div)
  })
})
