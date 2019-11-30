declare module 'app/services' {
  import { Dictionary, IProject, ITask, ITimestamp, WithoutId } from 'app/businessObjects'
  import { IReportTimestamp, StandardPeriodNames } from 'app/report'

  interface IService<T> {
    get: (itemId: number) => Promise<Dictionary<T>>

    add: (item: WithoutId<T>) => Promise<number>

    save: (item: T) => Promise<void>

    delete: (itemId: number) => Promise<void>
  }

  interface ITimestampService extends IService<ITimestamp> {
    public getAll(): Promise<Dictionary<ITimestamp>>
  }
  interface ITaskService extends IService<ITask> { }
  interface IProjectService extends IService<IProject> {
    get: () => Promise<Dictionary<IProject>>
  }

  interface IReportService {
    get: (period: StandardPeriodNames) => Promise<IReportTimestamp[]>
  }

  interface IServiceContext {
    timestampsService: ITimestampService
    tasksService: ITaskService
    projectService: IProjectService
    reportService: IReportService
  }
}
