declare module 'app/businessObjects' {
  interface IBusinessObject {
    id: number
  }
  type WithoutId<T extends IBusinessObject> = Omit<T, keyof IBusinessObject>
  type Dictionary<T> = Map<number, T>

  interface ITimestamp extends IBusinessObject {
    id: number
    taskId: number
    datetimeStart: Date
    datetimeEnd: Date | null
    comment: string
  }

  interface ITask extends IBusinessObject {
    id: number
    projectId: number
    title: string
  }

  interface IProject extends IBusinessObject {
    id: number
    title: string
  }
}
