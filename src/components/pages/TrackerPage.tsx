import { RouteComponentProps, Router } from '@reach/router'
import { IRoute } from 'app/routes'
import React from 'react'
import { Projects } from '../project/Projects'
import { ProjectsContextProvider } from '../project/ProjectsContextProvider'
import { AddProjectModalPage, addProjectModalPageRoute } from './AddProjectModalPage'

export const trackerPageRoute: IRoute = {
  template: '/*',
  getUrl: () => '/'
}

export const TrackerPage: React.FC<RouteComponentProps> = () => {

  return <ProjectsContextProvider>
    <Projects />

    <Router>
      <AddProjectModalPage path={addProjectModalPageRoute.template} />
    </Router>
  </ProjectsContextProvider>
}
