import { Button, Menu, MenuItem, Popover } from '@blueprintjs/core'
import { navigate } from '@reach/router'
import { StandardPeriodNames } from 'app/report'
import { reportPageRoute } from 'components/pages/ReportPage'
import { standardPeriods } from 'components/report/ReportSettingsPicker/standardPeriods'
import React from 'react'

interface IProps {
  period: StandardPeriodNames
}

export const CurrentPeriodPicker: React.FC<IProps> = ({ period }) => {

  const [currentPeriod, setCurrentPeriod] = React.useState(standardPeriods[period])

  const menuItems = React.useMemo(() =>

    Object.keys(standardPeriods)
      .map(key => {
        const onClick = () => {
          setCurrentPeriod(standardPeriods[key])
          navigate(reportPageRoute.getUrl(key))
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
