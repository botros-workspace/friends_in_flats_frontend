/* eslint-disable react-hooks/exhaustive-deps */
import { NextPage } from 'next'
import React, { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import AlertContainer from '@/components/shared/AlertContainer'
import { useRouter } from 'next/router'
import { supabase } from '../../../supabase'
import { useSetRecoilState } from 'recoil'
import { userDataState } from '@/shared/recoilStates/user-data.state'
import Loader from '@/components/shared/Loader'
import { FaRegEyeSlash, FaRegEye } from 'react-icons/fa'
import Link from 'next/link'

interface AuthData {
  email: string
  password: string
}
const SigninPage: NextPage = () => {
  const router = useRouter()
  const setUserhData = useSetRecoilState(userDataState)
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [authData, setAuthData] = useState<AuthData>({
    email: '',
    password: '',
  })
  const [alert, setAlert] = useState({
    type: '',
    message: '',
    visible: false,
  })
  const handleSingInClick = useCallback(async () => {
    if (authData.email === '') {
      setAlert({
        ...alert,
        type: 'error',
        message: 'Email field is required',
        visible: true,
      })
      return
    }
    if (authData.password === '') {
      setAlert({
        ...alert,
        type: 'error',
        message: 'Password field is required',
        visible: true,
      })
      return
    }
    try {
      setIsLoading(true)
      let { data, error } = await supabase.auth.signInWithPassword({
        email: authData.email,
        password: authData.password,
      })
      if (data.user !== null) {
        setUserhData({
          userEmail: data.user.email || '',
          userId: data.user.id,
          apartments: undefined,
        })
        router.push('/profile')
      }
      if (data.user === null) {
        setIsLoading(false)
        setAlert({
          ...alert,
          type: 'error',
          message: 'Login credentials are not correct!',
          visible: true,
        })
      }
      if (error) {
        setIsLoading(false)
        setAlert({
          ...alert,
          type: 'error',
          message: error.message,
          visible: true,
        })
      }
    } catch (error: any) {
      setAlert({
        ...alert,
        type: 'error',
        message: error.message,
        visible: true,
      })
    }
  }, [alert, authData.email, authData.password, setUserhData])

  useEffect(() => {
    if (alert.visible) {
      setTimeout(() => {
        setAlert({ ...alert, visible: false })
      }, 3000)
    }
  }, [alert])
  return (
    <>
      <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
        <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
          <Image
            width={40}
            style={{
              margin: 'auto',
              height: 'auto',
              width: 'auto',
            }}
            height={40}
            alt='Company logo'
            src={'/logo.jpeg'}
          ></Image>
          <h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
            Sign in to your account
          </h2>
        </div>

        <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm space-y-6'>
          <div>
            <label
              htmlFor='email'
              className='block text-sm font-medium leading-6 text-gray-900'
            >
              Email address
            </label>
            <div className='mt-2'>
              <input
                id='email'
                name='email'
                type='email'
                value={authData.email}
                onChange={(event) => {
                  setAuthData({
                    ...authData,
                    email: event.target.value,
                  })
                }}
                autoComplete='email'
                className='block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
              />
            </div>
          </div>

          <div>
            <div className='flex items-center justify-between'>
              <label
                htmlFor='password'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                Password
              </label>
            </div>
            <div className='mt-2 relative'>
              <input
                id='password'
                name='password'
                type={showPassword ? 'text' : 'password'}
                value={authData.password}
                onChange={(event) => {
                  setAuthData({
                    ...authData,
                    password: event.target.value,
                  })
                }}
                autoComplete='password'
                className='block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
              />
              <div
                className='absolute right-3 top-2.5 cursor-pointer'
                onClick={() => {
                  setShowPassword(!showPassword)
                }}
              >
                {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
              </div>
            </div>
          </div>

          <div>
            <button
              className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
              onClick={handleSingInClick}
            >
              {isLoading ? (
                <div className='h-5 w-5 '>
                  <Loader />
                </div>
              ) : (
                'Sign in'
              )}
            </button>
          </div>

          <div className='flex flex-row w-full justify-center items-center gap-1 mt-10 text-center text-sm text-gray-500'>
            Not a member?
            <p className='font-semibold leading-6 text-indigo-600 hover:text-indigo-500'>
              <Link href={'/signup'}>Sign up</Link>
            </p>
          </div>
          {alert.visible && (
            <AlertContainer type={alert.type} message={alert.message} />
          )}
        </div>
      </div>
    </>
  )
}

export default SigninPage
