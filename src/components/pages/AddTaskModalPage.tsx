import { RouteComponentProps } from '@reach/router'
import { IRoute } from 'app/routes'
import React from 'react'
import { AddTaskModal } from '../task/AddTaskModal'

export const addTaskModalPageRoute: IRoute = {
  template: 'add-task',
  getUrl: () => 'add-task'
}

export interface IAddTaskRouteState {
  projectId: number
}

export const AddTaskModalPage: React.FC<RouteComponentProps> = ({ navigate, location }) => {
  const navigateBack = React.useCallback(() => {
    if (navigate === undefined || location === undefined)
      return

    const backRoute = location.pathname.replace(addTaskModalPageRoute.template, '')
    navigate(backRoute)

  }, [navigate, location])

  if (location === undefined)
    return <div />

  const { projectId } = location.state as IAddTaskRouteState

  return <AddTaskModal closeModal={navigateBack} projectId={projectId} />
}
