import { Router } from '@reach/router'
import { NotFoundPage } from 'pages/NotFoundPage'
import { ReportsPage, reportsPageRoute } from 'pages/ReportsPage'
import { TrackerPage, trackerPageRoute } from 'pages/TrackerPage'
import 'index.scss'
import React from 'react'
import ReactDOM from 'react-dom'
import * as serviceWorker from 'serviceWorker'
import { ProjectsContextProvider } from 'components/project/ProjectsContextProvider'

const App: React.FC = () => {
  return <ProjectsContextProvider>
    <Router>
      <TrackerPage path={trackerPageRoute.template} />
      <ReportsPage path={reportsPageRoute.template} />
      <NotFoundPage default />
    </Router>
  </ProjectsContextProvider>
}

ReactDOM.render(<App />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
