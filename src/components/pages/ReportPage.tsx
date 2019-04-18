import { H1 } from '@blueprintjs/core'
import { RouteComponentProps } from '@reach/router'
import { IRoute } from 'app/routes'
import React from 'react'

export const reportPageRoute: IRoute = {
  template: 'report',
  getUrl: () => 'report'
}

export const ReportPage: React.FC<RouteComponentProps> = () => {

  return <div>
    <H1>Here we go! daily report page</H1>
  </div>
}
