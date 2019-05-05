import '../groupBy'

interface ITestingItem {
  id: number
  someValue: string
}

describe('GroupBy.test', () => {

  const item1: ITestingItem = {
    id: 1,
    someValue: 'str'
  }

  const item2: ITestingItem = {
    id: 1,
    someValue: 'str2'
  }

  const item3: ITestingItem = {
    id: 2,
    someValue: 'str'
  }

  it.each(
    [
      [{ items: [item1], groupsCount: 1 }],
      [{ items: [item1, item2], groupsCount: 1 }],
      [{ items: [item1, item2, item3], groupsCount: 2 }],
      [{ items: [], groupsCount: 0 }]
    ]
  )('should correctly group by id', ({ items, groupsCount }) => {
    const groupByResult = items.extGroupBy(x => x.id)

    expect(Object.keys(groupByResult).length).toBe(groupsCount)
  })

  it.each(
    [
      [{ items: [item1], groupsCount: 1 }],
      [{ items: [item1, item2], groupsCount: 2 }],
      [{ items: [item1, item2, item3], groupsCount: 2 }]
    ]
  )('should correctly group by value', ({ items, groupsCount }) => {
    const groupByResult = items.extGroupBy(x => x.someValue)

    expect(Object.keys(groupByResult).length).toBe(groupsCount)
  })

  it('should correctly group by non exising field', () => {
    const groupByResult = [item1, item2, item3].extGroupBy(() => 'grouping expression')
    expect(Object.keys(groupByResult).length).toBe(1)
  })
})
