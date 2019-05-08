import { Button } from '@blueprintjs/core'
import { Link, RouteComponentProps, Router } from '@reach/router'
import { IRoute } from 'app/routes'
import React from 'react'
import injectSheet, { WithSheet } from 'react-jss'
import { Projects } from '../project/Projects'
import { ProjectsContextProvider } from '../project/ProjectsContextProvider'
import { AddProjectModalPage, addProjectModalPageRoute } from './AddProjectModalPage'

export const trackerPageRoute: IRoute = {
  template: '/*',
  getUrl: () => '/'
}

const styles = {
  link: {
    marginBottom: '1rem'
  }
}

interface IProps extends RouteComponentProps, WithSheet<typeof styles, {}> { }

export const TrackerPageInner: React.FC<IProps> = ({ classes }) => {

  return <ProjectsContextProvider>
    <Link to={addProjectModalPageRoute.getUrl()}>
      <Button tabIndex={-1} className={classes.link}>Add project</Button>
    </Link>

    <Projects />

    <Router>
      <AddProjectModalPage path={addProjectModalPageRoute.template} />
    </Router>
  </ProjectsContextProvider>
}

export const TrackerPage = injectSheet(styles)(TrackerPageInner)
