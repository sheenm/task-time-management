import { withInfo } from '@storybook/addon-info'
import { addDecorator, configure } from '@storybook/react'

const req = require.context('../src/stories', true, /\.tsx$/)

function loadStories() {
  req.keys().forEach(req)
}

configure(loadStories, module)

addDecorator(
  withInfo({
    styles: {
      header: {
        h1: {
          marginRight: '20px',
          fontSize: '25px',
          display: 'inline',
        },
        body: {
          padding: '20px'
        },
        h2: {
          display: 'inline',
          color: '#999',
        },
      },
      infoBody: {
        backgroundColor: '#eee',
        padding: '0px 5px',
        lineHeight: '2',
      }
    },
    header: false,
    inline: true,
    source: true,
    propTables: false
  })
)
