import { RouteComponentProps, Router } from '@reach/router'
import { IRoute } from 'app/routes'
import React from 'react'
import { ReportPage, reportPageRoute } from './ReportPage'

export const reportsPageRoute: IRoute = {
  template: 'reports/*',
  getUrl: () => 'reports'
}

export const ReportsPage: React.FC<RouteComponentProps> = ({ }) => {

  return <Router>
    <ReportPage period='today' default />
    <ReportPage path={reportPageRoute.template} />
  </Router>
}
