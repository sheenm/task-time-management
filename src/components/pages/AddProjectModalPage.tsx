import { RouteComponentProps } from '@reach/router'
import { IRoute } from 'app/routes'
import { AddProjectModal } from 'components/project/AddProjectModal'
import React from 'react'

export const addProjectModalPageRoute: IRoute = {
  template: 'add-project',
  getUrl: () => '/add-project'
}

export const AddProjectModalPage: React.FC<RouteComponentProps> = ({ navigate, location }) => {

  const navigateBack = React.useCallback(() => {
    if (navigate === undefined || location === undefined)
      return

    const backRoute = location.pathname.replace(addProjectModalPageRoute.template, '')
    navigate(backRoute)

  }, [navigate, location])

  return <AddProjectModal closeModal={navigateBack} />
}
