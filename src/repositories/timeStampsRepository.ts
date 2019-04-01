import { ITimestamp, WithoutId } from "app/dto"
import { LocalStorageRepository } from "./localStorageRepository"

const timestampsKey = 'TIMESTAMPS'

export class TimeStampsRepository {

  private readonly localStorage = new LocalStorageRepository()

  public getTimestamps(taskId: number): Promise<ITimestamp[]> {
    return this.localStorage.getItems<ITimestamp>(`${timestampsKey}#${taskId}`)
  }

  public addTimeStamp(timestamp: WithoutId<ITimestamp>) {
    return this.getTimestamps(timestamp.taskId)
      .then(timestamps => {
        const timestampToAdd = { ...timestamp, id: timestamps.length + 1 }
        timestamps.push(timestampToAdd)
        this.localStorage.setItem(`${timestampsKey}#${timestamp.taskId}`, timestamps)

        return timestampToAdd.id
      })
  }

  public saveTimestamp(timestamp: ITimestamp) {

    return this.getTimestamps(timestamp.taskId)
      .then(timestamps => {
        const index = timestamps.findIndex(x => x.id === timestamp.id)

        if (index !== -1)
          timestamps.splice(index, 1, timestamp)

        this.localStorage.setItem(`${timestampsKey}#${timestamp.taskId}`, timestamps)
      })
  }

  public deleteTimestamp(taskId: number, timestampId: number) {
    return this.getTimestamps(taskId)
      .then(timestamps => {
        const index = timestamps.findIndex(x => x.id === timestampId)

        if (index !== -1)
          timestamps.splice(index, 1)

        this.localStorage.setItem(`${timestampsKey}#${taskId}`, timestamps)
      })
  }
}
