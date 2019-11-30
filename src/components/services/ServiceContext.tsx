import React from 'react'
import { ProjectService } from 'services/projectService'
import { ReportsService } from 'services/reportsService'
import { TaskService } from 'services/taskService'
import { TimestampService } from 'services/timestampService'
import { IServiceContext } from 'app/services'

/**
 * Context to inject services.
 * ! You should override it only for unit tests
 */
export const ServiceContext = React.createContext<IServiceContext>({
  timestampsService: new TimestampService(),
  tasksService: new TaskService(),
  projectService: new ProjectService(),
  reportService: new ReportsService()
})
