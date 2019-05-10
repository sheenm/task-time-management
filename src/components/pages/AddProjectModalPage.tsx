import { RouteComponentProps } from '@reach/router'
import { IRoute } from 'app/routes'
import React from 'react'
import { AddProjectModal } from '../project/AddProjectModal'

export const addProjectModalPageRoute: IRoute<string> = {
  template: 'add-project',
  getUrl: () => '/add-project'
}

export const AddProjectModalPage: React.FC<RouteComponentProps> = ({ navigate, location }) => {

  const navigateBack = React.useCallback(() => {
    if (navigate === undefined || location === undefined)
      return

    const backRoute = location.pathname.replace(addProjectModalPageRoute.template, '')
    navigate(backRoute)

  }, [navigate])

  return <AddProjectModal closeModal={navigateBack} />
}