import '../discardTime'

describe('DiscardTime.test', () => {
  it('should discard time from date', () => {
    // tslint:disable-next-line: no-magic-numbers
    const date = new Date(2019, 5, 1, 5, 2, 2, 25)

    expect(date.extDiscardTime()).toEqual(new Date(2019, 5, 1))
  })
})
