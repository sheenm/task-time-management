import { IProject } from 'app/dto'
import React, { useReducer } from 'react'
import { LoadingStastes, useLoading } from '../../hooks/useLoading'
import { neverReached } from '../../utils/neverReached'
import { RepositoryContext } from '../repositories/RepositoryContext'
import { Project } from './Project'

interface ILoadProjectsAction {
  type: 'LOAD_PROJECTS'
  projects: IProject[]
}
interface IRenameProjectAction {
  type: 'RENAME_PROJECT'
  id: number
  newTitle: string
}

interface IAddProjectAction {
  type: 'ADD_PROJECT',
  project: IProject
}

type ActionTypes = ILoadProjectsAction | IRenameProjectAction | IAddProjectAction

const reducer = (state: IProject[], action: ActionTypes) => {
  switch (action.type) {
    case 'LOAD_PROJECTS':
      return action.projects
    case 'RENAME_PROJECT':
      const renameIndex = state.findIndex(x => x.id === action.id)
      const renamedState = [...state]
      renamedState[renameIndex].title = action.newTitle

      return renamedState
    case 'ADD_PROJECT':
      return [...state, action.project]
    default:
      return neverReached(action)
  }
}

export const Projects: React.FC = () => {
  const [stateProjects, dispatch] = useReducer(reducer, [])
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

  if (loadingState === LoadingStastes.Loading)
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
