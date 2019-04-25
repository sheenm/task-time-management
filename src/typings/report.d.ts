declare module 'app/report' {
  import { ITimestamp } from "app/dto"

  interface IStandardPeriod {
    title: string
    filterFunction: (timestamps: ITimestamp[]) => ITimestamp[]
  }

  type StandardPeriodNames = 'today' | 'yesterday' | 'lastWorkingDay'
  interface IStandardPeriods extends Record<StandardPeriodNames, IStandardPeriod> {
    [index: string]: IStandardPeriod
  }

  interface IReportTimestamp {
    id: number
    datetimeStart: Date
    datetimeEnd?: Date
    comment: string
    taskTitle: string
  }
}
