import { ITimestamp } from 'app/dto'
import React from 'react'
import { TimestampPresenter } from './TimestampPresenter'

interface IProps {
  remove: () => void
  timestamp: ITimestamp
  changeComment: (newComment: string) => void
}

export const Timestamp: React.FC<IProps> = ({ remove, timestamp, changeComment }) => {
  const edit = () => console.log('todo 5: Can change every time stamp')

  return <TimestampPresenter
    comment={timestamp.comment}
    dateTime={getTimestampDatetime(timestamp.datetimeStart, timestamp.datetimeEnd)}
    edit={edit}
    remove={remove}
    changeComment={changeComment}
  />
}

function getTimestampDatetime(start: Date, end?: Date) {
  const timeStart = start.toLocaleString()

  if (end === undefined)
    return timeStart

  if (start.getDate() === end.getDate())
    return timeStart + ' - ' + end.toLocaleTimeString()
  else
    return timeStart + ' - ' + end.toLocaleString()
}