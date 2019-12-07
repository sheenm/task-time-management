import { ITask } from 'app/businessObjects'
import { TaskService } from 'services/taskService'

beforeEach(() => {
  window.localStorage.clear()
})

describe('task service get() tests', () => {

  it('when service is empty returns empty, not null', async () => {
    const service = new TaskService()
    const projectId = 1
    const tasks = await service.get(projectId)

    expect([...tasks.values()]).toEqual([])
  })
})

describe('task service add() tests', () => {

  it('can add item', async () => {
    expect.assertions(1)
    const service = new TaskService()
    const projectId = 2

    await service.add({
      projectId,
      title: 'some title'
    })

    const tasks = await service.get(projectId)

    expect(tasks.size).toEqual(1)
  })
})

describe('task service save() tests', () => {

  it('can save existing item', async () => {
    const assertionsCount = 3

    expect.assertions(assertionsCount)
    const service = new TaskService()
    const projectId = 3

    const id = await service.add({
      projectId,
      title: 'some title'
    })

    const tasks = await service.get(projectId)
    // we're sure that it's not undefined or it will fail the test
    const task = tasks.get(id) as ITask
    const newTitle = 'newTitle'
    task.title = newTitle

    await service.save(task)

    const changedTasks = await service.get(projectId)
    expect(changedTasks.size).toBe(1)

    const changedTask = changedTasks.get(id) as ITask
    expect(changedTask.title).toBe(newTitle)
    expect(changedTask).not.toBe(task)
  })

  it('when item is not found it will not be saved', async () => {
    expect.assertions(1)
    const service = new TaskService()
    const projectId = 4

    await service.save({
      id: 1,
      projectId,
      title: 'some title'
    })

    const tasks = await service.get(projectId)
    expect(tasks.size).toBe(0)
  })
})

describe('tasks service delete() tests', () => {

  it('when item is not found it will not delete', async () => {
    expect.assertions(1)
    const service = new TaskService()
    const projectId = 5

    const addResult = await service.add({
      projectId,
      title: 'some title'
    })

    await service.delete(addResult + 1)
    const tasks = await service.get(projectId)

    expect(tasks.size).toEqual(1)
  })

  it('will delete task', async () => {
    expect.assertions(1)
    const service = new TaskService()
    const projectId = 6

    const addResult = await service.add({
      projectId,
      title: 'some title'
    })

    await service.delete(addResult)
    const tasks = await service.get(projectId)

    expect(tasks.size).toBe(0)
  })
})
