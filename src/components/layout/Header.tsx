import { Navbar, NavbarGroup, NavbarHeading } from '@blueprintjs/core'
import * as React from 'react'
import injectSheet, { WithSheet } from 'react-jss'
import { Wrapper } from './Wrapper'

const styles = {
  navbar: {
    paddingLeft: 0
  }
}

interface IProps extends WithSheet<typeof styles, {}> {
}

const HeaderInner: React.FC<IProps> = ({ classes }) => {
  return <Navbar className={classes.navbar}>
    <Wrapper>
      <NavbarGroup>
        <NavbarHeading>Task time management</NavbarHeading>
      </NavbarGroup>
    </Wrapper>
  </Navbar>
}

export const Header = injectSheet(styles)(HeaderInner)
