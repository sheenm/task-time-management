import { IProject, ITask } from 'app/dto'
import { ProjectPresenter } from 'components/project/ProjectPresenter'
import { RepositoryContext } from 'components/repositories/RepositoryContext'
import { Task } from 'components/task/Task'
import { TasksContext } from 'components/task/TasksContextProvider'
import { useLoading } from 'hooks/useLoading'
import React from 'react'

interface IProps {
  project: IProject
  rename: (newTitle: string) => void
}

export const Project: React.FC<IProps> = ({ project, rename }) => {
  const { stateTasks, dispatch } = React.useContext(TasksContext)
  const { tasksRepo } = React.useContext(RepositoryContext)

  const loadingState = useLoading({
    load: () => tasksRepo.get(project.id),
    then: tasks => dispatch({ type: 'LOAD_TASKS', tasks }),
    dependencies: [project]
  })

  const createRenameFn = React.useCallback((task: ITask) => {
    return (newTitle: string) => {
      const changedTask: ITask = { ...task, title: newTitle }
      tasksRepo.save(changedTask)
        .then(() => dispatch({ type: 'RENAME_TASK', id: task.id, newTitle }))
    }
  }, [tasksRepo])

  if (loadingState === 'Loading')
    return <h1>todo loading 10. Data loading trobber</h1>

  return <>
    <ProjectPresenter
      title={project.title}
      onTitleChanged={rename}
      projectId={project.id}
    />
    {stateTasks.map(x =>
      <Task key={x.id} task={x} rename={createRenameFn(x)} />
    )}
  </>

}
