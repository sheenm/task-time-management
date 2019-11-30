import { Menu, MenuDivider, MenuItem } from '@blueprintjs/core'
import { ProjectsContext } from 'components/project/ProjectsContextProvider'
import React from 'react'
import { AddProjectLink } from './AddProjectLink'
import { projectPageRoute } from 'pages/ProjectPage'
import { Link } from '@reach/router'
import styles from './ProjectsList.module.scss'

export const ProjectsList: React.FC = () => {
  const { stateProjects } = React.useContext(ProjectsContext)


  return <Menu>
    {[...stateProjects.values()].map((proj) =>
      <Link key={proj.id} to={projectPageRoute.getUrl(proj.id)} className={styles.link} >
        <MenuItem text={proj.title} />
      </Link>)}

    <MenuDivider />
    <AddProjectLink />
  </Menu>
}
