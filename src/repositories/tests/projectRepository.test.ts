import { IProject } from "app/dto"
import { ProjectRepository } from "repositories/projectRepository"

beforeEach(() => {
  window.localStorage.clear()
})

describe('project repository get() tests', () => {

  it('when repository is empty returns empty, not null', async () => {
    const repository = new ProjectRepository()
    const projects = await repository.get()

    expect([...projects.values()]).toEqual([])
  })

})

describe('project repository add() tests', () => {

  it('can add item', async () => {
    expect.assertions(1)
    const repository = new ProjectRepository()

    await repository.add({
      title: 'some title'
    })

    const projects = await repository.get()

    expect(projects.size).toEqual(1)
  })
})

describe('project repository save() tests', () => {

  it('can save existing item', async () => {
    const assertionsCount = 3

    expect.assertions(assertionsCount)
    const repository = new ProjectRepository()

    const id = await repository.add({
      title: 'some title'
    })

    const projects = await repository.get()
    // we're sure that it's not undefined or the test will fail anyways
    const project = projects.get(id) as IProject
    const newTitle = 'newTitle'
    project.title = newTitle

    await repository.save(project)

    const changedProjects = await repository.get()
    expect(changedProjects.size).toBe(1)

    const changedProject = changedProjects.get(id) as IProject
    expect(changedProject.title).toBe(newTitle)
    expect(changedProject).not.toBe(project)
  })

  it('when item is not found it will not be saved', async () => {
    expect.assertions(1)
    const repository = new ProjectRepository()

    await repository.save({
      id: 1,
      title: 'some title'
    })

    const projects = await repository.get()
    expect(projects.size).toBe(0)
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

    expect(projects.size).toEqual(1)
  })

  it('will delete project', async () => {
    expect.assertions(1)
    const repository = new ProjectRepository()

    const addResult = await repository.add({
      title: 'some title'
    })

    await repository.delete(addResult)
    const projects = await repository.get()

    expect(projects.size).toBe(0)
  })
})
