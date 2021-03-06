import { HTMLTable } from '@blueprintjs/core'
import React from 'react'
import styles from './ReportTimestampsGroup.module.scss'

interface IProps {
  taskName: string

  timestamps: Array<{
    id: number
    dateTime: string
    comment: string
  }>

  className?: string
}

export const ReportTimestampsGroup: React.FC<IProps> = ({ timestamps, taskName, className = '' }) => {

  return <HTMLTable bordered className={`${styles.table} ${className}`} condensed>
    <caption className={styles.caption}>{taskName}</caption>
    <thead>
      <tr>
        <th className={styles.commentColumn}>comment</th>
        <th>time(H:M)</th>
      </tr>
    </thead>
    <tbody>
      {timestamps.map(x => <tr key={x.id}>
        <td className={styles.commentColumn}>{x.comment}</td>
        <td>{x.dateTime}</td>
      </tr>)}
    </tbody>
  </HTMLTable>
}
