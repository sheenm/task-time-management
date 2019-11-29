import '../addDays'

describe('AddDays.test', () => {
  it.each(
    [
      [{ date: new Date(2019, 5, 1), days: 1, result: new Date(2019, 5, 2) }],
      [{ date: new Date(2019, 5, 1), days: 2, result: new Date(2019, 5, 3) }],
      [{ date: new Date(2019, 5, 1), days: 0, result: new Date(2019, 5, 1) }],
      [{ date: new Date(2019, 5, 1), days: -1, result: new Date(2019, 4, 31) }],
    ]
  )('should add days to the date', ({ date, days, result }) => {
    expect(date.extAddDays(days)).toEqual(result)
  })
})
