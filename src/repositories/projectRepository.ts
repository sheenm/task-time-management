import { Dictionary, IProject, WithoutId } from "app/dto"
import { IProjectRepository } from "app/repositories"
import { LocalStorageRepository } from "repositories/localStorageRepository"

const projectsKey = 'projects'
const projectIndexKey = 'projects.index'

export class ProjectRepository implements IProjectRepository {

  private readonly localStorage = new LocalStorageRepository()

  public get(): Promise<Dictionary<IProject>> {
    return this.localStorage.getMap<IProject>(projectsKey)
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
            projects.set(index, projectToAdd)
            this.localStorage.setMap(projectsKey, projects)

            return projectToAdd.id
          })
      })
  }

  public save(project: IProject): Promise<void> {
    return this.get()
      .then(projects => {
        if (!projects.has(project.id))
          return

        projects.set(project.id, project)
        this.localStorage.setMap(projectsKey, projects)
      })
  }

  public delete(projectId: number): Promise<void> {
    return this.get()
      .then(projects => {
        projects.delete(projectId)
        this.localStorage.setMap(projectsKey, projects)
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
