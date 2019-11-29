import { Dictionary, ITask, WithoutId } from 'app/businessObjects'
import { ITaskDto } from 'app/dto'
import { ITaskRepository } from 'app/repositories'
import { LocalStorageRepository } from 'repositories/localStorageRepository'

const tasksKey = 'tasks'
const taskIndexKey = 'tasks.index'
const startIndex = 1

export class TaskRepository implements ITaskRepository {

  private readonly localStorage = new LocalStorageRepository()

  public get(projectId: number): Promise<Dictionary<ITask>> {
    return this.getAll()
      .then(tasks => {
        return new Map([...tasks]
          .filter(([, task]) => task.projectId === projectId))
      })
  }

  public async getByIds(ids: number[]) {
    const allTasks = await this.getAll()

    return new Map([...allTasks]
      .filter(([, task]) => ids.some(id => id === task.id)))
  }

  /**
   * @returns id of added task
   */
  public add(task: WithoutId<ITask>): Promise<number> {
    return this.incrementCurrentIndex()
      .then(() => this.getCurrentIndex())
      .then(index => {
        const taskToAdd = { ...task, id: index }

        return this.getAll()
          .then(tasks => {
            tasks.set(index, taskToAdd)
            this.localStorage.setMap(tasksKey, tasks)

            return taskToAdd.id
          })
      })
  }

  public save(task: ITask): Promise<void> {
    return this.getAll()
      .then(tasks => {
        if (!tasks.has(task.id))
          return

        tasks.set(task.id, task)
        this.localStorage.setMap(tasksKey, tasks)
      })
  }

  public delete(taskId: number): Promise<void> {
    return this.getAll()
      .then(tasks => {
        tasks.delete(taskId)
        this.localStorage.setMap(tasksKey, tasks)
      })
  }

  private getAll(): Promise<Dictionary<ITask>> {
    return this.localStorage.getMap<ITaskDto>(tasksKey)
  }

  private getCurrentIndex(): Promise<number> {
    return this.localStorage.getNumber(taskIndexKey)
      .then(index => {
        if (index === undefined) {
          this.localStorage.setNumber(taskIndexKey, startIndex)

          return startIndex
        }

        return index
      })
  }

  private incrementCurrentIndex() {
    return this.getCurrentIndex()
      .then(index => this.localStorage.setNumber(taskIndexKey, ++index))
  }

}
