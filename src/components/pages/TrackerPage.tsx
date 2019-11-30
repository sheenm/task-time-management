import { RouteComponentProps, Router } from '@reach/router'
import { IStaticRoute } from 'app/routes'
import { AddProjectModalPage, addProjectModalPageRoute } from 'components/pages/AddProjectModalPage'
import { ProjectPage, projectPageRoute } from 'components/pages/ProjectPage'
import { TrackerPageDefault } from 'components/pages/TrackerPageDefault'
import { ProjectsContextProvider } from 'components/project/ProjectsContextProvider'
import { ProjectsList } from 'components/project/ProjectsList'
import React from 'react'
import styles from './TrackerPage.module.scss'

export const trackerPageRoute: IStaticRoute = {
  template: '/*',
  getUrl: () => '/'
}

interface IProps extends RouteComponentProps { }

export const TrackerPage: React.FC<IProps> = () => {

  return <ProjectsContextProvider>
    <main role='main' className={styles.main}>
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
