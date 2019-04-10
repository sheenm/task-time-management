import { IProject } from 'app/dto'
import React, { useReducer } from 'react'
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

interface IAddProject {
  type: 'ADD_PROJECT',
  project: IProject
}

type ActionTypes = ILoadProjectsAction | IRenameProjectAction | IAddProject

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
  const [isLoading, setIsLoading] = React.useState(false)
  const { projectRepo } = React.useContext(RepositoryContext)

  React.useEffect(() => {
    let didCancel = false

    setIsLoading(true)
    projectRepo.get()
      .then(projects => {
        if (didCancel)
          return

        setIsLoading(false)
        dispatch({ type: 'LOAD_PROJECTS', projects })
      })

    return () => { didCancel = true }
  }, [])

  const createRenameFn = (id: number) =>
    (newTitle: string) => dispatch({ type: 'RENAME_PROJECT', id, newTitle })

  if (isLoading)
    return <h1>todo loading 10. Data loading trobber</h1>

  return <>
    {stateProjects.map(x =>
      <Project
        key={x.id}
        project={x}
        rename={createRenameFn(x.id)}
        addProject={() => console.log('todo 1: Projects: Can create subprojects and tasks in projects')}
        addTask={() => console.log('todo 1: Projects: Can create subprojects and tasks in projects')}
      />
    )}
  </>
}
