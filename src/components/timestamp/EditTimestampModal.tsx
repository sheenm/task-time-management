import { Button, Classes, Dialog, FormGroup, InputGroup, Intent } from '@blueprintjs/core'
import { DateRangeInput } from '@blueprintjs/datetime'
import { ITimestamp } from 'app/dto'
import React from 'react'

interface IProps {
  timestampId: number
  closeModal: () => void
}

export const EditTimestampModal: React.FC<IProps> = ({ timestampId, closeModal }) => {
  // todo get real timestamp
  const timestamp: ITimestamp = {
    comment: 'blablabla',
    datetimeEnd: undefined,
    datetimeStart: new Date(),
    id: timestampId,
    taskId: 1
  }

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

  const confirm = React.useCallback(() => {
    closeModal()
  }, [])

  const onEnterPressed = React.useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter')
      confirm()
  }, [confirm])

  return <Dialog
    title='Changing timestamp'
    isOpen={true}
    onClose={closeModal}
  >
    <section className={Classes.DIALOG_BODY}>
      <FormGroup label='Title:' labelFor='addTaskInput'>
        <InputGroup
          id='addTaskInput'
          onChange={onTitleChanged}
          value={title}
          onKeyDown={onEnterPressed}
          autoFocus />
      </FormGroup>
      <FormGroup label='Date:'>
        <DateRangeInput
          allowSingleDayRange
          closeOnSelection={false}
          formatDate={dateFormatter.formatDate}
          parseDate={dateFormatter.parseDate}
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
        <Button intent={Intent.PRIMARY} onClick={confirm} title='Add task'>
          Change timestamp
        </Button>
      </div>
    </section>
  </Dialog>
}

const dateFormatter = {
  formatDate: (date: Date | undefined) => (date === undefined ? "" : date.toLocaleDateString()),
  parseDate: (str: string) => new Date(Date.parse(str)),
  placeholder: "JS Date",
}
