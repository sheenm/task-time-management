import { Dictionary, ITimestamp, WithoutId } from 'app/businessObjects'
import { ITimestampDto } from 'app/dto'
import { StandardPeriodNames } from 'app/report'
import { ITimestampRepository } from 'app/repositories'
import { standardPeriods } from 'components/report/ReportSettingsPicker/standardPeriods'
import { LocalStorageRepository } from 'repositories/localStorageRepository'

const timestampsKey = 'timestamps'
const timestampIndexKey = 'timestamps.index'

export class TimestampRepository implements ITimestampRepository {

  private readonly localStorage = new LocalStorageRepository()

  public get(taskId: number): Promise<Dictionary<ITimestamp>> {
    return this.getAll()
      .then(timestamps => {
        return new Map(
          [...timestamps]
            .filter(([, timestamp]) => timestamp.taskId === taskId)
        )
      })
  }

  public getWithPeriod(period: StandardPeriodNames): Promise<ITimestamp[]> {
    const { filterFunction } = standardPeriods[period]

    return this.getAll()
      .then(timestamps => [...timestamps.values()])
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
            timestamps.set(index, timestampToAdd)
            this.localStorage.setMap(timestampsKey, timestamps)

            return timestampToAdd.id
          })
      })
  }

  public save(timestamp: ITimestamp): Promise<void> {
    return this.getAll()
      .then(timestamps => {
        if (!timestamps.has(timestamp.id))
          return

        timestamps.set(timestamp.id, timestamp)
        this.localStorage.setMap(timestampsKey, timestamps)
      })
  }

  public delete(timestampId: number): Promise<void> {
    return this.getAll()
      .then(timestamps => {
        timestamps.delete(timestampId)
        this.localStorage.setMap(timestampsKey, timestamps)
      })
  }

  public getAll(): Promise<Dictionary<ITimestamp>> {
    return this.localStorage.getMap<ITimestampDto>(timestampsKey)
      .then(dtos => {
        return new Map([...dtos]
          .map(([key, dto]) => [key, this.convertFromDto(dto)])
        )
      })
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
