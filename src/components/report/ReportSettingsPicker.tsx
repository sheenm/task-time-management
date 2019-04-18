import React from 'react'
import { CurrentPeriodPicker } from './ReportSettingsPicker/CurrentPeriodPicker'

export const ReportSettingsPicker: React.FC = ({ }) => {

  return <>
    <CurrentPeriodPicker redirect={(route) => console.log(route)} />
  </>
}
