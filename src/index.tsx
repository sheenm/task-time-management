import { Router } from '@reach/router'
import React from 'react'
import ReactDOM from 'react-dom'
import { Header } from './components/layout/Header'
import { Wrapper } from './components/layout/Wrapper'
import { NotFoundPage } from './components/pages/NotFoundPage'
import { ReportPage, reportPageRoute } from './components/pages/ReportPage'
import { TrackerPage, trackerPageRoute } from './components/pages/TrackerPage'
import './index.css'
import * as serviceWorker from './serviceWorker'

const App: React.FC = () => {
  return <>
    <Header />
    <Wrapper marginTop='1rem'>
      <Router>
        <TrackerPage path={trackerPageRoute.template} />
        <ReportPage path={reportPageRoute.template} />
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

