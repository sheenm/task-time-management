import { Callout, Intent } from '@blueprintjs/core'
import { RouteComponentProps, Router } from '@reach/router'
import { IProject } from 'app/dto'
import { IRoute } from 'app/routes'
import React from 'react'
import { Project } from '../project/Project'
import { ProjectsContext } from '../project/ProjectsContextProvider'
import { RepositoryContext } from '../repositories/RepositoryContext'
import { AddProjectModalPage, addProjectModalPageRoute } from './AddProjectModalPage'
import { AddTaskModalPage, addTaskModalPageRoute } from './AddTaskModalPage'

export const projectPageRoute: IRoute<number> = {
  template: ':projectId/*',
  getUrl: (projectId) => {
    return `/${projectId}`
  }
}

interface IProps {
  projectId: string
}

export const ProjectPage: React.FC<RouteComponentProps<IProps>> = ({ projectId }) => {
  const { stateProjects, dispatch } = React.useContext(ProjectsContext)
  const { projectRepo } = React.useContext(RepositoryContext)
  const project = stateProjects.find(x => x.id === Number(projectId))

  const rename = React.useCallback((newTitle: string) => {
    if (project === undefined)
      return

    const changedProject: IProject = { ...project, title: newTitle }

    projectRepo.save(changedProject)
      .then(() => dispatch({ type: 'RENAME_PROJECT', id: project.id, newTitle }))
  }, [project, projectRepo])

  if (project === undefined)
    return <Callout intent={Intent.DANGER}>
      We're sorry. We couldn't find this project
     </Callout>

  return <>
    <Project project={project} rename={rename} />
    <Router>
      <AddProjectModalPage path={addProjectModalPageRoute.template} />
      <AddTaskModalPage path={addTaskModalPageRoute.template} />
    </Router>
  </>
}
