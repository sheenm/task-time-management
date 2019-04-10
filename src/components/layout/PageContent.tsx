import * as React from 'react'
import injectSheet, { WithSheet } from 'react-jss'
import { Projects } from '../project/Projects'
import { Wrapper } from './Wrapper'

const styles = {

}

interface IProps extends WithSheet<typeof styles, {}> {

}

const PageContentInner: React.FC<IProps> = ({ classes, ...props }) => {

  return <Wrapper marginTop={'1rem'}>
    <Projects />
  </Wrapper>
}

export const PageContent = injectSheet(styles)(PageContentInner)
