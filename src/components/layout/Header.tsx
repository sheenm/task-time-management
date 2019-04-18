import { Button, Navbar, NavbarGroup, NavbarHeading } from '@blueprintjs/core'
import { Link } from '@reach/router'
import * as React from 'react'
import injectSheet, { WithSheet } from 'react-jss'
import { reportPageRoute } from '../pages/ReportPage'
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
        <NavbarHeading>Task time management</NavbarHeading>
        <Link to={trackerPageRoute.getUrl()}>
          <Button minimal tabIndex={-1}>Tracker</Button>
        </Link>
        <Link to={reportPageRoute.getUrl()}>
          <Button minimal tabIndex={-1}>Report</Button>
        </Link>

      </NavbarGroup>
    </Wrapper>
  </Navbar >
}

export const Header = injectSheet(styles)(HeaderInner)
