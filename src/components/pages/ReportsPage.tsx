import { RouteComponentProps, Router } from '@reach/router'
import { IRoute } from 'app/routes'
import React from 'react'
import { ReportSettingsPicker } from '../report/ReportSettingsPicker'
import { ReportPage, reportPageRoute } from './ReportPage'

export const reportsPageRoute: IRoute = {
  template: 'reports/*',
  getUrl: () => 'reports'
}

export const ReportsPage: React.FC<RouteComponentProps> = () => {

  return <div>
    <ReportSettingsPicker />

    <Router>
      <ReportPage path={reportPageRoute.template} />
    </Router>
  </div>
}
