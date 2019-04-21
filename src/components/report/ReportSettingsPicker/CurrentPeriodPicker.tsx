import { Button, Menu, MenuItem, Popover } from '@blueprintjs/core'
import { navigate } from '@reach/router'
import React from 'react'
import { reportPageRoute } from '../../pages/ReportPage'
import { standardPeriods } from './standardPeriods'

export const CurrentPeriodPicker: React.FC = () => {

  const [currentPeriod, setCurrentPeriod] = React.useState(standardPeriods.today)

  const menuItems = React.useMemo(() =>

    Object.keys(standardPeriods)
      .map(key => {
        const onClick = () => {
          setCurrentPeriod(standardPeriods[key])
          navigate(reportPageRoute.getUrl(standardPeriods[key].title))
        }

        return <MenuItem key={key}
          text={standardPeriods[key].title}
          onClick={onClick}
        />
      })
    , [])

  return <Popover>
    <Button>Period: {currentPeriod.title}</Button>
    <Menu>
      {menuItems}
    </Menu>
  </Popover>
}
