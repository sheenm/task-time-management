import { Button, ButtonGroup, Card, EditableText, Elevation } from '@blueprintjs/core'
import * as React from 'react'
import injectSheet, { WithSheet } from 'react-jss'

const styles = {
  card: {
    display: 'flex',
    flexDirection: 'column',
    '@media (min-width: 520px)': {
      display: 'grid',
      gridTemplateColumns: '[date] minmax(200px, auto) [text] minmax(100px, 1fr) [actions] minmax(4rem, auto)',
      alignItems: 'center',
      gridColumnGap: '1rem',
      padding: '0 .4rem',
    }
  },
  date: {
    gridColumn: 'date',
    margin: 0
  },
  text: {
    gridColumn: 'text',
  },
  actions: {
    gridColumn: 'actions'
  }
}

export interface ITimestampPresenterProps extends WithSheet<typeof styles, {}> {
  dateTime: string
  comment: string
  remove: () => void
  edit: () => void
  changeComment: (newComment: string) => void
}

const TimestampPresenterInner: React.FC<ITimestampPresenterProps> = ({ classes, ...props }) => {

  return <Card elevation={Elevation.ZERO} className={classes.card}>
    <p className={classes.date}>{props.dateTime}</p>
    <EditableText confirmOnEnterKey onConfirm={props.changeComment} defaultValue={props.comment} />
    <ButtonGroup className={classes.actions} minimal>
      <Button icon='edit' onClick={props.edit} title='Edit timestamp' />
      <Button icon='remove' onClick={props.remove} title='Remove timestamp' />
    </ButtonGroup>
  </Card>
}

export const TimestampPresenter = injectSheet(styles)(TimestampPresenterInner)
