declare module 'app/dto' {
  interface IBusinessObject {
    id: number
  }

  type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
  type WithoutId<T extends IBusinessObject> = Omit<T, keyof IBusinessObject>

  interface ITimestamp extends IBusinessObject {
    id: number
    taskId: number
    datetimeStart: string
    datetimeEnd: string
    comment: string
  }
}
