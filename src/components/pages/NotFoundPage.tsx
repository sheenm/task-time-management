import { H1 } from '@blueprintjs/core'
import { RouteComponentProps } from '@reach/router'
import React from 'react'

export const NotFoundPage: React.FC<RouteComponentProps> = ({ }) => {

  return <div>
    <H1>The page doesn't exist</H1>
  </div>
}
