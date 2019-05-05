declare module 'app/routes' {

  interface IRoute<T = {}> {
    template: string
    getUrl: (parameters?: T) => string
  }
}
