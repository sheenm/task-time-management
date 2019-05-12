import { RouteComponentProps } from '@reach/router'
import { IRoute } from 'app/routes'
import { EditTimestampModal } from 'components/timestamp/EditTimestampModal'
import React from 'react'

interface IRouteProps {
  timestampId: number | string
}

export const editTimestampModalPageRoute: IRoute<IRouteProps> = {
  template: 'edit-timestamp/:timestampId',
  getUrl: (props) => {
    if (props === undefined)
      return ''

    return `edit-timestamp/${props.timestampId}`
  }
}

interface IProps {
  timestampId: string
}

export const EditTimestampModalPage: React.FC<RouteComponentProps<IProps>> = (props) => {
  const navigateBack = React.useCallback(() => {
    if (props.navigate === undefined || props.location === undefined ||
      props.timestampId === undefined)
      return

    const backRoute = props.location.pathname.replace(editTimestampModalPageRoute.getUrl({
      timestampId: props.timestampId,
    }), '')

    props.navigate(backRoute)

  }, [props])

  return <EditTimestampModal
    closeModal={navigateBack}
    timestampId={Number(props.timestampId)}
  />
}
