import { Dictionary, ITask, ITimestamp } from 'app/businessObjects'
import { IReportTimestamp, StandardPeriodNames } from 'app/report'
import { TaskService } from 'services/taskService'
import { TimestampService } from 'services/timestampService'

export class ReportsService {

  public async get(period: StandardPeriodNames): Promise<IReportTimestamp[]> {
    const timestampsRepo = new TimestampService()
    const tasksRepo = new TaskService()

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
