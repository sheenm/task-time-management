import '../discardTime'

describe('DiscardTime.test', () => {
  it('should discard time from date', () => {

    const date = new Date(2019, 5, 1, 5, 2, 2, 25)

    expect(date.extDiscardTime()).toEqual(new Date(2019, 5, 1))
  })
})
