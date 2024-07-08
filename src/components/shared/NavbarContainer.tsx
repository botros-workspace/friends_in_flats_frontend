/* eslint-disable react-hooks/exhaustive-deps */
import { userDataState } from '@/shared/recoilStates/user-data.state'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import { GiHamburgerMenu } from 'react-icons/gi'
import { useRecoilState, useRecoilValue } from 'recoil'
import { supabase } from '../../../supabase'

const NavbarContainer: FunctionComponent = () => {
  const router = useRouter()
  const menuRef = useRef<HTMLDivElement>(null)
  const [isMenuOpened, setIsMenuOpened] = useState(false)
  const [userData, setUserData] = useRecoilState(userDataState)
  const [showBurgerMenu, setShowBurgerMenu] = useState(false)

  const handleSignOutClick = useCallback(async () => {
    await supabase.auth.signOut()
    setUserData({
      userEmail: '',
      userId: '',
      apartments: [],
    })
    setIsMenuOpened(false)
    router.push('/')
  }, [setUserData])

  useEffect(() => {
    if (userData.userEmail !== '' && userData.userId !== '') {
      setShowBurgerMenu(true)
    } else {
      setShowBurgerMenu(false)
    }
  }, [userData.userEmail, userData.userId])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        event.target &&
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpened(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])
  return (
    <nav className='border-2 border-b-gray h-12 py-2 px-4 z-20 flex justify-between items-stretch justify-start'>
      <div className='flex flex-shrink-0 items-center'>
        <Link href={'/'}>
          <Image
            width={40}
            style={{
              borderRadius: '20%',
              borderWidth: 2,
              borderColor: router.pathname === '/' ? 'blue' : 'transparent',
            }}
            height={40}
            alt='Company logo'
            src={'/logo.jpeg'}
          ></Image>
        </Link>
      </div>
      {showBurgerMenu && (
        <div
          onClick={() => {
            setIsMenuOpened(!isMenuOpened)
          }}
          className='flex items-center cursor-pointer border-2 rounded-full py-3 px-1.5 hover:bg-gray-400 hover:text-white'
        >
          <GiHamburgerMenu />
        </div>
      )}
      {isMenuOpened && (
        <div
          className='absolute right-0 z-10 mt-10 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5'
          role='menu'
          aria-orientation='vertical'
          aria-labelledby='user-menu-button'
          ref={menuRef}
        >
          <div
            onClick={handleSignOutClick}
            className='block p-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-400 hover:text-white '
            role='menuitem'
            id='user-menu-item-2'
          >
            Sign out
          </div>
          <div
            className='block p-2 text-sm text-gray-700 text-[10px] border-t-4'
            role='menuitem'
            id='user-menu-item-2'
          >
            <div className='font-semibold'> Logged as: </div>
            <div> {userData.userEmail}</div>
          </div>
        </div>
      )}
    </nav>
  )
}

export default NavbarContainer
