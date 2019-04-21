import { IReportTimestamp } from "app/report"
import { standardPeriods } from "../standardPeriods"

describe('StandardPeriod.test', () => {
  const today = new Date()
  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  const twoDaysAgo = new Date()
  twoDaysAgo.setDate(twoDaysAgo.getDate() - 2)

  const todayTimestamp: IReportTimestamp = {
    comment: '',
    datetimeEnd: undefined,
    datetimeStart: today,
    id: 1,
    projectTitle: 'aaa',
    taskTitle: 'bbb'
  }

  const yesterdaysTimestamp: IReportTimestamp = {
    comment: '',
    datetimeEnd: yesterday,
    datetimeStart: yesterday,
    id: 1,
    projectTitle: 'aaa',
    taskTitle: 'bbb'
  }

  const twoDaysAgoEndedYesterday: IReportTimestamp = {
    comment: '',
    datetimeEnd: yesterday,
    datetimeStart: twoDaysAgo,
    id: 1,
    projectTitle: 'aa',
    taskTitle: 'bbb'
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
      [[twoDaysAgoEndedYesterday, yesterdaysTimestamp], [twoDaysAgoEndedYesterday, yesterdaysTimestamp]]
    ]
  )('should return only timestamps that are last worked day', (timestamps, expected) => {
    const { filterFunction } = standardPeriods.lastWorkingDay

    expect(filterFunction(timestamps)).toEqual(expected)
  })

})
