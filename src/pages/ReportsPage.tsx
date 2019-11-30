import { RouteComponentProps, Router } from '@reach/router'
import { IStaticRoute } from 'app/routes'
import { ReportPage, reportPageRoute } from 'pages/ReportPage'
import React from 'react'
import { Layout } from 'components/layout/Layout'
import { Header } from 'components/layout/Header'
import { addProjectModalPageRoute, AddProjectModalPage } from './AddProjectModalPage'

export const reportsPageRoute: IStaticRoute = {
  template: 'reports/*',
  getUrl: () => '/reports/'
}

export const ReportsPage: React.FC<RouteComponentProps> = () => {

  return <Layout HeaderContent={<Header />}>
    <Router>
      <ReportPage period='today' default />
      <ReportPage path={reportPageRoute.template} />
      <AddProjectModalPage path={addProjectModalPageRoute.template} />
    </Router>
  </Layout>
}
