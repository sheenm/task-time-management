import * as React from 'react'
import styles from './Wrapper.module.scss'

interface IProps {
  marginTop?: number | string
}

export const Wrapper: React.FC<IProps> = ({ children, marginTop }) => {
  return <div className={styles.wrapper} style={{ marginTop }}>
    {children}
  </div>
}
