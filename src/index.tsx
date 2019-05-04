import { Router } from '@reach/router'
import React from 'react'
import ReactDOM from 'react-dom'
import { Header } from './components/layout/Header'
import { Wrapper } from './components/layout/Wrapper'
import { NotFoundPage } from './components/pages/NotFoundPage'
import { ReportsPage, reportsPageRoute } from './components/pages/ReportsPage'
import { TrackerPage, trackerPageRoute } from './components/pages/TrackerPage'
import './index.css'
import * as serviceWorker from './serviceWorker'
import './utils/jsAuguments'

const App: React.FC = () => {
  return <>
    <Header />
    <Wrapper marginTop='1rem'>
      <Router>
        <TrackerPage path={trackerPageRoute.template} />
        <ReportsPage path={reportsPageRoute.template} />
        <NotFoundPage default />
      </Router>
    </Wrapper>
  </>
}

ReactDOM.render(<App />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
