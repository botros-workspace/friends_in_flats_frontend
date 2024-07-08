/* eslint-disable react-hooks/exhaustive-deps */
import React, { FunctionComponent, ReactNode, useEffect } from 'react'
import NavbarContainer from './NavbarContainer'
import { useRecoilValue } from 'recoil'
import { userDataState } from '@/shared/recoilStates/user-data.state'
import { useRouter } from 'next/router'

type Props = {
  children: ReactNode
}

export const Layout: FunctionComponent<Props> = ({ children }) => {
  const userAuthData = useRecoilValue(userDataState)
  const router = useRouter()

  useEffect(() => {
    if (userAuthData.userId !== '' && userAuthData.userEmail !== '') {
      router.push('./profile')
    }
  }, [userAuthData.userEmail, userAuthData.userId])
  return (
    <div
      style={{
        height: '100vh',
        width: '100vw',
      }}
    >
      <NavbarContainer />
      <div>{children}</div>
    </div>
  )
}

export default Layout
