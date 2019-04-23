import { RouteComponentProps } from '@reach/router'
import { IRoute } from 'app/routes'
import React from 'react'
import { Report } from '../report/Report'
import { reportsPageRoute } from './ReportsPage'

export const reportPageRoute: IRoute<string> = {
  template: ':period',
  getUrl: (period) => {
    if (period === undefined)
      return reportsPageRoute.getUrl()

    return '/' + reportsPageRoute.getUrl() + '/' + period
  }
}

interface IProps {
  period: string
}

export const ReportPage: React.FC<RouteComponentProps<IProps>> = ({ period }) => {

  return <Report period={period} />
}
