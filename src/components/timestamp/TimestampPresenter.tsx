import { Button, ButtonGroup, Card, EditableText, Elevation } from '@blueprintjs/core'
import { Link } from '@reach/router'
import { editTimestampModalPageRoute } from 'pages/EditTimestampModalPage'
import * as React from 'react'
import styles from './TimestampPresenter.module.scss'

export interface ITimestampPresenterProps {
  dateTime: string
  comment: string
  remove: () => void
  id: number
  changeComment: (newComment: string) => void
}

export const TimestampPresenter: React.FC<ITimestampPresenterProps> = (props) => {
  const [comment, setComment] = React.useState(props.comment)

  React.useEffect(() => {
    setComment(props.comment)
  }, [props.comment])

  const onConfirm = () => props.changeComment(comment)

  return <Card elevation={Elevation.ZERO} className={styles.card}>
    <p className={styles.date}>{props.dateTime}</p>
    <EditableText confirmOnEnterKey onConfirm={onConfirm} value={comment} onChange={setComment} />
    <ButtonGroup className={styles.actions} minimal>
      <Link to={editTimestampModalPageRoute.getUrl({ timestampId: props.id })}>
        <Button icon='edit' title='Edit timestamp' />
      </Link>
      <Button icon='remove' onClick={props.remove} title='Remove timestamp' />
    </ButtonGroup>
  </Card>
}
