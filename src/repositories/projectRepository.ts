import { IProject, WithoutId } from "app/dto"
import { IProjectRepository } from "app/repositories"
import { LocalStorageRepository } from "repositories/localStorageRepository"

const projectsKey = 'projects'
const projectIndexKey = 'projects.index'

export class ProjectRepository implements IProjectRepository {

  private readonly localStorage = new LocalStorageRepository()

  public get(): Promise<IProject[]> {
    return this.localStorage.getItems<IProject>(projectsKey)
  }

  /**
   * @returns id of added project
   */
  public add(project: WithoutId<IProject>): Promise<number> {
    return this.incrementCurrentIndex()
      .then(() => this.getCurrentIndex())
      .then(index => {
        const projectToAdd = { ...project, id: index }

        return this.get()
          .then(projects => {
            projects.push(projectToAdd)
            this.localStorage.setItem(projectsKey, projects)

            return projectToAdd.id
          })
      })
  }

  public save(project: IProject): Promise<void> {
    return this.get()
      .then(projects => {
        const index = projects.findIndex(x => x.id === project.id)

        if (index !== -1)
          projects.splice(index, 1, project)

        this.localStorage.setItem(projectsKey, projects)
      })
  }

  public delete(projectId: number): Promise<void> {
    return this.get()
      .then(projects => {
        const index = projects.findIndex(x => x.id === projectId)

        if (index !== -1)
          projects.splice(index, 1)

        this.localStorage.setItem(projectsKey, projects)
      })
  }

  private getCurrentIndex(): Promise<number> {
    return this.localStorage.getNumber(projectIndexKey)
      .then(index => {
        if (index === undefined) {
          this.localStorage.setNumber(projectIndexKey, 1)

          return 1
        }

        return index
      })
  }

  private incrementCurrentIndex() {
    return this.getCurrentIndex()
      .then(index => this.localStorage.setNumber(projectIndexKey, ++index))
  }
}
