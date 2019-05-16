import { ITimestamp, ITimestampDto, WithoutId } from "app/dto"
import { StandardPeriodNames } from "app/report"
import { ITimestampRepository } from "app/repositories"
import { standardPeriods } from "components/report/ReportSettingsPicker/standardPeriods"
import { LocalStorageRepository } from "repositories/localStorageRepository"

const timestampsKey = 'timestamps'
const timestampIndexKey = 'timestamps.index'

export class TimestampRepository implements ITimestampRepository {

  private readonly localStorage = new LocalStorageRepository()

  public get(taskId: number): Promise<ITimestamp[]> {
    return this.getAll()
      .then(timestamps => timestamps.filter(x => x.taskId === taskId))
  }

  public getWithPeriod(period: StandardPeriodNames): Promise<ITimestamp[]> {
    const { filterFunction } = standardPeriods[period]

    return this.getAll()
      .then(filterFunction)
  }

  /**
   * @returns id of added timestamp
   */
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

  public getAll(): Promise<ITimestamp[]> {
    return this.localStorage.getItems<ITimestampDto>(timestampsKey)
      .then(dtos => dtos.map<ITimestamp>(dto => this.convertFromDto(dto)))
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
      .then(index => this.localStorage.setNumber(timestampIndexKey, ++index))
  }

  private convertFromDto(dto: ITimestampDto): ITimestamp {
    const datetimeEnd = dto.datetimeEnd === undefined
      ? undefined
      : new Date(dto.datetimeEnd)

    return {
      id: dto.id,
      comment: dto.comment,
      taskId: dto.taskId,
      datetimeStart: new Date(dto.datetimeStart),
      datetimeEnd
    }
  }
}
