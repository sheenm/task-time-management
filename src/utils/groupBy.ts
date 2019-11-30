export function groupBy<TArrayElement, TKey extends string | number>(array: TArrayElement[]) {
  return (predicate: (obj: TArrayElement) => TKey) => {
    const result: Record<string | number, TArrayElement[]> = {}

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
