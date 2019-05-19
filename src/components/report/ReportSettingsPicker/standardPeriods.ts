
import { ITimestamp } from 'app/businessObjects'
import { IStandardPeriods } from 'app/report'
import 'extensions/datetime/addDays'
import 'extensions/datetime/discardTime'
import 'extensions/datetime/isEqual'

export const standardPeriods: IStandardPeriods = {
  today: {
    title: 'Today',
    filterFunction: (timestamps) => filterByDay(new Date(), timestamps)
  },
  yesterday: {
    title: 'Yesterday',
    filterFunction: (timestamps) => {
      const yesterday = new Date().extAddDays(-1)

      return filterByDay(yesterday, timestamps)
    }
  },
  lastWorkingDay: {
    title: 'LastWorkingDay',
    filterFunction: (timestamps) => {

      let lastTimestampBesideTodays: ITimestamp | undefined
      const today = new Date()

      for (const timestamp of timestamps) {
        const currentDateStart = new Date(timestamp.datetimeStart)

        if (today.extIsDayEqual(currentDateStart))
          continue

        if (lastTimestampBesideTodays === undefined)
          lastTimestampBesideTodays = timestamp

        const lastDateStart = new Date(lastTimestampBesideTodays.datetimeStart)
        if (currentDateStart.extIsDayEqualOrGreater(lastDateStart))
          lastTimestampBesideTodays = timestamp
      }

      if (lastTimestampBesideTodays === undefined)
        return []

      const lastDatetimeStart = new Date(lastTimestampBesideTodays.datetimeStart)

      return filterByDay(lastDatetimeStart, timestamps)
    }
  },
}

function filterByDay(day: Date, timestamps: ITimestamp[]) {
  return timestamps
    .filter(x => filter(day, x))
}

function filter(day: Date, timestamp: ITimestamp) {
  const dateStart = new Date(timestamp.datetimeStart)
    .extDiscardTime()
  // if datetimeEnd is undefined it will give you now
  const dateEnd = new Date(timestamp.datetimeEnd || new Date())

  return day.extIsDayEqualOrGreater(dateStart) && dateEnd.extIsDayEqualOrGreater(day)
}
