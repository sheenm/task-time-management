import * as React from 'react'
import injectSheet, { WithSheet } from 'react-jss'

const styles = {
  wrapper: {
    maxWidth: 960,
    margin: '0 auto 0',
    padding: '0 1rem'
  }
}

interface IProps extends WithSheet<typeof styles, {}> {
  marginTop?: number | string
}

const WrapperInner: React.FC<IProps> = ({ classes, children, marginTop }) => {
  return <div className={classes.wrapper} style={{ marginTop }}>
    {children}
  </div>
}

export const Wrapper = injectSheet(styles)(WrapperInner)
