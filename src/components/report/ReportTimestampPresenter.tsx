import { Card, Elevation } from '@blueprintjs/core'
import React from 'react'
import injectSheet, { WithSheet } from 'react-jss'

const styles = {

}

interface IProps extends WithSheet<typeof styles, {}> {
  dateTime: string
  comment: string
}

const ReportTimestampPresenterInner: React.FC<IProps> = ({ classes, dateTime, comment }) => {

  return <Card elevation={Elevation.ZERO}>
    <span>{dateTime}</span>
    <span>{comment}</span>
  </Card>
}

export const ReportTimestampPresenter = injectSheet(styles)(ReportTimestampPresenterInner)
