import { RouteComponentProps } from '@reach/router'
import { StandardPeriodNames } from 'app/report'
import { IRoute } from 'app/routes'
import { NotFoundPage } from 'components/pages/NotFoundPage'
import { reportsPageRoute } from 'components/pages/ReportsPage'
import { Report } from 'components/report/Report'
import { ReportSettingsPicker } from 'components/report/ReportSettingsPicker'
import { standardPeriods } from 'components/report/ReportSettingsPicker/standardPeriods'
import React from 'react'

export const reportPageRoute: IRoute<string> = {
  template: ':period',
  getUrl: (period) => {
    if (period === undefined)
      return reportsPageRoute.getUrl()

    return '/' + reportsPageRoute.getUrl() + '/' + period
  }
}

interface IProps {
  period: string
}

export const ReportPage: React.FC<RouteComponentProps<IProps>> = ({ period }) => {

  period = period as string

  if (!(period in standardPeriods))
    return <NotFoundPage />

  return <>
    <ReportSettingsPicker period={period as StandardPeriodNames} />
    <Report period={period as StandardPeriodNames} />
  </>
}
