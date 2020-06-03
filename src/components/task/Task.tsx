import { ITask, ITimestamp, WithoutId } from 'app/businessObjects'
import { ServiceContext } from 'components/services/ServiceContext'
import { TaskPresenter } from 'components/task/TaskPresenter'
import { Timestamp } from 'components/timestamp/Timestamp'
import { TimestampsContext } from 'components/timestamp/TimestampsContextProvider'
import { useToggle } from 'hooks/useToggle'
import React from 'react'

interface IProps {
  task: ITask
  rename: (newTitle: string) => void
  className: string
}

export const Task: React.FC<IProps> = ({ task, rename, className }) => {
  const [isOpen, toggleOpen] = useToggle(false)
  const { stateTimestamps, dispatch } = React.useContext(TimestampsContext)
  const { timestampsService } = React.useContext(ServiceContext)
  const [startedTimestamp, setStartedTimestamp] = React.useState<ITimestamp | undefined>(undefined)

  const taskTimestamps = [...stateTimestamps.values()].filter(x => x.taskId === task.id)

  React.useEffect(() => {
    const activeTimestamp = taskTimestamps.find(x => x.datetimeEnd === null)
    setStartedTimestamp(activeTimestamp)
  }, [taskTimestamps])

  const createChangeCommentFn = React.useCallback((timestamp: ITimestamp) => {
    return (newComment: string) => {
      const changedTimestamp: ITimestamp = { ...timestamp, comment: newComment }
      timestampsService.save(changedTimestamp)
        .then(() => dispatch({ type: 'CHANGE_TIMESTAMP', changedTimestamp }))
    }
  }, [timestampsService, dispatch])

  const createRemoveFn = React.useCallback((id: number) => {
    return () => {
      timestampsService.delete(id)
        .then(() => {
          dispatch({ type: 'REMOVE_TIMESTAMP', id })
          if (startedTimestamp !== undefined && startedTimestamp.id === id)
            setStartedTimestamp(undefined)
        })

    }
  }, [startedTimestamp, timestampsService, dispatch])

  const startTimestamp = React.useCallback(() => {
    if (startedTimestamp !== undefined)
      return

    const withoutId: WithoutId<ITimestamp> = {
      comment: '',
      datetimeEnd: null,
      datetimeStart: new Date(),
      taskId: task.id
    }

    timestampsService.add(withoutId)
      .then((id) => {
        const timestamp = { ...withoutId, id }
        dispatch({ type: 'CREATE_TIMESTAMP', timestamp })
        setStartedTimestamp(timestamp)
      })
  }, [startedTimestamp, timestampsService, task.id, dispatch])

  const stopTimestamp = React.useCallback(() => {
    if (startedTimestamp === undefined)
      return

    startedTimestamp.datetimeEnd = new Date()
    timestampsService.save(startedTimestamp)
      .then(() => {
        dispatch({ type: 'CHANGE_TIMESTAMP', changedTimestamp: startedTimestamp })
        setStartedTimestamp(undefined)
      })
  }, [startedTimestamp, timestampsService, dispatch])

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
    className={className}
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
