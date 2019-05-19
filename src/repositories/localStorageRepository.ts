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

  public getMap<T>(key: string): Promise<Map<number, T>> {
    const itemsJson = window.localStorage.getItem(key)

    if (itemsJson === null)
      return Promise.resolve(new Map())

    return Promise.resolve(new Map(JSON.parse(itemsJson)))
  }

  public setMap<T>(key: string, items: Map<number, T>) {
    window.localStorage.setItem(key, JSON.stringify([...items]))
  }
}
