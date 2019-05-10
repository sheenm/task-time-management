import { Timestamp } from 'components/timestamp/Timestamp'
import React from 'react'
import ReactDOM from 'react-dom'

/**
 * * For now the component is simple and do not contains complex logic
 */
describe('timestamp tests', () => {
  it('should render without crashing', () => {
    const div = document.createElement('div')
    const callback = jest.fn()

    ReactDOM.render(<Timestamp
      changeComment={callback}
      remove={callback}
      timestamp={{ id: 1, datetimeStart: new Date(), taskId: 2, comment: 'some comment' }}
    />, div)
    ReactDOM.unmountComponentAtNode(div)
  })
})
