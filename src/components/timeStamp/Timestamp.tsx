import { ITimestamp } from 'app/dto'
import React from 'react'
import { TimeStampPresenter } from './TimeStampPresenter'

interface IProps {
  remove: () => void
  timestamp: ITimestamp
  changeComment: (newComment: string) => void
}

export const Timestamp: React.FC<IProps> = ({ remove, timestamp, changeComment }) => {
  const edit = () => console.log('todo 5: Can change every time stamp')

  return <TimeStampPresenter
    comment={timestamp.comment}
    dateTime={timestamp.datetimeStart + ' ' + timestamp.datetimeEnd}
    edit={edit}
    remove={remove}
    changeComment={changeComment}
  />
}
