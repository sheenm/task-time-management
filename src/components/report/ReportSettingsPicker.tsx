import { StandardPeriodNames } from 'app/report'
import { CurrentPeriodPicker } from 'components/report/ReportSettingsPicker/CurrentPeriodPicker'
import React from 'react'

interface IProps {
  period: StandardPeriodNames
}

export const ReportSettingsPicker: React.FC<IProps> = ({ period }) => {

  return <>
    <CurrentPeriodPicker period={period} />
  </>
}
