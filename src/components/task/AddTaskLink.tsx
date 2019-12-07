import { Link } from '@reach/router'
import { addTaskModalPageRoute } from 'pages/AddTaskModalPage'
import React from 'react'

interface IProps {
  projectId: number
}

export const AddTaskLink: React.FC<IProps> = ({ children, projectId }) => {

  return <Link to={addTaskModalPageRoute.getUrl({ projectId })}>
    {children}
  </Link>
}
