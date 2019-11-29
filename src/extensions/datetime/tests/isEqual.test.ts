import '../discardTime'
import '../isEqual'

describe('IsEqual.test', () => {

  it('should pass equality', () => {
    const firstDate = new Date()
    const secondDate = firstDate.extDiscardTime()

    expect(firstDate.extIsDayEqual(secondDate)).toBe(true)
  })

  it('should fail equality for next day', () => {
    const firstDate = new Date(2019, 5, 5)
    const secondDate = new Date(2019, 5, 4)

    expect(firstDate.extIsDayEqual(secondDate)).toBe(false)
  })

  it('should be equal by day', () => {
    const firstDate = new Date()
    const secondDate = firstDate.extDiscardTime()

    expect(firstDate.extIsDayEqualOrGreater(secondDate)).toBe(true)
  })

  it('should be greater', () => {
    const firstDate = new Date(2019, 5, 5)
    const secondDate = new Date(2019, 5, 4)

    expect(firstDate.extIsDayEqualOrGreater(secondDate)).toBe(true)
  })

  it('should not be greater', () => {
    const firstDate = new Date(2019, 5, 3)
    const secondDate = new Date(2019, 5, 5)

    expect(firstDate.extIsDayEqualOrGreater(secondDate)).toBe(false)
  })
})
