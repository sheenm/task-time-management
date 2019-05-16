import { ITimestamp } from 'app/dto'
import { TimestampPresenter } from 'components/timestamp/TimestampPresenter'
import React from 'react'

interface IProps {
  remove: () => void
  timestamp: ITimestamp
  changeComment: (newComment: string) => void
}

export const Timestamp: React.FC<IProps> = ({ remove, timestamp, changeComment }) => {
  return <TimestampPresenter
    comment={timestamp.comment}
    dateTime={getTimestampDatetime(timestamp.datetimeStart, timestamp.datetimeEnd)}
    id={timestamp.id}
    remove={remove}
    changeComment={changeComment}
  />
}

function getTimestampDatetime(start: Date, end?: Date) {
  const timeStart = start.toLocaleString()

  if (end === undefined)
    return timeStart

  if (start.extIsDayEqual(end))
    return timeStart + ' - ' + end.toLocaleTimeString()
  else
    return timeStart + ' - ' + end.toLocaleString()
}
