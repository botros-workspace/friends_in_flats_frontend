import { RoomAttributes } from '@/shared/interfaces/RoomAttributes'
import React, { FunctionComponent, useState } from 'react'
import Image from 'next/image'
import { IoIosArrowDropleft, IoIosArrowDropright } from 'react-icons/io'
import { TbMaximize, TbMeterSquare, TbMinimize } from 'react-icons/tb'
import { roomEquipmentArray } from '@/shared/constants/EquipmentsArray'
import EquipmentImage from './shared/EquipmentImage'
import Tooltip from './shared/TooltipTemplate'
import EquipmentsContainerModal from './shared/EquipmentsContainerModal'
import { GrOverview } from 'react-icons/gr'

type Props = {
  allRooms: RoomAttributes[]
}
const RoomsPreviewContainer: FunctionComponent<Props> = ({ allRooms }) => {
  const [selectedRoomIndex, setSelectedRoomIndex] = useState<number>(0)
  const [showInfo, setShowInfo] = useState(true)
  const [showEquipmentsContainerModal, setShowEquipmentsContainerModal] =
    useState(false)
  const [isError, setIsError] = useState(false)
  if (allRooms && allRooms.length === 0) {
    return (
      <div className='h-full w-full bg-gray-200 rounded-t-lg flex items-center justify-center'>
        <div>No rooms registered in this apartment yet</div>
      </div>
    )
  }
  return (
    <div className='h-full w-full rounded-t-lg relative'>
      <div className='h-full w-full rounded-t-lg border-b-2 '>
        <div className='bg-gray-200 w-full h-full flex justify-center items-center rounded-t-md'>
          <Image
            src={
              isError
                ? '/image_error.avif'
                : allRooms[selectedRoomIndex]?.image_url
            }
            width={100}
            height={100}
            onError={() => setIsError(true)}
            style={{
              objectFit: 'contain',
              height: '100%',
              width: '100%',
              maxWidth: '100%',
              maxHeight: '100%',
              borderRadius: '2%',
            }}
            alt={'room image'}
          />
        </div>

        {showInfo && (
          <div className='flex flex-col absolute bottom-0 w-full px-2 bg-stone-300'>
            <div className='flex justify-between w-full '>
              <div className='text-lg font-semibold capitalize'>
                {allRooms[selectedRoomIndex].name}
              </div>
              <div className='text-lg flex flex-row font-semibold justify-center items-center'>
                {allRooms[selectedRoomIndex].size}
                <div className=' text-2xl lg:text-xl'>
                  <TbMeterSquare />
                </div>
                <div
                  onClick={(e) => {
                    e.stopPropagation()
                    setShowInfo(false)
                  }}
                  className='cursor-pointer text-blue-600 hover:text-blue-400'
                >
                  <TbMinimize />
                </div>
              </div>
            </div>
            <div className='flex flex-row gap-1 relative'>
              <div className='text-sm flex flex-row gap-1'>
                <div>{allRooms[selectedRoomIndex].equipments_array.length}</div>{' '}
                <div>
                  {allRooms[selectedRoomIndex].equipments_array.length === 1
                    ? 'Equipment: '
                    : 'Equipments: '}
                </div>
              </div>
              <div className='w-8/12 flex flex-row gap-2 overflow-scroll relative'>
                {allRooms[selectedRoomIndex].equipments_array.map(
                  (singleEquipment, index) => {
                    return (
                      <Tooltip
                        text={roomEquipmentArray[singleEquipment]}
                        key={singleEquipment}
                      >
                        <EquipmentImage
                          equipment={roomEquipmentArray[singleEquipment]}
                        />
                      </Tooltip>
                    )
                  }
                )}
              </div>
              <div>
                <div
                  onClick={() => setShowEquipmentsContainerModal(true)}
                  className=' cursor-pointer text-blue-400'
                >
                  <GrOverview />
                </div>
                {showEquipmentsContainerModal && (
                  <EquipmentsContainerModal
                    equipments={allRooms[selectedRoomIndex].equipments_array}
                    showEquipmentsContainerModal={showEquipmentsContainerModal}
                    setShowEquipmentsContainerModal={
                      setShowEquipmentsContainerModal
                    }
                  />
                )}
              </div>
            </div>
          </div>
        )}
        {!showInfo && (
          <div
            className='text-3xl cursor-pointer h-10 text-blue-600 hover:text-blue-400 w-8 bottom-0 absolute right-0 flex items-center'
            onClick={(e) => {
              e.stopPropagation()
              setShowInfo(true)
            }}
          >
            <TbMaximize />
          </div>
        )}

        <div className='text-sm h-10 text-blue-600 bg-white border border-blue-600 flex justify-center items-center rounded-xl min-w-10 h-4 w-8 top-1 absolute right-1 flex items-center'>
          {selectedRoomIndex + 1}/{allRooms.length}
        </div>

        {selectedRoomIndex !== 0 && (
          <div
            className='text-3xl absolute left-1 w-8 h-5/6 cursor-pointer text-blue-600 hover:text-blue-400 inset-0 flex items-center'
            onClick={() => {
              if (selectedRoomIndex > 0) {
                setIsError(false)
                setSelectedRoomIndex(selectedRoomIndex - 1)
              }
            }}
          >
            <IoIosArrowDropleft />
          </div>
        )}
        {selectedRoomIndex !== allRooms.length - 1 && (
          <div
            className='text-3xl cursor-pointer h-5/6 text-blue-600 hover:text-blue-400 w-8 absolute inset-y-0 right-1 flex items-center'
            onClick={() => {
              if (selectedRoomIndex < allRooms.length - 1) {
                setIsError(false)
                setSelectedRoomIndex(selectedRoomIndex + 1)
              }
            }}
          >
            <IoIosArrowDropright />
          </div>
        )}
      </div>
    </div>
  )
}

export default RoomsPreviewContainer
