import { TaskRepository } from "../taskRepository"

beforeEach(() => {
  window.localStorage.clear()
})

describe('task repository get() tests', () => {

  it('when repository is empty returns empty, not null', async () => {
    const repository = new TaskRepository()
    const projectId = 1
    const tasks = await repository.get(projectId)

    expect(tasks).toEqual([])
  })
})

describe('task repository add() tests', () => {

  it('can add item', async () => {
    expect.assertions(1)
    const repository = new TaskRepository()
    const projectId = 2

    const addResult = await repository.add({
      projectId,
      title: 'some title'
    })

    const tasks = await repository.get(projectId)

    expect(tasks.length).toEqual(1)
  })
})

describe('task repository save() tests', () => {

  it('can save existing item', async () => {
    const assertionsCount = 3

    expect.assertions(assertionsCount)
    const repository = new TaskRepository()
    const projectId = 3

    const addResult = await repository.add({
      projectId,
      title: 'some title'
    })

    const tasks = await repository.get(projectId)
    const task = tasks[0]
    const newTitle = 'newTitle'
    task.title = newTitle

    await repository.save(task)

    const changedTasks = await repository.get(projectId)
    expect(changedTasks.length).toBe(1)
    expect(changedTasks[0].title).toBe(newTitle)
    expect(changedTasks[0]).not.toBe(task)
  })

  it('when item is not found it will not be saved', async () => {
    expect.assertions(1)
    const repository = new TaskRepository()
    const projectId = 4

    await repository.save({
      id: 1,
      projectId,
      title: 'some title'
    })

    const tasks = await repository.get(projectId)
    expect(tasks.length).toBe(0)
  })
})

describe('tasks repository delete() tests', () => {

  it('when item is not found it will not delete', async () => {
    expect.assertions(1)
    const repository = new TaskRepository()
    const projectId = 5

    const addResult = await repository.add({
      projectId,
      title: 'some title'
    })

    await repository.delete(addResult + 1)
    const tasks = await repository.get(projectId)

    expect(tasks.length).toEqual(1)
  })

  it('will delete task', async () => {
    expect.assertions(1)
    const repository = new TaskRepository()
    const projectId = 6

    const addResult = await repository.add({
      projectId,
      title: 'some title'
    })

    await repository.delete(addResult)
    const tasks = await repository.get(projectId)

    expect(tasks.length).toBe(0)
  })
})
