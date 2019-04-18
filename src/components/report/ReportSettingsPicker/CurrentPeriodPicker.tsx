import { Button, Menu, MenuItem, Popover } from '@blueprintjs/core'
import React from 'react'

interface IStandardPeriod {
  [index: string]: {
    title: string
  }
}

const standardPeriods: IStandardPeriod = {
  today: {
    title: 'Today',
  },
  yesterday: {
    title: 'Yesterday'
  },
  lastWorkingDay: {
    title: 'LastWorkingDay'
  },
}

interface IProps {
  redirect: (route: string) => void
}

export const CurrentPeriodPicker: React.FC<IProps> = ({ redirect }) => {

  const [currentPeriod, setCurrentPeriod] = React.useState(standardPeriods.today)

  const menuItems = React.useMemo(() =>
    Object.keys(standardPeriods)
      .map(key => {
        const onClick = () => setCurrentPeriod(standardPeriods[key])

        return <MenuItem
          key={key}
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
