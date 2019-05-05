import { RouteComponentProps } from '@reach/router'
import { StandardPeriodNames } from 'app/report'
import { IRoute } from 'app/routes'
import React from 'react'
import { Report } from '../report/Report'
import { ReportSettingsPicker } from '../report/ReportSettingsPicker'
import { standardPeriods } from '../report/ReportSettingsPicker/standardPeriods'
import { NotFoundPage } from './NotFoundPage'
import { reportsPageRoute } from './ReportsPage'

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
