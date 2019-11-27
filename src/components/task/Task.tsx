import { ITask, ITimestamp, WithoutId } from 'app/businessObjects'
import { RepositoryContext } from 'components/repositories/RepositoryContext'
import { TaskPresenter } from 'components/task/TaskPresenter'
import { Timestamp } from 'components/timestamp/Timestamp'
import { TimestampsContext } from 'components/timestamp/TimestampsContextProvider'
import { useToggle } from 'hooks/useToggle'
import React from 'react'

interface IProps {
  task: ITask
  rename: (newTitle: string) => void
}

export const Task: React.FC<IProps> = ({ task, rename }) => {
  const [isOpen, toggleOpen] = useToggle(false)
  const { stateTimestamps, dispatch } = React.useContext(TimestampsContext)
  const { timestampsRepo } = React.useContext(RepositoryContext)
  const [startedTimestamp, setStartedTimestamp] = React.useState<ITimestamp | undefined>(undefined)

  const taskTimestamps = [...stateTimestamps.values()].filter(x => x.taskId === task.id)

  React.useEffect(() => {
    const activetimestamp = taskTimestamps.find(x => x.datetimeEnd === undefined)
    setStartedTimestamp(activetimestamp)
  }, [taskTimestamps])

  const createChangeCommentFn = React.useCallback((timestamp: ITimestamp) => {
    return (newComment: string) => {
      const changedTimestamp: ITimestamp = { ...timestamp, comment: newComment }
      timestampsRepo.save(changedTimestamp)
        .then(() => dispatch({ type: 'CHANGE_TIMESTAMP', changedTimestamp }))
    }
  }, [timestampsRepo, dispatch])

  const createRemoveFn = React.useCallback((id: number) => {
    return () => {
      timestampsRepo.delete(id)
        .then(() => {
          dispatch({ type: 'REMOVE_TIMESTAMP', id })
          if (startedTimestamp !== undefined && startedTimestamp.id === id)
            setStartedTimestamp(undefined)
        })

    }
  }, [startedTimestamp, timestampsRepo, dispatch])

  const startTimestamp = React.useCallback(() => {
    if (startedTimestamp !== undefined)
      return

    const withoutId: WithoutId<ITimestamp> = {
      comment: '',
      datetimeEnd: undefined,
      datetimeStart: new Date(),
      taskId: task.id
    }

    timestampsRepo.add(withoutId)
      .then((id) => {
        const timestamp = { ...withoutId, id }
        dispatch({ type: 'CREATE_TIMESTAMP', timestamp })
        setStartedTimestamp(timestamp)
      })
  }, [startedTimestamp, timestampsRepo, task.id, dispatch])

  const stopTimestamp = React.useCallback(() => {
    if (startedTimestamp === undefined)
      return

    startedTimestamp.datetimeEnd = new Date()
    timestampsRepo.save(startedTimestamp)
      .then(() => {
        dispatch({ type: 'CHANGE_TIMESTAMP', changedTimestamp: startedTimestamp })
        setStartedTimestamp(undefined)
      })
  }, [startedTimestamp, timestampsRepo, dispatch])

  const toggleTaskStart = startedTimestamp === undefined
    ? startTimestamp
    : stopTimestamp

  return <TaskPresenter
    title={task.title}
    changeTitle={rename}
    isOpen={isOpen}
    toggleOpen={toggleOpen}
    isStarted={startedTimestamp !== undefined}
    toggleTaskStart={toggleTaskStart}
  >
    {taskTimestamps.map(x =>
      <Timestamp
        key={x.id}
        timestamp={x}
        changeComment={createChangeCommentFn(x)}
        remove={createRemoveFn(x.id)} />
    )}
  </TaskPresenter>
}
