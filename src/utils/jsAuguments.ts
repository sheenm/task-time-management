declare global {
  // tslint:disable-next-line: interface-name
  interface Array<T> {
    myGroupBy<TKey extends string | number>(predicate: (obj: T) => TKey): Record<string | number, T[]>
  }
}

Array.prototype.myGroupBy = function (predicate) {
  // tslint:disable-next-line: no-invalid-this
  return groupBy(this)(predicate)
}

function groupBy<TArrayElement, TKey extends string | number>(array: TArrayElement[]) {
  return (predicate: (obj: TArrayElement) => TKey) => {
    const result: Record<string | number, TArrayElement[]> = {}  // IGroupByResult<TKey, TArrayElement> = {}

    for (const element of array) {
      const predicateValue = predicate(element)

      if (predicateValue in result) {
        result[predicateValue].push(element)
      }
      else {
        result[predicateValue] = [element]
      }
    }

    return result
  }
}

export { }
