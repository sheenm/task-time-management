import { HTMLTable } from '@blueprintjs/core'
import React from 'react'
import injectSheet, { WithSheet } from 'react-jss'

const styles = {
  table: {
    width: '100%'
  },
  caption: {
    textAlign: 'left',
    fontSize: '1.3rem'
  }
}

interface IProps extends WithSheet<typeof styles, {}> {
  taskName: string

  timestamps: Array<{
    id: number
    dateTime: string
    comment: string
  }>

}

const ReportTimestampsGroupInner: React.FC<IProps> = ({ classes, timestamps, taskName }) => {

  return <HTMLTable bordered className={classes.table} condensed>
    <caption className={classes.caption}>{taskName}</caption>
    <thead>
      <tr>
        <th>comment</th>
        <th>time</th>
      </tr>
    </thead>
    <tbody>
      {timestamps.map(x => <tr key={x.id}>
        <td>{x.comment}</td>
        <td>{x.dateTime}</td>
      </tr>)}
    </tbody>
  </HTMLTable>
}

export const ReportTimestampsGroup = injectSheet(styles)(ReportTimestampsGroupInner)
