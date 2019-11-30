import { ITimestamp } from 'app/businessObjects'
import { IStandardPeriods } from 'app/report'
import { addDays, startOfDay, isBefore, isSameDay, isWithinInterval, endOfDay } from 'date-fns/fp'

export const standardPeriods: IStandardPeriods = {
  today: {
    title: 'Today',
    filterFunction: (timestamps) => filterByDay(new Date(), timestamps)
  },
  yesterday: {
    title: 'Yesterday',
    filterFunction: (timestamps) => {
      const yesterday = addDays(-1)(new Date()) // eslint-disable-line

      return filterByDay(yesterday, timestamps)
    }
  },
  lastWorkingDay: {
    title: 'LastWorkingDay',
    filterFunction: (timestamps) => {

      let lastTimestampBesideTodays: ITimestamp | undefined
      const today = new Date()

      for (const timestamp of timestamps) {
        const currentDateStart = timestamp.datetimeStart

        if (isSameDay(today)(currentDateStart))
          continue

        if (lastTimestampBesideTodays === undefined)
          lastTimestampBesideTodays = timestamp

        const lastDateStart = lastTimestampBesideTodays.datetimeStart
        if (isBefore(startOfDay(currentDateStart))(lastDateStart))
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
  return isWithinInterval({
    start: startOfDay(timestamp.datetimeStart),
    end: endOfDay(timestamp.datetimeEnd || new Date())
  })(day)
}
