import { ProjectRepository } from "repositories/projectRepository"

beforeEach(() => {
  window.localStorage.clear()
})

describe('project repository get() tests', () => {

  it('when repository is empty returns empty, not null', async () => {
    const repository = new ProjectRepository()
    const projects = await repository.get()

    expect(projects).toEqual([])
  })

})

describe('project repository add() tests', () => {

  it('can add item', async () => {
    expect.assertions(1)
    const repository = new ProjectRepository()

    const addResult = await repository.add({
      title: 'some title'
    })

    const projects = await repository.get()

    expect(projects.length).toEqual(1)
  })
})

describe('project repository save() tests', () => {

  it('can save existing item', async () => {
    const assertionsCount = 3

    expect.assertions(assertionsCount)
    const repository = new ProjectRepository()

    const addResult = await repository.add({
      title: 'some title'
    })

    const projects = await repository.get()
    const project = projects[0]
    const newTitle = 'newTitle'
    project.title = newTitle

    await repository.save(project)

    const changedProjects = await repository.get()
    expect(changedProjects.length).toBe(1)
    expect(changedProjects[0].title).toBe(newTitle)
    expect(changedProjects[0]).not.toBe(project)
  })

  it('when item is not found it will not be saved', async () => {
    expect.assertions(1)
    const repository = new ProjectRepository()

    await repository.save({
      id: 1,
      title: 'some title'
    })

    const projects = await repository.get()
    expect(projects.length).toBe(0)
  })
})

describe('project repository delete() tests', () => {

  it('when item is not found it will not delete', async () => {
    expect.assertions(1)
    const repository = new ProjectRepository()

    const addResult = await repository.add({
      title: 'some title'
    })

    await repository.delete(addResult + 1)
    const projects = await repository.get()

    expect(projects.length).toEqual(1)
  })

  it('will delete project', async () => {
    expect.assertions(1)
    const repository = new ProjectRepository()

    const addResult = await repository.add({
      title: 'some title'
    })

    await repository.delete(addResult)
    const projects = await repository.get()

    expect(projects.length).toBe(0)
  })
})
