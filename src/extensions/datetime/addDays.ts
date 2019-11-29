declare global {
  interface Date {
    /**
     * Adds or Substract(if days is negative) days from given date
     */
    extAddDays: (days: number) => Date
  }
}

if (Date.prototype.extAddDays === undefined) {
  // eslint-disable-next-line
  Date.prototype.extAddDays = function (days) {
    const date = new Date(this)
    date.setDate(date.getDate() + days)

    return date
  }
}

export { }
