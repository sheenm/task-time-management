import { Link, Location } from '@reach/router'
import React from 'react'
import { addProjectModalPageRoute } from '../pages/AddProjectModalPage'

export const AddProjectLink: React.FC = () => {

  return <Location>
    {({ location }) => {
      if (location.pathname.endsWith('/'))
        return <Link to={location.pathname + addProjectModalPageRoute.template}>Add Project</Link>
      else
        return <Link to={location.pathname + addProjectModalPageRoute.getUrl()}>Add Project</Link>
    }}
  </Location>
}
