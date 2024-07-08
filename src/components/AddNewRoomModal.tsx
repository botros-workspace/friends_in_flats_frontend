import React, {
  ChangeEvent,
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
} from 'react'
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react'
import { RoomAttributes } from '@/shared/interfaces/RoomAttributes'
import Image from 'next/image'
import { RiDeleteBin5Line } from 'react-icons/ri'
import { TbMeterSquare } from 'react-icons/tb'
import { roomEquipmentArray } from '@/shared/constants/EquipmentsArray'
import EquipmentImage from './shared/EquipmentImage'
import AlertContainer from './shared/AlertContainer'
import { supabase } from '../../supabase'
import { useRecoilState } from 'recoil'
import { userDataState } from '@/shared/recoilStates/user-data.state'
import Loader from './shared/Loader'

type Props = {
  showAddNewRoomModal: boolean
  setShowAddNewRoomModal: (value: boolean) => void
  apartment_id: string
}

const AddNewRoomModal: FunctionComponent<Props> = ({
  showAddNewRoomModal,
  setShowAddNewRoomModal,
  apartment_id,
}) => {
  const [isLoading, setIsLoading] = useState(false)
  const [isImageLoading, setIsImageLoading] = useState(false)
  const [userData, setUserData] = useRecoilState(userDataState)
  const [showEquipments, setShowEquipments] = useState<boolean>(false)
  const [isError, setIsError] = useState(false)
  const [newRoom, setNewRoom] = useState<RoomAttributes>({
    id: '',
    apartment_id: '',
    name: '',
    size: '',
    equipments_array: [],
    image_url: '',
    created_at: '',
  })
  const [alert, setAlert] = useState({
    type: '',
    message: '',
    visible: false,
  })

  const handleImageChange = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
        setIsError(false)
        setIsImageLoading(true)
        const date = Date.now()
        try {
          const { data, error } = await supabase.storage
            .from('roomsImages')
            .upload(`roomImage_${apartment_id}_${date}`, e.target.files[0])
          if (error) {
            setAlert({
              ...alert,
              type: 'error',
              message: 'Image uploading failed!',
              visible: true,
            })
          }
          if (data) {
            const { data: publicUrl } = supabase.storage
              .from('roomsImages')
              .getPublicUrl(`roomImage_${apartment_id}_${date}`)

            if (publicUrl) {
              setNewRoom({
                ...newRoom,
                image_url: publicUrl.publicUrl,
              })
            }
          }
        } catch (error: any) {
          setAlert({
            ...alert,
            type: 'error',
            message: error.message,
            visible: true,
          })
        }
      }
    },
    [alert, apartment_id, newRoom]
  )
  const handleRoomSubmitClick = useCallback(async () => {
    if (userData.apartments === undefined) return
    setIsLoading(true)
    if (newRoom.name === '') {
      setAlert({
        ...alert,
        type: 'error',
        message: 'Room name field is required',
        visible: true,
      })
      return
    }
    if (newRoom.image_url === '') {
      setAlert({
        ...alert,
        type: 'error',
        message: 'Room image field is required',
        visible: true,
      })
      return
    }
    if (newRoom.equipments_array.length === 0) {
      setAlert({
        ...alert,
        type: 'error',
        message: 'Chose at least one equipment',
        visible: true,
      })
      return
    }
    if (newRoom.size === undefined || newRoom.size === '') {
      setAlert({
        ...alert,
        type: 'error',
        message: 'Room size field is required',
        visible: true,
      })
      return
    }
    try {
      const { data, error } = await supabase
        .from('rooms')
        .insert([
          {
            apartment_id: apartment_id,
            name: newRoom.name,
            size: newRoom.size,
            image_url: newRoom.image_url,
            equipments_array: newRoom.equipments_array,
          },
        ])
        .select()
      if (data) {
        setUserData({
          ...userData,
          apartments: userData.apartments.map((singleApartment) => {
            if (singleApartment.id === data[0].apartment_id) {
              return {
                ...singleApartment,
                rooms: [...singleApartment.rooms, data[0]],
              }
            }
            return singleApartment
          }),
        })
      }
      if (error) {
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
    } finally {
      setIsLoading(false)
      setShowAddNewRoomModal(false)
    }
  }, [
    alert,
    apartment_id,
    newRoom.equipments_array,
    newRoom.name,
    newRoom.image_url,
    newRoom.size,
    setShowAddNewRoomModal,
    setUserData,
    userData,
  ])

  useEffect(() => {
    if (alert.visible) {
      setTimeout(() => {
        setAlert({ ...alert, visible: false })
      }, 3000)
    }
  }, [alert])

  useEffect(() => {
    if (showAddNewRoomModal) {
      setNewRoom({
        id: '',
        apartment_id: '',
        name: '',
        size: '',
        equipments_array: [],
        image_url: '',
        created_at: '',
      })
      setShowEquipments(false)
    }
  }, [showAddNewRoomModal])
  return (
    <Dialog
      className='relative z-10'
      open={showAddNewRoomModal}
      onClose={setShowAddNewRoomModal}
    >
      <DialogBackdrop
        transition
        className='fixed inset-0 bg-gray-500 bg-opacity-50 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in'
      />

      <div className='fixed inset-0 z-10 w-screen overflow-y-auto'>
        {alert.visible && (
          <div className='absolute left-1/2 bottom-1 transform -translate-x-1/2 w-96 z-30'>
            <AlertContainer type={alert.type} message={alert.message} />
          </div>
        )}
        <div className='flex min-h-full items-end justify-center p-4 text-center sm:items-center relative top-0 sm:p-0'>
          <DialogPanel
            transition
            className='relative transform overflow-hidden w-full  rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95 absolute top-0 left-0 right-0'
          >
            <div className='flex gap-4 flex-col'>
              <div className='w-full h-full flex flex-col justify-center items-center'>
                {newRoom.image_url ? (
                  <div className='flex flex-col justify-center items-center h-96 pt-4 w-full relative '>
                    <Image
                      src={isError ? '/image_error.avif' : newRoom.image_url}
                      width={150}
                      height={150}
                      style={{
                        objectFit: 'contain',
                        height: 'auto',
                        width: 'auto',
                        maxWidth: '100%',
                        maxHeight: '100%',
                        borderRadius: '2%',
                      }}
                      alt={newRoom.image_url}
                      onLoad={() => setIsImageLoading(false)}
                      onError={() => setIsError(true)}
                    />
                    <button
                      onClick={() => {
                        setNewRoom({
                          ...newRoom,
                          image_url: '',
                        })
                      }}
                      className='mt-4 px-4 py-2 text-red-600 text-4xl rounded hover:text-red-400 absolute top-0 right-2'
                    >
                      <RiDeleteBin5Line />
                    </button>
                  </div>
                ) : (
                  <div className='h-96 w-96 flex justify-center items-center'>
                    {isImageLoading ? (
                      <div className='w-1/2 h-1/2'>
                        <Loader />
                      </div>
                    ) : (
                      <label className='cursor-pointer flex flex-col items-center inline-block rounded '>
                        <Image
                          src={'/image_placeholder.avif'}
                          width={100}
                          height={100}
                          style={{
                            objectFit: 'contain',
                            height: '100%',
                            width: '100%',
                            maxWidth: '100%',
                            maxHeight: '100%',
                            borderTopRightRadius: 'md',
                            borderTopLeftRadius: 'md',
                          }}
                          alt={'place holder'}
                        />
                        <div className='bg-blue-400 px-3 py-2 rounded-lg text-white hover:bg-blue-300 hover:text-gray-700'>
                          Select image
                        </div>
                        <input
                          type='file'
                          accept='image/*'
                          className='hidden'
                          onChange={handleImageChange}
                        />
                      </label>
                    )}
                  </div>
                )}
              </div>
              <div className='px-6 pb-6 flex gap-4 flex-col'>
                <div>
                  <label
                    htmlFor='apartment_name'
                    className='block text-sm font-medium leading-6 text-gray-900'
                  >
                    Name:
                  </label>
                  <div className='mt-2'>
                    <input
                      id='apartment_name'
                      name='apartment_name'
                      type='text'
                      placeholder='EX : Living room'
                      value={newRoom.name}
                      onChange={(event) => {
                        setNewRoom({
                          ...newRoom,
                          name: event.target.value,
                        })
                      }}
                      className='block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor='apartment_price'
                    className='block text-sm font-medium leading-6 text-gray-900'
                  >
                    Room size:
                  </label>
                  <div className='flex flex-row align-center mt-2 gap-4'>
                    <input
                      id='apartment_price'
                      name='apartment_price'
                      type='text'
                      placeholder='20 square meter'
                      value={newRoom.size}
                      onChange={(event) => {
                        if (
                          event.target.value === '' ||
                          /^[0-9\b]+$/.test(event.target.value)
                        ) {
                          setNewRoom({
                            ...newRoom,
                            size: event.target.value,
                          })
                        }
                      }}
                      className='block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                    />
                    <div className=' text-2xl lg:text-3xl  mt-1.5 lg:mt-0.5'>
                      <TbMeterSquare />
                    </div>
                  </div>
                </div>
                <div>
                  <label
                    htmlFor='apartment_price'
                    className='block text-sm flex flex-row justify-between font-medium leading-6 text-gray-900'
                  >
                    <div> Equipments:</div>
                    <div className='flex flex-row gap-2'>
                      <div className='text-blue-500 border-2 px-2 rounded-lg w-36 flex items-center justify-center'>
                        {newRoom.equipments_array.length}{' '}
                        {newRoom.equipments_array.length === 1
                          ? 'item'
                          : 'items'}{' '}
                        chosen
                      </div>
                      <div>
                        <button
                          onClick={() => setShowEquipments(!showEquipments)}
                          className='text-blue-500 hover:text-white hover:bg-gray-400 border-2 px-2 rounded-lg w-20'
                        >
                          {showEquipments ? 'Hide' : 'Show all'}
                        </button>
                      </div>
                    </div>
                  </label>
                  <div
                    className={`flex flex-row items-center justify-center mt-2 gap-4 pb-6 ${
                      showEquipments ? 'h-24' : ''
                    } overflow-scroll flex-wrap`}
                  >
                    {showEquipments &&
                      roomEquipmentArray.map((singleEquipment, index) => {
                        return (
                          <div
                            key={index}
                            className={
                              newRoom.equipments_array.includes(index)
                                ? 'h-16 w-24 text-xs border-2 border-green-300 flex flex-col items-center justify-center cursor-pointer bg-white rounded-lg gap-2 shadow-md shadow-green-300 '
                                : 'h-16 w-24 text-xs border-2 flex flex-col items-center justify-center cursor-pointer bg-white rounded-lg gap-2 shadow-md'
                            }
                            onClick={() => {
                              if (newRoom.equipments_array.includes(index)) {
                                setNewRoom({
                                  ...newRoom,
                                  equipments_array:
                                    newRoom.equipments_array.filter(
                                      (equipment) => equipment !== index
                                    ),
                                })
                              } else {
                                setNewRoom({
                                  ...newRoom,
                                  equipments_array: [
                                    ...newRoom.equipments_array,
                                    index,
                                  ],
                                })
                              }
                            }}
                          >
                            <div className='text-3xl'>
                              <EquipmentImage equipment={singleEquipment} />
                            </div>
                            <div className={'text-blue-400 capitalize'}>
                              {singleEquipment}
                            </div>
                          </div>
                        )
                      })}
                  </div>
                </div>
              </div>
            </div>
            <div className=' flex gap-4 lg:gap-1 flex-col  px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6'>
              <button
                type='button'
                className='flex w-full sm:w-auto justify-center items-center rounded-md bg-gray-700 px-3 py-2 text-sm font-semibold text-white shadow-lg shadow-gray-500 hover:shadow-gray-800 hover:bg-gray-600'
                onClick={handleRoomSubmitClick}
                data-autofocus
              >
                {isLoading ? (
                  <div className='w-4 h-4'>
                    <Loader />
                  </div>
                ) : (
                  'Confirm'
                )}
              </button>
              <button
                type='button'
                className='flex w-auto justify-center items-center rounded-md bg-red-700 px-3 py-2 text-sm font-semibold text-white shadow-lg shadow-red-500 hover:shadow-red-800 hover:bg-red-600'
                onClick={() => setShowAddNewRoomModal(false)}
              >
                Cancel
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}

export default AddNewRoomModal
