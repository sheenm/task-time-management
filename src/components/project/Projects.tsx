import { IProject } from 'app/dto'
import React from 'react'
import { useLoading } from '../../hooks/useLoading'
import { RepositoryContext } from '../repositories/RepositoryContext'
import { Project } from './Project'
import { ProjectsContext } from './ProjectsContextProvider'

export const Projects: React.FC = () => {
  const { stateProjects, dispatch } = React.useContext(ProjectsContext)
  const { projectRepo } = React.useContext(RepositoryContext)
  const loadingState = useLoading({
    load: () => projectRepo.get(),
    then: projects => dispatch({ type: 'LOAD_PROJECTS', projects })
  })

  const createRenameFn = (project: IProject) =>
    (newTitle: string) => {
      const changedProject: IProject = { ...project, title: newTitle }
      projectRepo.save(changedProject)
        .then(() => dispatch({ type: 'RENAME_PROJECT', id: project.id, newTitle }))
    }

  if (loadingState === 'Loading')
    return <h1>todo loading 10. Data loading trobber</h1>

  return <>
    {stateProjects.map(x =>
      <Project
        key={x.id}
        project={x}
        rename={createRenameFn(x)}
      />
    )}
  </>
}
