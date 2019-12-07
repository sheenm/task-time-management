import { Button, Icon, Navbar, NavbarDivider, NavbarGroup, NavbarHeading, Popover, PopoverInteractionKind, Position } from '@blueprintjs/core'
import { Link } from '@reach/router'
import { Wrapper } from 'components/layout/Wrapper'
import { reportsPageRoute } from 'pages/ReportsPage'
import { ProjectsList } from 'components/project/ProjectsList'
import * as React from 'react'
import styles from './Header.module.scss'
import { ThemeSwitcher } from './ThemeSwitcher'

export const Header: React.FC = () => {
  return <Navbar className={styles.navbar}>
    <Wrapper>
      <NavbarGroup>
        <NavbarHeading>
          <Icon icon='briefcase' /> Tasks
        </NavbarHeading>
        <NavbarDivider />

        <Popover content={<ProjectsList />} position={Position.BOTTOM} interactionKind={PopoverInteractionKind.HOVER} >
          <Button minimal tabIndex={-1} icon='time'>Tracker</Button>
        </Popover>

        <Link to={reportsPageRoute.getUrl()}>
          <Button minimal tabIndex={-1} icon='document'>Report</Button>
        </Link>
      </NavbarGroup>
      <NavbarGroup align='right'>
        <ThemeSwitcher />
      </NavbarGroup>
    </Wrapper>
  </Navbar >
}
