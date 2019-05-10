import { Link } from '@reach/router'
import React from 'react'
import { addTaskModalPageRoute, IAddTaskRouteState } from '../pages/AddTaskModalPage'

interface IProps {
  projectId: number
}

export const AddTaskLink: React.FC<IProps> = ({ children, projectId }) => {

  const state: IAddTaskRouteState = {
    projectId
  }

  return <Link to={addTaskModalPageRoute.getUrl()} state={state}>
    {children}
  </Link>
}
