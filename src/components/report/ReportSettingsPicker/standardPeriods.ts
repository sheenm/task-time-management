import { IReportTimestamp, IStandardPeriods } from "app/report"
import { Datetime } from "../../../utils/datetime"

export const standardPeriods: IStandardPeriods = {
  today: {
    title: 'Today',
    filterFunction: (timestamps) => filterByDay(new Datetime(), timestamps)
  },
  yesterday: {
    title: 'Yesterday',
    filterFunction: (timestamps) => {
      const yesterday = new Datetime().addDays(-1)

      return filterByDay(yesterday, timestamps)
    }
  },
  lastWorkingDay: {
    title: 'LastWorkingDay',
    filterFunction: (timestamps) => {

      let lastTimestampBesideTodays: IReportTimestamp | undefined
      const today = new Datetime()

      for (const timestamp of timestamps) {
        const currentDateStart = new Datetime(timestamp.datetimeStart)

        if (today.isDayEqual(currentDateStart))
          continue

        if (lastTimestampBesideTodays === undefined)
          lastTimestampBesideTodays = timestamp

        const lastDateStart = new Datetime(lastTimestampBesideTodays.datetimeStart)
        if (currentDateStart.isDayEqualOrGreater(lastDateStart))
          lastTimestampBesideTodays = timestamp
      }

      if (lastTimestampBesideTodays === undefined)
        return []

      const lastDatetimeStart = new Datetime(lastTimestampBesideTodays.datetimeStart)

      return filterByDay(lastDatetimeStart, timestamps)
    }
  },
}

function filterByDay(day: Datetime, timestamps: IReportTimestamp[]) {
  return timestamps
    .filter(x => filter(day, x))
}

function filter(day: Datetime, timestamp: IReportTimestamp) {
  const dateStart = new Datetime(timestamp.datetimeStart)
    .discardTime()
  // if datetimeEnd is undefined it will give you now
  const dateEnd = new Datetime(timestamp.datetimeEnd)

  return day.isDayEqualOrGreater(dateStart) && dateEnd.isDayEqualOrGreater(day)
}
