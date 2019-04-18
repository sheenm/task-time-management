import { RouteComponentProps } from '@reach/router'
import { IRoute } from 'app/routes'
import React from 'react'

export const reportPageRoute: IRoute<string> = {
  template: ':period',
  getUrl: (period) => period || ''
}

interface IProps {
  period: string
}

export const ReportPage: React.FC<RouteComponentProps<IProps>> = ({ period }) => {

  return <>period</>
}
