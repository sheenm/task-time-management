import { ITimestamp } from "app/dto"
import { TimestampRepository } from "repositories/timestampRepository"

beforeEach(() => {
  window.localStorage.clear()
})

describe('timestamp repository get() tests', () => {

  it('when repository is empty returns empty, not null', async () => {
    const repository = new TimestampRepository()
    const timestamps = await repository.get(1)

    expect([...timestamps.values()]).toEqual([])
  })
})

describe('timestamp repository add tests', () => {

  it('can add item', async () => {
    expect.assertions(1)

    const repository = new TimestampRepository()
    const taskId = 1

    await repository.add({
      comment: 'some comment',
      taskId,
      datetimeEnd: undefined,
      datetimeStart: new Date()
    })

    const timestamps = await repository.get(taskId)
    expect(timestamps.size).toBe(1)
  })
})

describe('timestamp repository save() tests', () => {

  it('can add item and change it', async () => {
    const assertionsCount = 2
    expect.assertions(assertionsCount)
    const taskId = 2

    const repository = new TimestampRepository()

    const id = await repository.add({
      comment: 'some comment',
      taskId,
      datetimeEnd: undefined,
      datetimeStart: new Date()
    })

    // we're sure that it's not undefined so I put here as ITimestamp
    const timestamp = (await repository.get(taskId)).get(id) as ITimestamp

    timestamp.comment = 'new comment'
    await repository.save(timestamp)

    const timestampFromRepository = (await repository.get(taskId)).get(id) as ITimestamp

    expect(timestamp.comment).toBe(timestampFromRepository.comment)
    expect(timestamp).not.toBe(timestampFromRepository)
  })

  it('if item not found will not save it', async () => {
    expect.assertions(1)
    const taskId = 5

    const repository = new TimestampRepository()

    await repository.save({
      id: 1,
      comment: 'some comment',
      taskId,
      datetimeEnd: undefined,
      datetimeStart: new Date()
    })

    const timestamps = await repository.get(taskId)

    expect(timestamps.size).toEqual(0)
  })
})

describe('timestamp repository delete() tests', () => {

  it('will delete timestamp', async () => {
    expect.assertions(1)

    const repository = new TimestampRepository()
    const taskId = 3

    const id = await repository.add({
      comment: 'some comment',
      taskId,
      datetimeEnd: undefined,
      datetimeStart: new Date()
    })

    await repository.delete(id)

    const timestamps = await repository.get(taskId)

    expect(timestamps.size).toEqual(0)
  })

  it('will not delete if did not find timestamp', async () => {
    expect.assertions(1)

    const repository = new TimestampRepository()
    const taskId = 4
    const someRandomTimestampId = 10

    await repository.add({
      comment: 'some comment',
      taskId,
      datetimeEnd: undefined,
      datetimeStart: new Date()
    })

    await repository.delete(someRandomTimestampId)

    const timestampsLength = (await repository.get(taskId)).size

    expect(timestampsLength).toEqual(1)

  })
})
