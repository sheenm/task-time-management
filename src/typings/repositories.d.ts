declare module 'app/repositories' {
  import { Dictionary, IProject, ITask, ITimestamp, WithoutId } from 'app/businessObjects'
  import { IReportTimestamp, StandardPeriodNames } from 'app/report'

  interface IRepository<T> {
    get: (itemId: number) => Promise<Dictionary<T>>

    add: (item: WithoutId<T>) => Promise<number>

    save: (item: T) => Promise<void>

    delete: (itemId: number) => Promise<void>
  }

  interface ITimestampRepository extends IRepository<ITimestamp> {
    public getAll(): Promise<Dictionary<ITimestamp>>
  }
  interface ITaskRepository extends IRepository<ITask> { }
  interface IProjectRepository extends IRepository<IProject> {
    get: () => Promise<Dictionary<IProject>>
  }

  interface IReportRepository {
    get: (period: StandardPeriodNames) => Promise<IReportTimestamp[]>
  }

  interface IRepositoryContext {
    timestampsRepo: ITimestampRepository
    tasksRepo: ITaskRepository
    projectRepo: IProjectRepository
    reportRepo: IReportRepository
  }
}
