import { StandardPeriodNames } from 'app/report'
import React from 'react'
import { CurrentPeriodPicker } from './ReportSettingsPicker/CurrentPeriodPicker'

interface IProps {
  period: StandardPeriodNames
}

export const ReportSettingsPicker: React.FC<IProps> = ({ period }) => {

  return <>
    <CurrentPeriodPicker period={period} />
  </>
}
