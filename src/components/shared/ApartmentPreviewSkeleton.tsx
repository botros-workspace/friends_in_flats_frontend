import React, { FunctionComponent } from 'react'

const ApartmentPreviewSkeleton: FunctionComponent = () => {
  return (
    <div>
      <div className='rounded-lg overflow-hidden animate-pulse shadow-md w-80 md:w-96 border-gray-400 border-2'>
        <div className='h-72 w-full bg-gray-200'></div>
        <div className='p-4'>
          <div className='flex justify-between'>
            <div className='h-6 bg-gray-200 w-40 rounded'></div>
            <div className='flex flex-row gap-2'>
              <div className='h-8 bg-gray-200 w-8 rounded-full'></div>
              <div className='h-8 bg-gray-200 w-8 rounded-full'></div>
            </div>
          </div>
          <div className='pt-4 gap-4 flex flex-col w-full'>
            <div className='h-6 bg-gray-200 w-full rounded'></div>
            <div className='h-6 bg-gray-200 w-full rounded'></div>
            <div className='h-6 bg-gray-200 w-full rounded'></div>
            <div className='h-6 bg-gray-200 w-full rounded'></div>
            <div className='h-6 bg-gray-200 w-full rounded'></div>
            <div className='h-6 bg-gray-200 w-full rounded'></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ApartmentPreviewSkeleton
