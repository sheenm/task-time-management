declare global {
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
    const date = new Date(this)
    date.setHours(0, 0, 0, 0) // eslint-disable-line

    return date
  }
}

export { }
