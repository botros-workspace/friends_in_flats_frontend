import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
} from 'react'
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react'
import { ApartmentAttributes } from '@/shared/interfaces/ApartmentAttributes'
import { FaDollarSign } from 'react-icons/fa'
import AlertContainer from './shared/AlertContainer'
import { supabase } from '../../supabase'
import { useRecoilState } from 'recoil'
import { userDataState } from '@/shared/recoilStates/user-data.state'
import Loader from './shared/Loader'
import dayjs from 'dayjs'
import DropDownContainer from './shared/DropDownContainer'
import { allCountriesArray } from '@/shared/constants/CountriesArray'
import { allCitiesArray } from '@/shared/constants/CitiesArray'

type Props = {
  showAddNewApartmentModal: boolean
  setShowAddNewApartmentModal: (value: boolean) => void
}

const AddNewApartmentModal: FunctionComponent<Props> = ({
  showAddNewApartmentModal,
  setShowAddNewApartmentModal,
}) => {
  const [isLoading, setIsLoading] = useState(false)
  const [userData, setUserData] = useRecoilState(userDataState)
  const [newApartment, setNewApartment] = useState<ApartmentAttributes>({
    id: '',
    name: '',
    street: '',
    building_number: '',
    apartment_number: '',
    city: '',
    country: '',
    postal_code: '',
    price: '',
    user_id: '',
    description: '',
    rooms: [],
    created_at: '',
  })
  const [alert, setAlert] = useState({
    type: '',
    message: '',
    visible: false,
  })
  const handleSubmitNewApartmentClick = useCallback(async () => {
    if (newApartment.name === '') {
      setAlert({
        ...alert,
        type: 'error',
        message: 'Name field is required',
        visible: true,
      })
      return
    }
    if (newApartment.street === '') {
      setAlert({
        ...alert,
        type: 'error',
        message: 'Street field is required',
        visible: true,
      })
      return
    }
    if (newApartment.building_number === '') {
      setAlert({
        ...alert,
        type: 'error',
        message: 'Building number field is required',
        visible: true,
      })
      return
    }
    if (newApartment.apartment_number === '') {
      setAlert({
        ...alert,
        type: 'error',
        message: 'Apartment number field is required',
        visible: true,
      })
      return
    }
    if (newApartment.postal_code === '') {
      setAlert({
        ...alert,
        type: 'error',
        message: 'Postal code field is required',
        visible: true,
      })
      return
    }
    if (newApartment.country === '') {
      setAlert({
        ...alert,
        type: 'error',
        message: 'Country field is required',
        visible: true,
      })
      return
    }
    if (newApartment.city === '') {
      setAlert({
        ...alert,
        type: 'error',
        message: 'City field is required',
        visible: true,
      })
      return
    }
    if (newApartment.price === '') {
      setAlert({
        ...alert,
        type: 'error',
        message: 'Price field is required',
        visible: true,
      })
      return
    }
    if (newApartment.description === '') {
      setAlert({
        ...alert,
        type: 'error',
        message: 'Description field is required',
        visible: true,
      })
      return
    }
    try {
      setIsLoading(true)
      const { data, error } = await supabase
        .from('apartments')
        .insert([
          {
            user_id: userData.userId.toLowerCase(),
            name: newApartment.name.toLowerCase(),
            street: newApartment.street.toLowerCase(),
            building_number: newApartment.building_number.toLowerCase(),
            apartment_number: newApartment.apartment_number.toLowerCase(),
            city: newApartment.city.toLowerCase(),
            country: newApartment.country.toLowerCase(),
            postal_code: newApartment.postal_code.toLowerCase(),
            description: newApartment.description.toLowerCase(),
            price: newApartment.price,
          },
        ])
        .select()
      if (data) {
        const apartment: ApartmentAttributes = {
          id: data[0].id,
          name: data[0].name,
          street: data[0].street,
          building_number: data[0].building_number,
          apartment_number: data[0].apartment_number,
          city: data[0].city,
          country: data[0].country,
          postal_code: data[0].postal_code,
          user_id: data[0].user_id,
          price: data[0].price,
          description: data[0].description,
          rooms: [],
          created_at: dayjs(data[0].created_at).format('MMM D, YYYY'),
        }
        if (userData.apartments === undefined) {
          setUserData({
            ...userData,
            apartments: [apartment],
          })
        } else {
          setUserData({
            ...userData,
            apartments: [...userData.apartments, apartment],
          })
        }
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
      setShowAddNewApartmentModal(false)
    }
  }, [
    alert,
    newApartment.apartment_number,
    newApartment.building_number,
    newApartment.city,
    newApartment.country,
    newApartment.description,
    newApartment.name,
    newApartment.postal_code,
    newApartment.price,
    newApartment.street,
    setShowAddNewApartmentModal,
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
    if (showAddNewApartmentModal) {
      setNewApartment({
        id: '',
        name: '',
        street: '',
        building_number: '',
        apartment_number: '',
        city: '',
        country: '',
        postal_code: '',
        price: '',
        user_id: '',
        description: '',
        rooms: [],
        created_at: '',
      })
    }
  }, [showAddNewApartmentModal])

  return (
    <Dialog
      className='relative z-10'
      open={showAddNewApartmentModal}
      onClose={setShowAddNewApartmentModal}
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
            className='relative transform overflow-hidden p-10 rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95 absolute top-0 left-0 right-0'
          >
            <div className='flex gap-2 flex-col text-xs'>
              <div>
                <label
                  htmlFor='apartment_name'
                  className='block text-xs font-medium leading-6 text-gray-900'
                >
                  Name:
                </label>
                <div className='mt'>
                  <input
                    id='apartment_name'
                    name='apartment_name'
                    type='text'
                    placeholder='EX : Family apartment'
                    value={newApartment.name}
                    onChange={(event) => {
                      setNewApartment({
                        ...newApartment,
                        name: event.target.value,
                      })
                    }}
                    className='block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-xs sm:leading-6'
                  />
                </div>
              </div>
              <div className='flex gap-2 flex-col'>
                <div className='w-full'>
                  <label
                    htmlFor='apartment_street'
                    className='block text-xs font-medium leading-6 text-gray-900'
                  >
                    Street:
                  </label>
                  <div className='mt'>
                    <input
                      id='apartment_street'
                      name='apartment_street'
                      type='text'
                      placeholder='EX : Auenbruggergasse'
                      value={newApartment.street}
                      onChange={(event) => {
                        setNewApartment({
                          ...newApartment,
                          street: event.target.value,
                        })
                      }}
                      className='block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-xs sm:leading-6'
                    />
                  </div>
                </div>
                <div className='w-full flex flex-row gap-2'>
                  <div>
                    <label
                      htmlFor='building_number'
                      className='block text-xs font-medium leading-6 text-gray-900'
                    >
                      Building number:
                    </label>
                    <div className='mt'>
                      <input
                        id='building_number'
                        name='building_number'
                        type='text'
                        placeholder='EX : 3A'
                        value={newApartment.building_number}
                        onChange={(event) => {
                          setNewApartment({
                            ...newApartment,
                            building_number: event.target.value,
                          })
                        }}
                        className='block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-xs sm:leading-6'
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor='apartment_number'
                      className='block text-xs font-medium leading-6 text-gray-900'
                    >
                      Apartment number:
                    </label>
                    <div className='mt'>
                      <input
                        id='apartment_number'
                        name='apartment_number'
                        type='text'
                        placeholder='EX : 5'
                        value={newApartment.apartment_number}
                        onChange={(event) => {
                          setNewApartment({
                            ...newApartment,
                            apartment_number: event.target.value,
                          })
                        }}
                        className='block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-xs sm:leading-6'
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor='apartment_postal_code'
                      className='block text-xs font-medium leading-6 text-gray-900'
                    >
                      Postal / zip code:
                    </label>
                    <div className='mt'>
                      <input
                        id='apartment_postal_code'
                        name='apartment_postal_code'
                        type='text'
                        placeholder='EX : 1030'
                        value={newApartment.postal_code}
                        onChange={(event) => {
                          setNewApartment({
                            ...newApartment,
                            postal_code: event.target.value,
                          })
                        }}
                        className='block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-xs sm:leading-6'
                      />
                    </div>
                  </div>
                </div>
                <div className='flex w-full gap-2'>
                  <div className='w-1/2'>
                    <div className='block text-xs font-medium leading-6 text-gray-900'>
                      Country:
                    </div>
                    <div className='mt'>
                      <DropDownContainer
                        onChoseClick={(item) => {
                          setNewApartment({
                            ...newApartment,
                            country: item,
                          })
                        }}
                        items={allCountriesArray}
                      />
                    </div>
                  </div>
                  <div className='w-1/2'>
                    <div className='block text-xs font-medium leading-6 text-gray-900'>
                      City:
                    </div>
                    <div className='mt'>
                      <DropDownContainer
                        onChoseClick={(item) => {
                          setNewApartment({
                            ...newApartment,
                            city: item,
                          })
                        }}
                        items={allCitiesArray
                          .filter(
                            (item) => item.country === newApartment.country
                          )
                          .map((i) => i.city)}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <label
                  htmlFor='apartment_price'
                  className='block text-xs font-medium leading-6 text-gray-900'
                >
                  Prise per month:
                </label>
                <div className='flex flex-row align-center mt gap-4'>
                  <input
                    id='apartment_price'
                    name='apartment_price'
                    type='text'
                    placeholder='450$ / month'
                    value={newApartment.price}
                    onChange={(event) => {
                      if (
                        event.target.value === '' ||
                        /^[0-9\b]+$/.test(event.target.value)
                      ) {
                        setNewApartment({
                          ...newApartment,
                          price: event.target.value,
                        })
                      }
                    }}
                    className='block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-xs sm:leading-6'
                  />
                  <div className=' text-2xl lg:text-3xl  mt.5 lg:mt-0.5'>
                    <FaDollarSign />
                  </div>
                </div>
              </div>
              <div>
                <label
                  htmlFor='apartment_description'
                  className='block text-xs font-medium leading-6 text-gray-900'
                >
                  Description:
                </label>
                <div className='mt'>
                  <textarea
                    id='apartment_description'
                    name='apartment_description'
                    placeholder='EX : Great apartment for a small family of 3 people....'
                    value={newApartment.description}
                    onChange={(event) => {
                      setNewApartment({
                        ...newApartment,
                        description: event.target.value,
                      })
                    }}
                    className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-48 resize-none'
                  />
                </div>
              </div>
            </div>
            <div className=' flex gap-4 lg:gap-1 flex-col  px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6'>
              <button
                type='button'
                className='inline-flex w-full justify-center rounded-md bg-gray-300 px-3 py-2 text-xs font-semibold text-gray-900 shadow-sm  sm:ml-3 sm:w-auto hover:bg-gray-500 hover:text-gray-100'
                onClick={handleSubmitNewApartmentClick}
                data-autofocus
              >
                {isLoading ? (
                  <div className='h-5 w-5 '>
                    <Loader />
                  </div>
                ) : (
                  'Confirm'
                )}
              </button>
              <button
                type='button'
                className='flex w-auto justify-center items-center rounded-md bg-red-700 px-3 py-2 text-sm font-semibold text-white shadow-lg shadow-red-500 hover:shadow-red-800 hover:bg-red-600'
                onClick={() => setShowAddNewApartmentModal(false)}
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

export default AddNewApartmentModal
