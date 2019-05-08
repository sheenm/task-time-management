import { Button, Classes, Dialog, FormGroup, InputGroup, Intent } from '@blueprintjs/core'
import React from 'react'
import { RepositoryContext } from '../repositories/RepositoryContext'
import { ProjectsContext } from './ProjectsContextProvider'

interface IProps {
  closeModal: () => void
}

export const AddProjectModal: React.FC<IProps> = ({ closeModal }) => {
  const [projectTitle, setProjectTitle] = React.useState('')
  const { projectRepo } = React.useContext(RepositoryContext)
  const { dispatch } = React.useContext(ProjectsContext)

  const onTitleChanged = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => setProjectTitle(e.target.value), [])

  const createProject = React.useCallback(() => {
    const project = {
      title: projectTitle
    }

    projectRepo.add(project)
      .then(id => {
        dispatch({ type: 'ADD_PROJECT', project: { ...project, id } })
        closeModal()
      })

  }, [projectTitle, projectRepo])

  return <Dialog
    title='Adding a project'
    isOpen={true}
    onClose={closeModal}
  >
    <section className={Classes.DIALOG_BODY}>
      <FormGroup label='Title:' labelFor='addProjectInput'>
        <InputGroup id='addProjectInput' onChange={onTitleChanged} value={projectTitle} autoFocus />
      </FormGroup>
    </section>

    <section className={Classes.DIALOG_FOOTER}>
      <div className={Classes.DIALOG_FOOTER_ACTIONS}>
        <Button onClick={closeModal}>Close</Button>
        <Button intent={Intent.PRIMARY} onClick={createProject} >
          Add project
        </Button>
      </div>
    </section>
  </Dialog>
}
