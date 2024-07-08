import { ApartmentAttributes } from '@/shared/interfaces/ApartmentAttributes'
import React, { FunctionComponent, useCallback, useState } from 'react'
import { FaDollarSign, FaRegEdit } from 'react-icons/fa'
import RoomsPreviewContainer from './RoomsPreviewContainer'
import { MdDriveFileRenameOutline, MdMyLocation } from 'react-icons/md'
import { BsCalendar2Date } from 'react-icons/bs'
import { GrLocation } from 'react-icons/gr'
import { TbFileDescription, TbFileTypeZip } from 'react-icons/tb'
import Tooltip from './shared/TooltipTemplate'
import { IoMdAdd } from 'react-icons/io'
import AddNewRoomModal from './AddNewRoomModal'
import { supabase } from '../../supabase'
import { RiDeleteBin5Line } from 'react-icons/ri'
import { useRecoilState } from 'recoil'
import { userDataState } from '@/shared/recoilStates/user-data.state'
import DeleteConfirmationModal from './shared/DeleteConfirmationModal'

type Props = {
  singleApartment: ApartmentAttributes
}
const SingleApartmentPreviewContainer: FunctionComponent<Props> = ({
  singleApartment,
}) => {
  const [showAddNewRoomModal, setShowAddNewRoomModal] = useState(false)
  const [showDeleteConfirmationModal, setShowDeleteConfirmationModal] =
    useState(false)
  const [userData, setUserData] = useRecoilState(userDataState)

  const handleDeleteClick = useCallback(async () => {
    if (userData.apartments === undefined) return
    const { error } = await supabase
      .from('apartments')
      .delete()
      .eq('id', singleApartment.id)
    if (error === null) {
      setUserData({
        ...userData,
        apartments: userData.apartments.filter(
          (apartment) => apartment.id !== singleApartment.id
        ),
      })
    }
    setShowDeleteConfirmationModal(false)
  }, [setUserData, singleApartment.id, userData])
  return (
    <div>
      <AddNewRoomModal
        showAddNewRoomModal={showAddNewRoomModal}
        setShowAddNewRoomModal={setShowAddNewRoomModal}
        apartment_id={singleApartment.id}
      />
      {showDeleteConfirmationModal && (
        <DeleteConfirmationModal
          message='Are you sure you want to delete this apartment?'
          onDeleteConfirmClick={handleDeleteClick}
          showDeleteConfirmationModal={showDeleteConfirmationModal}
          setShowDeleteConfirmationModal={setShowDeleteConfirmationModal}
        />
      )}
      <div className='flex flex-col bg-white rounded-lg gap-2 shadow-md w-80 md:w-96 border-gray-400 border-2'>
        <div className='h-72 w-full'>
          <RoomsPreviewContainer allRooms={singleApartment.rooms} />
        </div>

        <div className='px-4 flex flex-col gap-2 pb-3'>
          <h2 className='flex flex-row items-center gap-2 text-lg font-semibold justify-between'>
            {singleApartment.name}
            <div className='flex flex-row items-end justify-end gap-2'>
              <Tooltip text={'Add a new room'}>
                <button
                  className='bg-blue-500 text-white p-1 rounded-full w-8 h-8 items-center justify-center flex text-xl'
                  onClick={() => {
                    setShowAddNewRoomModal(true)
                  }}
                >
                  <IoMdAdd />
                </button>
              </Tooltip>
              <Tooltip text='Delete apartment'>
                <button
                  onClick={() => setShowDeleteConfirmationModal(true)}
                  className='bg-red-500 text-white p-1 rounded-full w-8 h-8 items-center justify-center flex text-xl'
                >
                  <RiDeleteBin5Line />
                </button>
              </Tooltip>
            </div>
          </h2>
          <div className='flex flex-row items-center gap-2 text-sm text-gray-500 capitalize'>
            <Tooltip text={'Address'}>
              <MdMyLocation />
            </Tooltip>
            {singleApartment.street} {singleApartment.building_number} /{' '}
            {singleApartment.apartment_number}
          </div>
          <div className='flex flex-row items-center gap-2 text-sm text-gray-500 capitalize'>
            <Tooltip text={'Postal code'}>
              <TbFileTypeZip />
            </Tooltip>
            {singleApartment.postal_code}
          </div>
          <div className='flex flex-row items-center gap-2 text-sm text-gray-500 capitalize'>
            <Tooltip text={'Location'}>
              <GrLocation />
            </Tooltip>
            {singleApartment.country}, {singleApartment.city}
          </div>

          <div className='flex flex-row items-center gap-2 text-sm text-gray-500 capitalize'>
            <Tooltip text={'Price'}>
              <FaDollarSign />
            </Tooltip>
            {singleApartment.price} / month
          </div>
          <span className='flex flex-row items-center gap-2 text-sm text-gray-500 capitalize'>
            <Tooltip text={'Created at'}>
              <BsCalendar2Date />
            </Tooltip>
            {singleApartment.created_at}
          </span>
          <div className='flex flex-row gap-2 text-gray-500 '>
            <Tooltip text={'Description'}>
              <div className='h-20'>
                <TbFileDescription />
              </div>
            </Tooltip>
            <p className='text-sm overflow-scroll w-96 h-20'>
              {singleApartment.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SingleApartmentPreviewContainer
