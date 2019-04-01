import { H1 } from '@blueprintjs/core'
import * as React from 'react'
import injectSheet, { WithSheet } from 'react-jss'
import { Wrapper } from './Wrapper'

const styles = {

}

interface IProps extends WithSheet<typeof styles, {}> {

}

const PageContentInner: React.FC<IProps> = ({ classes, ...props }) => {

  return <Wrapper marginTop={'1rem'}>
    <H1>hello world</H1>
  </Wrapper>
}

export const PageContent = injectSheet(styles)(PageContentInner)
