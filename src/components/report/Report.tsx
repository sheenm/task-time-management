import { IReportTimestamp, StandardPeriodNames } from 'app/report'
import { ReportTimestampsGroup } from 'components/report/ReportTimestampsGroup'
import { RepositoryContext } from 'components/repositories/RepositoryContext'
import 'extensions/arrays/groupBy'
import { useLoading } from 'hooks/useLoading'
import React from 'react'

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

  const groupedBy = timestamps.extGroupBy(x => x.taskTitle)

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
  if (end === undefined || !start.extIsDayEqualOrGreater(end)) {
    const now = new Date()
    if (start.extIsDayEqual(now)) {
      end = now
    }
    else {
      end = new Date(start)
      // tslint:disable-next-line: no-magic-numbers
      end.setHours(23, 59, 59)
    }

  }

  const diff = new Date(end.getTime() - start.getTime())
  const millisecondsInHour = 3600000
  const hours = diff.getTime() / millisecondsInHour
  const precisionDigits = 2

  return hours.toFixed(precisionDigits).toString()
}
