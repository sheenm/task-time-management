import { IProject } from 'app/dto'
import React from 'react'
import { Tasks } from '../task/Tasks'
import { ProjectPresenter } from './ProjectPresenter'

interface IProps {
  project: IProject
  rename: (newTitle: string) => void
  addProject: () => void
  addTask: () => void
}

export const Project: React.FC<IProps> = ({ project, rename, addProject, addTask }) => {
  const [isOpen, setIsOpen] = React.useState(false)
  const toggleOpen = () => setIsOpen(!isOpen)

  return <ProjectPresenter
    title={project.title}
    onTitleChanged={rename}
    isOpen={isOpen}
    toggleOpen={toggleOpen}
    addProject={addProject}
    addTask={addTask}
  >
    <Tasks projectId={project.id} />
  </ProjectPresenter>
}
