import { RouteComponentProps } from '@reach/router'
import { IRoute } from 'app/routes'
import React from 'react'
import { Projects } from '../project/Projects'

export const trackerPageRoute: IRoute = {
  template: '/',
  getUrl: () => '/'
}

export const TrackerPage: React.FC<RouteComponentProps> = () => {

  return <Projects />
}
