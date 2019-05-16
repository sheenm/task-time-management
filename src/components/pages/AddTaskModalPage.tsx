import { RouteComponentProps } from '@reach/router'
import { IRoute } from 'app/routes'
import { AddTaskModal } from 'components/task/AddTaskModal'
import React from 'react'

interface IRouteProps {
  projectId: number | string
}

export const addTaskModalPageRoute: IRoute<IRouteProps> = {
  template: 'add-task/:projectId',
  getUrl: ({ projectId }) => `add-task/${projectId}`
}

interface IProps {
  projectId: string
}

export const AddTaskModalPage: React.FC<RouteComponentProps<IProps>> = ({ navigate, location, projectId }) => {
  const navigateBack = React.useCallback(() => {
    if (navigate === undefined || location === undefined || projectId === undefined)
      return

    const backRoute = location.pathname.replace(addTaskModalPageRoute.getUrl({ projectId }), '')
    navigate(backRoute)

  }, [navigate, location])

  if (location === undefined || projectId === undefined)
    return <div />

  return <AddTaskModal closeModal={navigateBack} projectId={Number(projectId)} />
}
