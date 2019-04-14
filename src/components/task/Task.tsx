import { ITask } from 'app/dto'
import React from 'react'
import { useToggle } from '../../hooks/useToggle'
import { Timestamps } from '../timestamp/Timestamps'
import { TaskPresenter } from './TaskPresenter'

interface IProps {
  task: ITask
  rename: (newTitle: string) => void
}

export const Task: React.FC<IProps> = ({ task, rename }) => {
  const [isOpen, toggleOpen] = useToggle(false)
  const toggleTaskStart = React.useCallback(() =>
    console.log('todo 2: Can Start and Stop tasks'), [])

  return <TaskPresenter
    title={task.title}
    changeTitle={rename}
    isOpen={isOpen}
    toggleOpen={toggleOpen}
    isStarted={false}
    toggleTaskStart={toggleTaskStart}
  >
    <Timestamps taskId={task.id} />
  </TaskPresenter>
}
