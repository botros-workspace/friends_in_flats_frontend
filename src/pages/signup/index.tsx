/* eslint-disable react-hooks/exhaustive-deps */
import { NextPage } from 'next'
import React, { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import AlertContainer from '@/components/shared/AlertContainer'
import { supabase } from '../../../supabase'
import { useRouter } from 'next/router'
import { FaRegEyeSlash, FaRegEye } from 'react-icons/fa'
import Loader from '@/components/shared/Loader'
import Link from 'next/link'

interface AuthData {
  email: string
  password: string
  confirmPassword: string
}

const SignupPage: NextPage = () => {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [authData, setAuthData] = useState<AuthData>({
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [alert, setAlert] = useState({
    type: '',
    message: '',
    visible: false,
  })
  const handleSingUpClick = useCallback(async () => {
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
    if (authData.confirmPassword === '') {
      setAlert({
        ...alert,
        type: 'error',
        message: 'Confirm password field is required',
        visible: true,
      })
      return
    }
    if (authData.password !== authData.confirmPassword) {
      setAlert({
        ...alert,
        type: 'error',
        message: 'Password does not match',
        visible: true,
      })
      return
    }

    try {
      setIsLoading(true)
      let { data } = await supabase.auth.signUp({
        email: authData.email,
        password: authData.password,
      })

      if (data.user !== null) {
        router.push('/signin')
      } else {
        setIsLoading(false)
        setAlert({
          ...alert,
          type: 'error',
          message: 'Signing up was not successful!',
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
  }, [alert, authData])

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
            Create a new account
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
                required
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
                autoComplete='password'
                required
                value={authData.password}
                onChange={(event) => {
                  setAuthData({
                    ...authData,
                    password: event.target.value,
                  })
                }}
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
            <div className='flex items-center justify-between'>
              <label
                htmlFor='confirmPassword'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                Confirm password
              </label>
            </div>
            <div className='mt-2 relative'>
              <input
                id='confirmPassword'
                name='confirmPassword'
                type={showConfirmPassword ? 'text' : 'password'}
                value={authData.confirmPassword}
                onChange={(event) => {
                  setAuthData({
                    ...authData,
                    confirmPassword: event.target.value,
                  })
                }}
                required
                className='block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
              />
              <div
                className='absolute right-3 top-2.5 cursor-pointer'
                onClick={() => {
                  setShowConfirmPassword(!showConfirmPassword)
                }}
              >
                {showConfirmPassword ? <FaRegEyeSlash /> : <FaRegEye />}
              </div>
            </div>
          </div>

          <div>
            <button
              onClick={handleSingUpClick}
              className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
            >
              {isLoading ? (
                <div className='h-5 w-5 '>
                  <Loader />
                </div>
              ) : (
                ' Sign up'
              )}
            </button>
          </div>

          <p className='mt-10 text-center text-sm text-gray-500'>
            Already have an account? <Link href={'/signin'}>Sign in</Link>
          </p>
          {alert.visible && (
            <AlertContainer type={alert.type} message={alert.message} />
          )}
        </div>
      </div>
    </>
  )
}

export default SignupPage
