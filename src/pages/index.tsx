/* eslint-disable react-hooks/exhaustive-deps */
import { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { useRecoilValue } from 'recoil'
import { userDataState } from '@/shared/recoilStates/user-data.state'
import { useRouter } from 'next/router'
import Loader from '@/components/shared/Loader'

const LandingPage: NextPage = () => {
  const userAuthData = useRecoilValue(userDataState)
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (userAuthData.userId !== '' && userAuthData.userEmail !== '') {
      router.push('./profile')
    } else {
      setIsLoading(false)
    }
  }, [userAuthData.userEmail, userAuthData.userId])

  return (
    <div className='relative isolate px-6 pt-14 lg:px-8'>
      <div className='mx-auto max-w-2xl '>
        <div className=' sm:mb-8 flex justify-center'>
          <Image
            width={140}
            height={140}
            style={{
              height: '20%',
              width: '20%',
            }}
            alt='Company logo'
            src={'/logo.jpeg'}
          ></Image>
        </div>
        <div className='text-center'>
          <h1 className='text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl'>
            Welcome to Friends in flats
          </h1>
          <p className='mt-6 text-lg leading-8 text-gray-600'>
            Find the perfect match for your living space and compatible
            flatmates effortlessly.
          </p>
          <div className='w-full h-full flex items-center justify-center my-4'>
            {isLoading && (
              <div className='w-10 h-10'>
                <Loader />
              </div>
            )}
          </div>
          <div className=' flex items-center justify-center gap-x-6'>
            <a
              href='./signin'
              className='rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
            >
              Log in
            </a>
            <a
              href='./signup'
              className='text-sm font-semibold leading-6 text-gray-900'
            >
              Sign up <span aria-hidden='true'>→</span>
            </a>
          </div>
        </div>
      </div>
      <div
        className='absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]'
        aria-hidden='true'
      >
        <div
          className='relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]'
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            background: 'blue',
          }}
        />
      </div>
    </div>
  )
}

export default LandingPage
