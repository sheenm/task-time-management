declare global {
  // tslint:disable-next-line: interface-name
  interface Date {
    /**
     * Sets time to 0 0 0 0 to get clear date
     */
    extDiscardTime: () => Date
  }
}

if (Date.prototype.extDiscardTime === undefined) {
  // eslint-disable-next-line
  Date.prototype.extDiscardTime = function () {
    // tslint:disable-next-line: no-invalid-this
    const date = new Date(this)
    date.setHours(0, 0, 0, 0)

    return date
  }
}

export { }
