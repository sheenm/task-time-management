import { RouteComponentProps, Router } from '@reach/router'
import { IRoute } from 'app/routes'
import { ReportPage, reportPageRoute } from 'components/pages/ReportPage'
import React from 'react'

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
