import React from 'react'
import { Wrapper } from './Wrapper'

interface IProps {
  HeaderContent: React.ReactNode
}

export const Layout: React.FC<IProps> = ({ HeaderContent, children }) => {

  return <>
    {HeaderContent}
    <Wrapper marginTop='1rem'>
      {children}
    </Wrapper>
  </>
}
