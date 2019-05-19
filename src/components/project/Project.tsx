import { IProject, ITask } from 'app/businessObjects'
import { ProjectPresenter } from 'components/project/ProjectPresenter'
import { RepositoryContext } from 'components/repositories/RepositoryContext'
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
  const { tasksRepo, timestampsRepo } = React.useContext(RepositoryContext)

  const loadingTasksState = useLoading({
    load: () => tasksRepo.get(project.id),
    then: tasks => dispatch({ type: 'LOAD_TASKS', tasks }),
    dependencies: [project]
  })

  const loadingTimestampsState = useLoading({
    load: () => timestampsRepo.getAll(),
    then: timestamps => timestampsContext.dispatch({ type: 'LOAD_TIMESTAMPS', timestamps })
  })

  const createRenameFn = React.useCallback((task: ITask) => {
    return (newTitle: string) => {
      const changedTask: ITask = { ...task, title: newTitle }
      tasksRepo.save(changedTask)
        .then(() => dispatch({ type: 'RENAME_TASK', id: task.id, newTitle }))
    }
  }, [tasksRepo])

  if (loadingTasksState === 'Loading' || loadingTimestampsState === 'Loading')
    return <h1>todo loading 10. Data loading trobber</h1>

  return <>
    <ProjectPresenter
      title={project.title}
      onTitleChanged={rename}
      projectId={project.id}
    />
    {[...stateTasks.values()].map(x =>
      <Task key={x.id} task={x} rename={createRenameFn(x)} />
    )}
  </>
}
