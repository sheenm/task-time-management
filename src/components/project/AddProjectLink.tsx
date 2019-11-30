import { Link, Location } from '@reach/router'
import { addProjectModalPageRoute } from 'pages/AddProjectModalPage'
import React from 'react'
import { Button, Intent } from '@blueprintjs/core'

export const AddProjectLink: React.FC = () => {

  return <Location>
    {({ location }) => {
      const url = location.pathname.endsWith('/')
        ? location.pathname + addProjectModalPageRoute.template
        : location.pathname + addProjectModalPageRoute.getUrl()

      return <Link to={url}>
        <Button minimal intent={Intent.NONE} icon='add'>Add Project</Button>
      </Link>
    }}
  </Location>
}
