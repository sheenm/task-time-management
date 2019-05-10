import { Callout, Intent } from '@blueprintjs/core'
import { RouteComponentProps } from '@reach/router'
import React from 'react'

export const TrackerPageDefault: React.FC<RouteComponentProps> = () => {

  return <Callout intent={Intent.PRIMARY}>
    Please select a project from the left navigation or create new!
  </Callout>
}
