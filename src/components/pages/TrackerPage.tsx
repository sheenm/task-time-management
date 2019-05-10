import { RouteComponentProps, Router } from '@reach/router'
import { IRoute } from 'app/routes'
import { AddProjectModalPage, addProjectModalPageRoute } from 'components/pages/AddProjectModalPage'
import { ProjectPage, projectPageRoute } from 'components/pages/ProjectPage'
import { TrackerPageDefault } from 'components/pages/TrackerPageDefault'
import { ProjectsContextProvider } from 'components/project/ProjectsContextProvider'
import { ProjectsList } from 'components/project/ProjectsList'
import React from 'react'
import injectSheet, { WithSheet } from 'react-jss'

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
