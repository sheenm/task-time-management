export class LocalStorageRepository {
  private readonly storage = new Map<string, string>()

  public getNumber(key: string): Promise<number | undefined> {
    const item = window.localStorage.getItem(key)
    if (item === null)
      return Promise.resolve(undefined)

    if (isNaN(+item))
      return Promise.resolve(undefined)

    return Promise.resolve(+item)
  }

  public setNumber(key: string, value: number) {
    window.localStorage.setItem(key, value.toString())
  }

  public getItems<T>(key: string): Promise<T[]> {
    const itemsJson = window.localStorage.getItem(key)
    if (itemsJson === null)
      return Promise.resolve([])

    const items = JSON.parse(itemsJson) as T[]

    return Promise.resolve(items)
  }

  public setItem(key: string, item: object) {
    window.localStorage.setItem(key, JSON.stringify(item))
  }
}
