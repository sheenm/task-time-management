import { Dictionary, ITask, ITimestamp } from 'app/businessObjects'
import { IReportTimestamp, StandardPeriodNames } from 'app/report'
import { TaskRepository } from 'repositories/taskRepository'
import { TimestampRepository } from 'repositories/timestampRepository'

export class ReportsRepository {

  public async get(period: StandardPeriodNames): Promise<IReportTimestamp[]> {
    const timestampsRepo = new TimestampRepository()
    const tasksRepo = new TaskRepository()

    const timestamps = await timestampsRepo.getWithPeriod(period)
    const tasks = await tasksRepo.getByIds(timestamps.map(x => x.taskId))

    return timestamps.map(x => this.mapToReportTimestamp(x, tasks))
  }

  private mapToReportTimestamp(timestamp: ITimestamp, tasks: Dictionary<ITask>): IReportTimestamp {
    const task = tasks.get(timestamp.taskId)
    const taskTitle = task === undefined ? '' : task.title

    return {
      id: timestamp.id,
      comment: timestamp.comment,
      datetimeEnd: timestamp.datetimeEnd,
      datetimeStart: timestamp.datetimeStart,
      taskTitle
    }
  }
}
