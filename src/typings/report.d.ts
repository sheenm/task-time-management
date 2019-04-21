declare module 'app/report' {

  interface IStandardPeriod {
    title: string
    filterFunction: (timestamps: IReportTimestamp[]) => IReportTimestamp[]
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
    projectTitle: string
  }
}
