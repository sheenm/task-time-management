import { ITask } from "app/dto"
import { TaskRepository } from "repositories/taskRepository"

beforeEach(() => {
  window.localStorage.clear()
})

describe('task repository get() tests', () => {

  it('when repository is empty returns empty, not null', async () => {
    const repository = new TaskRepository()
    const projectId = 1
    const tasks = await repository.get(projectId)

    expect([...tasks.values()]).toEqual([])
  })
})

describe('task repository add() tests', () => {

  it('can add item', async () => {
    expect.assertions(1)
    const repository = new TaskRepository()
    const projectId = 2

    await repository.add({
      projectId,
      title: 'some title'
    })

    const tasks = await repository.get(projectId)

    expect(tasks.size).toEqual(1)
  })
})

describe('task repository save() tests', () => {

  it('can save existing item', async () => {
    const assertionsCount = 3

    expect.assertions(assertionsCount)
    const repository = new TaskRepository()
    const projectId = 3

    const id = await repository.add({
      projectId,
      title: 'some title'
    })

    const tasks = await repository.get(projectId)
    // we're sure that it's not undefined or it will fail the test
    const task = tasks.get(id) as ITask
    const newTitle = 'newTitle'
    task.title = newTitle

    await repository.save(task)

    const changedTasks = await repository.get(projectId)
    expect(changedTasks.size).toBe(1)

    const changedTask = changedTasks.get(id) as ITask
    expect(changedTask.title).toBe(newTitle)
    expect(changedTask).not.toBe(task)
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
    expect(tasks.size).toBe(0)
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

    expect(tasks.size).toEqual(1)
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

    expect(tasks.size).toBe(0)
  })
})
