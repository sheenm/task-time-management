import { IRepositoryContext } from 'app/repositories'
import React from 'react'
import { ProjectRepository } from 'repositories/projectRepository'
import { ReportsRepository } from 'repositories/reportsRepository'
import { TaskRepository } from 'repositories/taskRepository'
import { TimestampRepository } from 'repositories/timestampRepository'

/**
 * Context to inject repositories.
 * ! You should override it only for unit tests
 */
export const RepositoryContext = React.createContext<IRepositoryContext>({
  timestampsRepo: new TimestampRepository(),
  tasksRepo: new TaskRepository(),
  projectRepo: new ProjectRepository(),
  reportRepo: new ReportsRepository()
})
