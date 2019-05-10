import { MenuDivider, UL } from '@blueprintjs/core'
import { Link } from '@reach/router'
import React from 'react'
import injectSheet, { WithSheet } from 'react-jss'
import { useLoading } from '../../hooks/useLoading'
import { projectPageRoute } from '../pages/ProjectPage'
import { RepositoryContext } from '../repositories/RepositoryContext'
import { AddProjectLink } from './AddProjectLink'
import { ProjectsContext } from './ProjectsContextProvider'

const styles = {
  ul: {
    listStyle: 'none',
    padding: 0
  }
}

interface IProps extends WithSheet<typeof styles, {}> { }

const ProjectsListInner: React.FC<IProps> = ({ classes }) => {
  const { stateProjects, dispatch } = React.useContext(ProjectsContext)
  const { projectRepo } = React.useContext(RepositoryContext)
  const loadingState = useLoading({
    load: () => projectRepo.get(),
    then: projects => dispatch({ type: 'LOAD_PROJECTS', projects })
  })

  if (loadingState === 'Loading')
    return <h1>todo loading 10. Data loading trobber</h1>

  return <UL className={classes.ul}>
    <li>
      <AddProjectLink />
    </li>
    <MenuDivider />
    {stateProjects.map(x => <li key={x.id}>
      <Link to={projectPageRoute.getUrl(x.id)}>{x.title}</Link>
    </li>
    )}
  </UL>
}

export const ProjectsList = injectSheet(styles)(ProjectsListInner)
