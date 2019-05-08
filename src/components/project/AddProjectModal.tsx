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

  const onTitleChanged = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) =>
    setProjectTitle(e.target.value), [])

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

  const onEnterPressed = React.useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter')
      createProject()
  }, [createProject])

  return <Dialog
    title='Adding a project'
    isOpen={true}
    onClose={closeModal}
  >
    <section className={Classes.DIALOG_BODY}>
      <FormGroup label='Title:' labelFor='addProjectInput'>
        <InputGroup
          id='addProjectInput'
          onChange={onTitleChanged}
          value={projectTitle}
          onKeyDown={onEnterPressed}
          autoFocus />
      </FormGroup>
    </section>

    <section className={Classes.DIALOG_FOOTER}>
      <div className={Classes.DIALOG_FOOTER_ACTIONS}>
        <Button onClick={closeModal} title='Close dialog'>Close</Button>
        <Button intent={Intent.PRIMARY} onClick={createProject} title='Add project'>
          Add project
        </Button>
      </div>
    </section>
  </Dialog>
}
