import React, { FunctionComponent, useEffect, useState } from 'react'
import AddNewApartmentModal from './AddNewApartmentModal'
import { ApartmentAttributes } from '@/shared/interfaces/ApartmentAttributes'
import SingleApartmentPreviewContainer from './SingleApartmentPreviewContainer'
import { useRecoilValue } from 'recoil'
import { userDataState } from '@/shared/recoilStates/user-data.state'

type Props = {
  apartmentsToDisplay: ApartmentAttributes[]
}

const AllApartmentsContainer: FunctionComponent<Props> = ({
  apartmentsToDisplay,
}) => {
  const userData = useRecoilValue(userDataState)
  const [showAddNewApartmentModal, setShowAddNewApartmentModal] =
    useState(false)
  const [showAddNewApartmentButton, setShowAddNewApartmentButton] =
    useState(false)
  useEffect(() => {
    if (userData.apartments?.length === 0) {
      setShowAddNewApartmentButton(true)
    }
  }, [userData.apartments?.length])
  if (apartmentsToDisplay.length === 0) {
    return (
      <div className=' w-full h-96 flex flex-col gap-3 justify-center items-center '>
        <div className='text-center text-2xl font-bold'>
          No Apartments to display
        </div>
        {showAddNewApartmentButton && (
          <>
            <button
              className='bg-gray-300 text-gray-700 border-2 rounded-lg p-2 border-blue-400 hover:bg-blue-400 hover:text-white hover:border-gray-300'
              onClick={() => {
                setShowAddNewApartmentModal(true)
              }}
            >
              Add new apartment
            </button>
            <AddNewApartmentModal
              showAddNewApartmentModal={showAddNewApartmentModal}
              setShowAddNewApartmentModal={setShowAddNewApartmentModal}
            />
          </>
        )}
      </div>
    )
  }
  return (
    <div className='flex flex-wrap w-full h-full pt-5 pb-10 px-10 gap-8 justify-center'>
      {apartmentsToDisplay.map((singleApartment, index) => (
        <SingleApartmentPreviewContainer
          key={index}
          singleApartment={singleApartment}
        />
      ))}
    </div>
  )
}

export default AllApartmentsContainer
