import { Classes } from '@blueprintjs/core'
import { IProject, ITask } from 'app/businessObjects'
import { ProjectPresenter } from 'components/project/ProjectPresenter'
import { ServiceContext } from 'components/services/ServiceContext'
import { Task } from 'components/task/Task'
import { TasksContext } from 'components/task/TasksContextProvider'
import { TimestampsContext } from 'components/timestamp/TimestampsContextProvider'
import { useLoading } from 'hooks/useLoading'
import React from 'react'

interface IProps {
  project: IProject
  rename: (newTitle: string) => void
}

export const Project: React.FC<IProps> = ({ project, rename }) => {
  const { stateTasks, dispatch } = React.useContext(TasksContext)
  const timestampsContext = React.useContext(TimestampsContext)
  const { tasksService, timestampsService } = React.useContext(ServiceContext)

  const loadingTasksState = useLoading({
    load: () => tasksService.get(project.id),
    then: tasks => dispatch({ type: 'LOAD_TASKS', tasks }),
    dependencies: [project]
  })

  const loadingTimestampsState = useLoading({
    load: () => timestampsService.getAll(),
    then: timestamps => timestampsContext.dispatch({ type: 'LOAD_TIMESTAMPS', timestamps })
  })

  const createRenameFn = React.useCallback((task: ITask) => {
    return (newTitle: string) => {
      const changedTask: ITask = { ...task, title: newTitle }
      tasksService.save(changedTask)
        .then(() => dispatch({ type: 'RENAME_TASK', id: task.id, newTitle }))
    }
  }, [dispatch, tasksService])

  const loadingClass = loadingTasksState === 'Loading' || loadingTimestampsState === 'Loading' ? Classes.SKELETON : ''

  return <>
    <ProjectPresenter
      title={project.title}
      onTitleChanged={rename}
      projectId={project.id}
    />
    {[...stateTasks.values()].map(x => <Task className={loadingClass} key={x.id} task={x} rename={createRenameFn(x)} />)}
  </>
}
