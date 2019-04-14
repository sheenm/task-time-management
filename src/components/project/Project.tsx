import { IProject } from 'app/dto'
import React from 'react'
import { useToggle } from '../../hooks/useToggle'
import { Tasks } from '../task/Tasks'
import { ProjectPresenter } from './ProjectPresenter'

interface IProps {
  project: IProject
  rename: (newTitle: string) => void
  addTask: () => void
}

export const Project: React.FC<IProps> = ({ project, rename, addTask }) => {
  const [isOpen, toggle] = useToggle(false)

  return <ProjectPresenter
    title={project.title}
    onTitleChanged={rename}
    isOpen={isOpen}
    toggleOpen={toggle}
    addTask={addTask}
  >
    <Tasks projectId={project.id} />
  </ProjectPresenter>
}
