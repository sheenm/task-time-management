declare global {
  // tslint:disable-next-line: interface-name
  interface Date {
    /**
     * Checks if dates are from same Day
     */
    extIsDayEqual: (secondDate: Date) => boolean
    /**
     * Checks if first date is greater than second
     */
    extIsDayEqualOrGreater: (secondDate: Date) => boolean
  }
}

if (Date.prototype.extIsDayEqual === undefined) {
  // eslint-disable-next-line
  Date.prototype.extIsDayEqual = function (secondDate) {
    // tslint:disable-next-line: no-invalid-this
    return this.toDateString() === secondDate.toDateString()
  }
  // eslint-disable-next-line
  Date.prototype.extIsDayEqualOrGreater = function (secondDate) {
    // tslint:disable-next-line: no-invalid-this
    return this.extIsDayEqual(secondDate) || this.getTime() > secondDate.getTime()
  }
}

export { }
