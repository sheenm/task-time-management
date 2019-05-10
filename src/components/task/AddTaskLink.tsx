import { Link } from '@reach/router'
import { addTaskModalPageRoute, IAddTaskRouteState } from 'components/pages/AddTaskModalPage'
import React from 'react'


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
