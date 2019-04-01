export class LocalStorageRepository {
  private readonly storage = new Map<string, string>()

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
