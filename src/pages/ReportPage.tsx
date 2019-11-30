import { RouteComponentProps, Router } from '@reach/router'
import { StandardPeriodNames } from 'app/report'
import { IRoute } from 'app/routes'
import { NotFoundPage } from 'pages/NotFoundPage'
import { reportsPageRoute } from 'pages/ReportsPage'
import { Report } from 'components/report/Report'
import { ReportSettingsPicker } from 'components/report/ReportSettingsPicker'
import { standardPeriods } from 'components/report/ReportSettingsPicker/standardPeriods'
import React from 'react'
import { AddProjectModalPage, addProjectModalPageRoute } from './AddProjectModalPage'

export const reportPageRoute: IRoute<string> = {
  template: ':period/*',
  getUrl: (period) => `${reportsPageRoute.getUrl()}${period}`
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

    <Router>
      <AddProjectModalPage path={addProjectModalPageRoute.template} />
    </Router>
  </>
}
