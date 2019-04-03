import { TimestampsRepository } from "../timestampRepository"

beforeEach(() => {
  window.localStorage.clear()
})

describe('timestamp repository get() tests', () => {
  it('when repository is empty returns empty, not null', async () => {
    const repository = new TimestampsRepository()
    const timestamps = await repository.getTimestamps(1)

    expect(timestamps).toEqual([])
  })
})

describe('timestamp repository add tests', () => {
  it('can add item', async () => {
    expect.assertions(1)

    const repository = new TimestampsRepository()
    const taskId = 1

    const addResult = await repository.addTimeStamp({
      comment: 'some comment',
      taskId,
      datetimeEnd: '',
      datetimeStart: ''
    })

    const timestamps = await repository.getTimestamps(taskId)
    expect(timestamps.length).toBe(1)
  })
})

describe('timestamp repository save() tests', () => {
  it('can add item and change it', async () => {
    const assertionsCount = 2
    expect.assertions(assertionsCount)
    const taskId = 2

    const repository = new TimestampsRepository()

    await repository.addTimeStamp({
      comment: 'some comment',
      taskId,
      datetimeEnd: '',
      datetimeStart: ''
    })

    const timestamp = (await repository.getTimestamps(taskId))[0]
    timestamp.comment = 'new comment'
    await repository.saveTimestamp(timestamp)

    const timeStampFromRepository = (await repository.getTimestamps(taskId))[0]

    expect(timestamp.comment).toBe(timeStampFromRepository.comment)
    expect(timestamp).not.toBe(timeStampFromRepository)
  })

  it('if item not found will not save it', async () => {
    expect.assertions(1)
    const taskId = 5

    const repository = new TimestampsRepository()

    await repository.saveTimestamp({
      id: 1,
      comment: 'some comment',
      taskId,
      datetimeEnd: '',
      datetimeStart: ''
    })

    const timestamps = await repository.getTimestamps(taskId)

    expect(timestamps.length).toEqual(0)
  })
})

describe('timestamp repository delete() tests', () => {
  it('will delete timeStamp', async () => {
    expect.assertions(1)

    const repository = new TimestampsRepository()
    const taskId = 3

    await repository.addTimeStamp({
      comment: 'some comment',
      taskId,
      datetimeEnd: '',
      datetimeStart: ''
    })

    const timestamp = (await repository.getTimestamps(taskId))[0]
    await repository.deleteTimestamp(timestamp.id)

    const timestamps = await repository.getTimestamps(taskId)

    expect(timestamps.length).toEqual(0)
  })

  it('will not delete if did not find timestamp', async () => {
    expect.assertions(1)

    const repository = new TimestampsRepository()
    const taskId = 4
    const someRandomTimeStampId = 10

    await repository.addTimeStamp({
      comment: 'some comment',
      taskId,
      datetimeEnd: '',
      datetimeStart: ''
    })

    await repository.deleteTimestamp(someRandomTimeStampId)

    const timestampsLength = (await repository.getTimestamps(taskId)).length

    expect(timestampsLength).toEqual(1)

  })
})
