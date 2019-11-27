import { RouteComponentProps, Router } from '@reach/router'
import { IStaticRoute } from 'app/routes'
import { ReportPage, reportPageRoute } from 'components/pages/ReportPage'
import React from 'react'

export const reportsPageRoute: IStaticRoute = {
  template: 'reports/*',
  getUrl: () => 'reports'
}

export const ReportsPage: React.FC<RouteComponentProps> = () => {

  return <Router>
    <ReportPage period='today' default />
    <ReportPage path={reportPageRoute.template} />
  </Router>
}
