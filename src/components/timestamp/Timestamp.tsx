import { ITimestamp } from 'app/businessObjects'
import { TimestampPresenter } from 'components/timestamp/TimestampPresenter'
import { formatDistanceStrict } from 'date-fns/fp'
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

function getTimestampDatetime(start: Date, end?: Date | null) {
  return formatDistanceStrict(end || new Date())(start)
}
