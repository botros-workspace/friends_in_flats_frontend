import React, { FunctionComponent, ReactNode, useLayoutEffect } from 'react'
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
  useLayoutEffect(() => {
    if (userAuthData.userId !== '' && userAuthData.userEmail !== '') {
      router.push('./profile')
    }
  }, [router, userAuthData.userEmail, userAuthData.userId])
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
