import { ITimestamp } from 'app/businessObjects'
import { standardPeriods } from 'components/report/ReportSettingsPicker/standardPeriods'
import { subDays } from 'date-fns/fp'

describe('StandardPeriod.test', () => {
  const today = new Date()
  const yesterday = subDays(1)(today)
  const twoDaysAgo = subDays(1)(yesterday)

  const todayTimestamp: ITimestamp = {
    comment: '',
    datetimeEnd: undefined,
    datetimeStart: today,
    id: 1,
    taskId: 1
  }

  const yesterdaysTimestamp: ITimestamp = {
    comment: '',
    datetimeEnd: yesterday,
    datetimeStart: yesterday,
    id: 1,
    taskId: 1
  }

  const twoDaysAgoEndedYesterday: ITimestamp = {
    comment: '',
    datetimeEnd: yesterday,
    datetimeStart: twoDaysAgo,
    id: 1,
    taskId: 1
  }

  const yesterdaysDidnotEnd: ITimestamp = {
    comment: '',
    datetimeEnd: undefined,
    datetimeStart: yesterday,
    id: 1,
    taskId: 1
  }

  it.each(
    [
      [[todayTimestamp, yesterdaysTimestamp], [todayTimestamp]],
      [[todayTimestamp], [todayTimestamp]],
      [[yesterdaysTimestamp], []]
    ]
  )('should return only timestamps that are todays', (timestamps, expected) => {
    const { filterFunction } = standardPeriods.today

    expect(filterFunction(timestamps)).toEqual(expected)
  })

  it.each(
    [
      [[todayTimestamp, yesterdaysTimestamp], [yesterdaysTimestamp]],
      [[todayTimestamp], []],
      [[yesterdaysTimestamp], [yesterdaysTimestamp]]
    ]
  )('should return only timestamps that are yesterdays', (timestamps, expected) => {
    const { filterFunction } = standardPeriods.yesterday

    expect(filterFunction(timestamps)).toEqual(expected)
  })

  it.each(
    [
      [[todayTimestamp, yesterdaysTimestamp], [yesterdaysTimestamp]],
      [[yesterdaysTimestamp, todayTimestamp], [yesterdaysTimestamp]],
      [[todayTimestamp], []],
      [[yesterdaysTimestamp], [yesterdaysTimestamp]],
      [[twoDaysAgoEndedYesterday], [twoDaysAgoEndedYesterday]],
      [[twoDaysAgoEndedYesterday, yesterdaysTimestamp], [twoDaysAgoEndedYesterday, yesterdaysTimestamp]],
      [[yesterdaysTimestamp, yesterdaysDidnotEnd, todayTimestamp], [yesterdaysTimestamp, yesterdaysDidnotEnd]]
    ]
  )('should return only timestamps that are last worked day', (timestamps, expected) => {
    const { filterFunction } = standardPeriods.lastWorkingDay

    expect(filterFunction(timestamps)).toEqual(expected)
  })

})
