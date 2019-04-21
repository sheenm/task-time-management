/**
 * Represents date object with utility functions
 * Datetime objects are immutable
 */
export class Datetime {
  private readonly date: Date

  constructor(oldObject?: Datetime | Date) {
    if (oldObject === undefined) {
      this.date = new Date()

      return
    }

    const datetime = oldObject as Datetime
    if (datetime !== undefined && datetime.date !== undefined) {
      this.date = new Date(datetime.date)

      return
    }

    const date = oldObject as Date
    this.date = new Date(date)
  }

  /**
   * Sets time to 0 0 0 0 to get clear date
   */
  public discardTime() {
    const dateWithoutTime = new Datetime(this)
    dateWithoutTime.date.setHours(0, 0, 0, 0)

    return dateWithoutTime
  }

  /**
   * Adds or Substract(if days is negative) days from given date
   */
  public addDays(days: number) {
    const newDate = new Datetime(this)
    newDate.setDate(newDate.getDate() + days)

    return newDate
  }

  /**
   * Checks if dates are from same Day
   */
  public isDayEqual(date: Datetime) {
    return this.toDateString() === date.toDateString()
  }

  /**
   * Checks if first date is greater than second
   */
  public isDayEqualOrGreater(date: Datetime) {
    return this.isDayEqual(date) || this.getTime() > date.getTime()
  }

  private readonly setDate = (day: number) => this.date.setDate(day)
  private readonly getDate = () => this.date.getDate()
  private readonly toDateString = () => this.date.toDateString()
  private readonly getTime = () => this.date.getTime()

}
