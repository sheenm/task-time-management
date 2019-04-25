import { IReportTimestamp, StandardPeriodNames } from 'app/report'
import React from 'react'
import { LoadingStastes, useLoading } from '../../hooks/useLoading'
import { RepositoryContext } from '../repositories/RepositoryContext'
import { ReportTimestampPresenter } from './ReportTimestampPresenter'

interface IProps {
  period: StandardPeriodNames
}

export const Report: React.FC<IProps> = ({ period }) => {

  const [timestamps, setTimestamps] = React.useState<IReportTimestamp[]>([])
  const { reportRepo } = React.useContext(RepositoryContext)
  const loadingState = useLoading(() => reportRepo.get(period), [period])
    (setTimestamps)

  if (loadingState === LoadingStastes.Loading)
    return <h1>todo loading 10. Data loading trobber</h1>

  return <>
    {timestamps.map(timestamp => <ReportTimestampPresenter
      key={timestamp.id}
      dateTime='1:10'
      comment={timestamp.comment}
    />)}
  </>
}
