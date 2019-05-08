import { RouteComponentProps } from '@reach/router'
import { IRoute } from 'app/routes'
import React from 'react'
import { AddProjectModal } from '../project/AddProjectModal'
import { trackerPageRoute } from './TrackerPage'

export const addProjectModalPageRoute: IRoute<string> = {
  template: 'add-project',
  getUrl: () => '/add-project'
}

export const AddProjectModalPage: React.FC<RouteComponentProps> = ({ navigate }) => {

  const navigateBack = React.useCallback(() => {
    if (navigate === undefined)
      return

    navigate(trackerPageRoute.getUrl())

  }, [navigate])

  return <AddProjectModal closeModal={navigateBack} />
}
