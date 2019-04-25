import { IReportTimestamp, StandardPeriodNames } from 'app/report'
import React from 'react'
import { LoadingStastes, useLoading } from '../../hooks/useLoading'
import { RepositoryContext } from '../repositories/RepositoryContext'
import { ReportTimestampsGroup } from './ReportTimestampsGroup'

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

  return <ReportTimestampsGroup
    taskName={'task name... todo'}
    timestamps={timestamps.map(x => ({ id: x.id, dateTime: '1111', comment: x.comment }))}
  />
}
