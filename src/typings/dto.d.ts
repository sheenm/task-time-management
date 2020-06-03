declare module 'app/dto' {

  interface ITimestampDto {
    id: number
    taskId: number
    datetimeStart: string
    datetimeEnd: string | null
    comment: string
  }

  interface ITaskDto {
    id: number
    projectId: number
    title: string
  }

  interface IProjectDto {
    id: number
    title: string
  }
}
