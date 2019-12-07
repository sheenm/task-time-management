import { Button, Classes, FormGroup, InputGroup, Intent } from '@blueprintjs/core'
import { ThemedDialog } from 'components/layout/ThemedDialog'
import { ProjectsContext } from 'components/project/ProjectsContextProvider'
import { ServiceContext } from 'components/services/ServiceContext'
import React from 'react'

interface IProps {
  closeModal: () => void
}

export const AddProjectModal: React.FC<IProps> = ({ closeModal }) => {
  const [projectTitle, setProjectTitle] = React.useState('')
  const { projectService } = React.useContext(ServiceContext)
  const { dispatch } = React.useContext(ProjectsContext)

  const onTitleChanged = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) =>
    setProjectTitle(e.target.value), [])

  const createProject = () => {
    const project = {
      title: projectTitle
    }

    projectService.add(project)
      .then(id => {
        dispatch({ type: 'ADD_PROJECT', project: { ...project, id } })
        closeModal()
      })
  }

  const onEnterPressed = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter')
      createProject()
  }

  return <ThemedDialog
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
  </ThemedDialog>
}
