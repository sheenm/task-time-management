import { Button, Navbar, NavbarDivider, NavbarGroup, NavbarHeading } from '@blueprintjs/core'
import { Link } from '@reach/router'
import * as React from 'react'
import injectSheet, { WithSheet } from 'react-jss'
import { reportsPageRoute } from '../pages/ReportsPage'
import { trackerPageRoute } from '../pages/TrackerPage'
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
        <Link to={trackerPageRoute.getUrl()}>
          <NavbarHeading>Yup!</NavbarHeading>
        </Link>
        <NavbarDivider />
        <Link to={trackerPageRoute.getUrl()}>
          <Button minimal tabIndex={-1} icon='time'>Tracker</Button>
        </Link>
        <Link to={reportsPageRoute.getUrl()}>
          <Button minimal tabIndex={-1} icon='document'>Report</Button>
        </Link>

      </NavbarGroup>
    </Wrapper>
  </Navbar >
}

export const Header = injectSheet(styles)(HeaderInner)
