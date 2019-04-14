declare module 'app/repositories' {
  import { IProject, ITask, ITimestamp, WithoutId } from 'app/dto'


  interface IRepository<T> {
    get: (itemId: number) => Promise<T[]>

    add: (item: WithoutId<T>) => Promise<number>

    save: (item: T) => Promise<void>

    delete: (itemId: number) => Promise<void>
  }

  interface ITimestampRepository extends IRepository<ITimestamp> { }
  interface ITaskRepository extends IRepository<ITask> { }
  interface IProjectRepository extends IRepository<IProject> {
    get: () => Promise<IProject[]>
  }

  interface IRepositoryContext {
    timestampsRepo: ITimestampRepository
    tasksRepo: ITaskRepository
    projectRepo: IProjectRepository
  }
}
