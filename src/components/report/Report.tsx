import { IReportTimestamp, StandardPeriodNames } from 'app/report'
import { ReportTimestampsGroup } from 'components/report/ReportTimestampsGroup'
import { RepositoryContext } from 'components/repositories/RepositoryContext'
import { differenceInMinutes } from 'date-fns/fp'
import { useLoading } from 'hooks/useLoading'
import React from 'react'
import { groupBy } from 'utils/groupBy'

interface IProps {
  period: StandardPeriodNames
}

export const Report: React.FC<IProps> = ({ period }) => {

  const [timestamps, setTimestamps] = React.useState<IReportTimestamp[]>([])
  const { reportRepo } = React.useContext(RepositoryContext)
  const loadingState = useLoading({
    load: () => reportRepo.get(period),
    dependencies: [period],
    then: setTimestamps
  })

  if (loadingState === 'Loading')
    return <h1>todo loading 10. Data loading throbber</h1>

  const groupedBy = groupBy(timestamps)(x => x.taskTitle)

  return <>
    {Object.keys(groupedBy).map(y => <ReportTimestampsGroup key={y}
      taskName={y}
      timestamps={groupedBy[y].map(x => ({
        id: x.id,
        dateTime: getDateTimeDiff(x.datetimeStart, x.datetimeEnd),
        comment: x.comment
      }))}
    />)}
  </>
}

function getDateTimeDiff(start: Date, end?: Date) {
  const fullMinutes = differenceInMinutes(start)(end || new Date())
  const hours = Math.floor(fullMinutes / 60) // eslint-disable-line @typescript-eslint/no-magic-numbers
  const minutes = fullMinutes % 60 // eslint-disable-line @typescript-eslint/no-magic-numbers

  return `${hours}:${minutes}`
}
