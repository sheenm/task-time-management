import { RouteComponentProps, Router } from '@reach/router'
import { IStaticRoute } from 'app/routes'
import { Header } from 'components/layout/Header'
import { Layout } from 'components/layout/Layout'
import { AddProjectModalPage, addProjectModalPageRoute } from 'pages/AddProjectModalPage'
import { ProjectPage, projectPageRoute } from 'pages/ProjectPage'
import { TrackerPageDefault } from 'pages/TrackerPageDefault'
import React from 'react'

export const trackerPageRoute: IStaticRoute = {
  template: '/*',
  getUrl: () => '/'
}

interface IProps extends RouteComponentProps { }

export const TrackerPage: React.FC<IProps> = () => {

  return <Layout HeaderContent={<Header />}>
    <main role='main'>
      <Router>
        <TrackerPageDefault default />
        <ProjectPage path={projectPageRoute.template} />
        <AddProjectModalPage path={addProjectModalPageRoute.template} />
      </Router>
    </main>
  </Layout>
}
