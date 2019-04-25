import { storiesOf } from '@storybook/react'
import React from 'react'
import { ReportTimestampsGroup } from '../components/report/ReportTimestampsGroup'

storiesOf('ReportTimestampPresenter', module)
  .add('simple', () => {
    return <ReportTimestampsGroup
      taskName='32120 Make reports page'
      timestamps={[{ id: 1, dateTime: '3:23:00 (3.38)', comment: 'Created reports page' }]}
    />
  },
    {
      info: {
        text: `
        ## Timestamp presenter for reports page
        - See time (hours:minutes:seconds (float hours)) and comment
        `
      },
    }
  )
  .add('long text', () => {
    return <ReportTimestampsGroup
      taskName='32120 Make reports page'
      timestamps={[{
        id: 1,
        dateTime: '3:23:00 (3.38)',
        comment: 'Created reports page dsa dsadsal kdsajd sadjsalkdsjadsjadksajdlksajdlksajdlsakjdklsajdas laskjdlksad lksajdlsa dlksajkdsajkdlsad sajdlas djkas dlsajdas djalsd asjdsa dsjdsa'
      }]}
    />
  },
    {
      info: {
        text: `
        ## Timestamp presenter for reports page
        - See time (hours:minutes:seconds (float hours)) and comment
        `
      },
    }
  )
