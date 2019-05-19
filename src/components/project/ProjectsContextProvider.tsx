import { Dictionary, IProject } from "app/dto"
import React from 'react'
import { neverReached } from "utils/neverReached"

interface ILoadProjectsAction {
  type: 'LOAD_PROJECTS'
  projects: Dictionary<IProject>
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

const reducer = (state: Dictionary<IProject>, action: ActionTypes) => {
  switch (action.type) {
    case 'LOAD_PROJECTS':
      return action.projects
    case 'RENAME_PROJECT':
      const renamedState = new Map(state)
      const renamedItem = renamedState.get(action.id)
      if (renamedItem === undefined)
        return state

      renamedItem.title = action.newTitle

      return renamedState
    case 'ADD_PROJECT':
      const newState = new Map(state)
      newState.set(action.project.id, action.project)

      return newState
    default:
      return neverReached(action)
  }
}

interface IProjectsContext {
  stateProjects: Dictionary<IProject>
  dispatch: React.Dispatch<ActionTypes>
}

export const ProjectsContext = React.createContext<IProjectsContext>({
  dispatch: () => {
    throw new Error('Project context is not implemented')
  },
  stateProjects: new Map()
})

export const ProjectsContextProvider: React.FC = ({ children }) => {
  const [stateProjects, dispatch] = React.useReducer(reducer, new Map())

  return <ProjectsContext.Provider value={{ stateProjects, dispatch }}>
    {children}
  </ProjectsContext.Provider>
}
