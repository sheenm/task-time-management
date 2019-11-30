import { IProject } from 'app/businessObjects'
import { ProjectService } from 'services/projectService'

beforeEach(() => {
  window.localStorage.clear()
})

describe('project service get() tests', () => {

  it('when service is empty returns empty, not null', async () => {
    const service = new ProjectService()
    const projects = await service.get()

    expect([...projects.values()]).toEqual([])
  })

})

describe('project service add() tests', () => {

  it('can add item', async () => {
    expect.assertions(1)
    const service = new ProjectService()

    await service.add({
      title: 'some title'
    })

    const projects = await service.get()

    expect(projects.size).toEqual(1)
  })
})

describe('project service save() tests', () => {

  it('can save existing item', async () => {
    const assertionsCount = 3

    expect.assertions(assertionsCount)
    const service = new ProjectService()

    const id = await service.add({
      title: 'some title'
    })

    const projects = await service.get()
    // we're sure that it's not undefined or the test will fail anyways
    const project = projects.get(id) as IProject
    const newTitle = 'newTitle'
    project.title = newTitle

    await service.save(project)

    const changedProjects = await service.get()
    expect(changedProjects.size).toBe(1)

    const changedProject = changedProjects.get(id) as IProject
    expect(changedProject.title).toBe(newTitle)
    expect(changedProject).not.toBe(project)
  })

  it('when item is not found it will not be saved', async () => {
    expect.assertions(1)
    const service = new ProjectService()

    await service.save({
      id: 1,
      title: 'some title'
    })

    const projects = await service.get()
    expect(projects.size).toBe(0)
  })
})

describe('project service delete() tests', () => {

  it('when item is not found it will not delete', async () => {
    expect.assertions(1)
    const service = new ProjectService()

    const addResult = await service.add({
      title: 'some title'
    })

    await service.delete(addResult + 1)
    const projects = await service.get()

    expect(projects.size).toEqual(1)
  })

  it('will delete project', async () => {
    expect.assertions(1)
    const service = new ProjectService()

    const addResult = await service.add({
      title: 'some title'
    })

    await service.delete(addResult)
    const projects = await service.get()

    expect(projects.size).toBe(0)
  })
})
