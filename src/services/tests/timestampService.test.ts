import { ITimestamp } from 'app/businessObjects'
import { TimestampService } from 'services/timestampService'

beforeEach(() => {
  window.localStorage.clear()
})

describe('timestamp service get() tests', () => {

  it('when service is empty returns empty, not null', async () => {
    const service = new TimestampService()
    const timestamps = await service.get(1)

    expect([...timestamps.values()]).toEqual([])
  })
})

describe('timestamp service add tests', () => {

  it('can add item', async () => {
    expect.assertions(1)

    const service = new TimestampService()
    const taskId = 1

    await service.add({
      comment: 'some comment',
      taskId,
      datetimeEnd: undefined,
      datetimeStart: new Date()
    })

    const timestamps = await service.get(taskId)
    expect(timestamps.size).toBe(1)
  })
})

describe('timestamp service save() tests', () => {

  it('can add item and change it', async () => {
    const assertionsCount = 2
    expect.assertions(assertionsCount)
    const taskId = 2

    const service = new TimestampService()

    const id = await service.add({
      comment: 'some comment',
      taskId,
      datetimeEnd: undefined,
      datetimeStart: new Date()
    })

    // we're sure that it's not undefined so I put here as ITimestamp
    const timestamp = (await service.get(taskId)).get(id) as ITimestamp

    timestamp.comment = 'new comment'
    await service.save(timestamp)

    const timestampFromservice = (await service.get(taskId)).get(id) as ITimestamp

    expect(timestamp.comment).toBe(timestampFromservice.comment)
    expect(timestamp).not.toBe(timestampFromservice)
  })

  it('if item not found will not save it', async () => {
    expect.assertions(1)
    const taskId = 5

    const service = new TimestampService()

    await service.save({
      id: 1,
      comment: 'some comment',
      taskId,
      datetimeEnd: undefined,
      datetimeStart: new Date()
    })

    const timestamps = await service.get(taskId)

    expect(timestamps.size).toEqual(0)
  })
})

describe('timestamp service delete() tests', () => {

  it('will delete timestamp', async () => {
    expect.assertions(1)

    const service = new TimestampService()
    const taskId = 3

    const id = await service.add({
      comment: 'some comment',
      taskId,
      datetimeEnd: undefined,
      datetimeStart: new Date()
    })

    await service.delete(id)

    const timestamps = await service.get(taskId)

    expect(timestamps.size).toEqual(0)
  })

  it('will not delete if did not find timestamp', async () => {
    expect.assertions(1)

    const service = new TimestampService()
    const taskId = 4
    const someRandomTimestampId = 10

    await service.add({
      comment: 'some comment',
      taskId,
      datetimeEnd: undefined,
      datetimeStart: new Date()
    })

    await service.delete(someRandomTimestampId)

    const timestampsLength = (await service.get(taskId)).size

    expect(timestampsLength).toEqual(1)

  })
})
