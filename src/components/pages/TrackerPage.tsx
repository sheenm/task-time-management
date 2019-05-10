import { RouteComponentProps, Router } from '@reach/router'
import { IRoute } from 'app/routes'
import React from 'react'
import injectSheet, { WithSheet } from 'react-jss'
import { ProjectsContextProvider } from '../project/ProjectsContextProvider'
import { ProjectsList } from '../project/ProjectsList'
import { AddProjectModalPage, addProjectModalPageRoute } from './AddProjectModalPage'
import { ProjectPage, projectPageRoute } from './ProjectPage'
import { TrackerPageDefault } from './TrackerPageDefault'

export const trackerPageRoute: IRoute = {
  template: '/*',
  getUrl: () => '/'
}

const styles = {
  main: {
    '@media (min-width:600px)': {
      display: 'grid',
      gridColumnGap: '1rem',
      gridTemplateColumns: '300px 1fr',
    }
  },
  link: {
    marginBottom: '1rem'
  }
}

interface IProps extends RouteComponentProps, WithSheet<typeof styles, {}> { }

export const TrackerPageInner: React.FC<IProps> = ({ classes }) => {

  return <ProjectsContextProvider>
    <main role='main' className={classes.main}>
      <aside>
        <ProjectsList />
      </aside>
      <section>
        <Router>
          <TrackerPageDefault default />
          <ProjectPage path={projectPageRoute.template} />
          <AddProjectModalPage path={addProjectModalPageRoute.template} />
        </Router>
      </section>
    </main>
  </ProjectsContextProvider >
}

export const TrackerPage = injectSheet(styles)(TrackerPageInner)
