import { Callout, Intent } from '@blueprintjs/core'
import { RouteComponentProps, Router } from '@reach/router'
import { IProject } from 'app/businessObjects'
import { IRoute } from 'app/routes'
import { AddProjectModalPage, addProjectModalPageRoute } from 'pages/AddProjectModalPage'
import { AddTaskModalPage, addTaskModalPageRoute } from 'pages/AddTaskModalPage'
import { Project } from 'components/project/Project'
import { ProjectsContext } from 'components/project/ProjectsContextProvider'
import { ServiceContext } from 'components/services/ServiceContext'
import { TasksContextProvider } from 'components/task/TasksContextProvider'
import { TimestampsContextProvider } from 'components/timestamp/TimestampsContextProvider'
import React from 'react'
import { EditTimestampModalPage, editTimestampModalPageRoute } from './EditTimestampModalPage'

export const projectPageRoute: IRoute<number> = {
  template: ':projectId/*',
  getUrl: (projectId) => `/${projectId}`
}

interface IProps {
  projectId: string
}

export const ProjectPage: React.FC<RouteComponentProps<IProps>> = ({ projectId }) => {
  const { stateProjects, dispatch } = React.useContext(ProjectsContext)
  const { projectService } = React.useContext(ServiceContext)
  const project = stateProjects.get(Number(projectId))

  const rename = React.useCallback((newTitle: string) => {
    if (project === undefined)
      return

    const changedProject: IProject = { ...project, title: newTitle }

    projectService.save(changedProject)
      .then(() => dispatch({ type: 'RENAME_PROJECT', id: project.id, newTitle }))
  }, [project, projectService, dispatch])

  if (project === undefined)
    return <Callout intent={Intent.DANGER}>
      We're sorry. We couldn't find this project
     </Callout>

  return <TasksContextProvider projectId={project.id}>
    <TimestampsContextProvider>
      <Project project={project} rename={rename} />
      <Router>
        <AddProjectModalPage path={addProjectModalPageRoute.template} />
        <AddTaskModalPage path={addTaskModalPageRoute.template} />
        <EditTimestampModalPage path={editTimestampModalPageRoute.template} />
      </Router>
    </TimestampsContextProvider>
  </TasksContextProvider>
}
