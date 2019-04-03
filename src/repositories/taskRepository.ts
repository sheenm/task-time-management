import { ITask, WithoutId } from "app/dto"
import { LocalStorageRepository } from "./localStorageRepository"

const tasksKey = 'tasks'
const taskIndexKey = 'tasks.index'

export class TasksRepository {

  private readonly localStorage = new LocalStorageRepository()

  public get(projectId: number): Promise<ITask[]> {
    return this.getAll()
      .then(tasks => tasks.filter(x => x.projectId === projectId))
  }

  public add(task: WithoutId<ITask>): Promise<number> {

    return this.incrementCurrentIndex()
      .then(() => this.getCurrentIndex())
      .then(index => {
        const taskToAdd = { ...task, id: index }

        return this.getAll()
          .then(tasks => {
            tasks.push(taskToAdd)
            this.localStorage.setItem(tasksKey, tasks)

            return taskToAdd.id
          })
      })
  }

  public save(task: ITask): Promise<void> {
    return this.getAll()
      .then(tasks => {
        const index = tasks.findIndex(x => x.id === task.id)

        if (index !== -1)
          tasks.splice(index, 1, task)

        this.localStorage.setItem(tasksKey, tasks)
      })
  }

  public delete(taskId: number): Promise<void> {
    return this.getAll()
      .then(tasks => {
        const index = tasks.findIndex(x => x.id === taskId)

        if (index !== -1)
          tasks.splice(index, 1)

        this.localStorage.setItem(tasksKey, tasks)
      })
  }

  private getAll(): Promise<ITask[]> {
    return this.localStorage.getItems<ITask>(tasksKey)
  }

  private getCurrentIndex(): Promise<number> {
    return this.localStorage.getNumber(taskIndexKey)
      .then(index => {
        if (index === undefined) {
          this.localStorage.setNumber(taskIndexKey, 1)

          return 1
        }

        return index
      })
  }

  private incrementCurrentIndex() {
    return this.getCurrentIndex()
      .then(index => this.localStorage.setNumber(taskIndexKey, index++))
  }

}
