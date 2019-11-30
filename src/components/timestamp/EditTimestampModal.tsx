import { Button, Classes, FormGroup, InputGroup, Intent } from '@blueprintjs/core'
import { DateRangeInput } from '@blueprintjs/datetime'
import { ITimestamp } from 'app/businessObjects'
import { ThemedDialog } from 'components/layout/ThemedDialog'
import { ServiceContext } from 'components/services/ServiceContext'
import React from 'react'
import { TimestampsContext } from './TimestampsContextProvider'

interface IProps {
  timestampId: number
  closeModal: () => void
}

export const EditTimestampModal: React.FC<IProps> = ({ timestampId, closeModal }) => {
  const { stateTimestamps, dispatch } = React.useContext(TimestampsContext)
  const { timestampsService } = React.useContext(ServiceContext)
  const defaultTaskId = -1

  const timestamp = stateTimestamps.get(timestampId) || {
    comment: '',
    datetimeStart: new Date(),
    id: timestampId,
    taskId: defaultTaskId,
    datetimeEnd: undefined
  }

  React.useEffect(() => {
    setTitle(timestamp.comment)
    setDateState({
      start: timestamp.datetimeStart,
      end: timestamp.datetimeEnd
    })
  }, [timestamp.comment, timestamp.datetimeEnd, timestamp.datetimeStart])

  const [title, setTitle] = React.useState(timestamp.comment)
  const onTitleChanged = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) =>
    setTitle(e.target.value), [])

  const [dateState, setDateState] = React.useState({
    start: timestamp.datetimeStart,
    end: timestamp.datetimeEnd
  })

  const changeDates = React.useCallback(([start, end]: [Date | undefined, Date | undefined]) => {
    if (start === undefined)
      return

    setDateState({
      start,
      end
    })
  }, [setDateState])

  const confirm = () => {
    const changedTimestamp: ITimestamp = {
      id: timestamp.id,
      taskId: timestamp.taskId,
      comment: title,
      datetimeStart: dateState.start,
      datetimeEnd: dateState.end
    }

    timestampsService.save(changedTimestamp)
      .then(() => {
        dispatch({ type: 'CHANGE_TIMESTAMP', changedTimestamp })

        closeModal()
      })
  }

  const onEnterPressed = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter')
      confirm()
  }

  // not found or did not load
  if (timestamp.taskId === defaultTaskId)
    return <div />

  return <ThemedDialog
    title='Changing timestamp'
    isOpen={true}
    onClose={closeModal}
  >
    <section className={Classes.DIALOG_BODY}>
      <FormGroup label='Title:' labelFor='timestampTitle'>
        <InputGroup
          id='timestampTitle'
          onChange={onTitleChanged}
          value={title}
          onKeyDown={onEnterPressed}
          autoFocus />
      </FormGroup>
      <FormGroup label='Date:'>
        <DateRangeInput
          allowSingleDayRange
          closeOnSelection={false}
          formatDate={formatDate}
          parseDate={parseDate}
          timePickerProps={{
            selectAllOnFocus: true,
          }}
          timePrecision='minute'
          maxDate={new Date()}
          value={[dateState.start, dateState.end]}
          onChange={changeDates}
        />
      </FormGroup>
    </section>

    <section className={Classes.DIALOG_FOOTER}>
      <div className={Classes.DIALOG_FOOTER_ACTIONS}>
        <Button onClick={closeModal} title='Close dialog'>Close</Button>
        <Button intent={Intent.PRIMARY} onClick={confirm} title='change timestamp'>
          Change timestamp
        </Button>
      </div>
    </section>
  </ThemedDialog>
}

const formatDate = (date: Date | undefined) => (date === undefined ? '' : date.toLocaleString())
const parseDate = (str: string) => new Date(Date.parse(str))
