import { ITimestamp, WithoutId } from "app/dto"
import { LocalStorageRepository } from "./localStorageRepository"

const timestampsKey = 'timestamps'
const timestampIndexKey = 'timestamps.index'

export class TimestampRepository {

  private readonly localStorage = new LocalStorageRepository()

  public get(taskId: number): Promise<ITimestamp[]> {
    return this.getAll()
      .then(timestamps => timestamps.filter(x => x.taskId === taskId))
  }

  public add(timestamp: WithoutId<ITimestamp>): Promise<number> {
    return this.incrementCurrentIndex()
      .then(() => this.getCurrentIndex())
      .then(index => {
        const timestampToAdd = { ...timestamp, id: index }

        return this.getAll()
          .then(timestamps => {
            timestamps.push(timestampToAdd)

            this.localStorage.setItem(timestampsKey, timestamps)

            return timestampToAdd.id
          })
      })
  }

  public save(timestamp: ITimestamp): Promise<void> {
    return this.getAll()
      .then(timestamps => {
        const index = timestamps.findIndex(x => x.id === timestamp.id)

        if (index !== -1)
          timestamps.splice(index, 1, timestamp)

        this.localStorage.setItem(timestampsKey, timestamps)
      })
  }

  public delete(timestampId: number): Promise<void> {
    return this.getAll()
      .then(timestamps => {
        const index = timestamps.findIndex(x => x.id === timestampId)

        if (index !== -1)
          timestamps.splice(index, 1)

        this.localStorage.setItem(timestampsKey, timestamps)
      })
  }

  private getAll(): Promise<ITimestamp[]> {
    return this.localStorage.getItems<ITimestamp>(timestampsKey)
  }

  private getCurrentIndex(): Promise<number> {
    return this.localStorage.getNumber(timestampIndexKey)
      .then(index => {
        if (index === undefined) {
          this.localStorage.setNumber(timestampIndexKey, 1)

          return 1
        }

        return index
      })
  }

  private incrementCurrentIndex() {
    return this.getCurrentIndex()
      .then(index => this.localStorage.setNumber(timestampIndexKey, index++))
  }
}
