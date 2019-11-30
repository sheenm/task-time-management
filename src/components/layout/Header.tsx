import { Button, Navbar, NavbarDivider, NavbarGroup, NavbarHeading } from '@blueprintjs/core'
import { Link } from '@reach/router'
import { Wrapper } from 'components/layout/Wrapper'
import { reportsPageRoute } from 'components/pages/ReportsPage'
import { trackerPageRoute } from 'components/pages/TrackerPage'
import * as React from 'react'
import styles from './Header.module.scss'

export const Header: React.FC = () => {
  return <Navbar className={styles.navbar}>
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
