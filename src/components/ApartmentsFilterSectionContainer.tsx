import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
} from 'react'
import AddNewApartmentModal from './AddNewApartmentModal'
import { ApartmentAttributes } from '@/shared/interfaces/ApartmentAttributes'
import { BsBuildingAdd } from 'react-icons/bs'
import { VscClearAll } from 'react-icons/vsc'
import Tooltip from './shared/TooltipTemplate'
import { IoSearchOutline } from 'react-icons/io5'
import { FilterAttributes } from '@/shared/interfaces/FilterAttributes'
import { initialFilterState } from '@/shared/constants/InitialFilterState'
import { supabase } from '../../supabase'
import AlertContainer from './shared/AlertContainer'
import dayjs from 'dayjs'
import { useRecoilValue } from 'recoil'
import { userDataState } from '@/shared/recoilStates/user-data.state'
import DropDownContainer from './shared/DropDownContainer'
import { FaDollarSign } from 'react-icons/fa'
import { allCitiesArray } from '@/shared/constants/CitiesArray'

type Props = {
  setApartmentsToDisplay: (value: ApartmentAttributes[]) => void
}

const ApartmentsFilterSectionContainer: FunctionComponent<Props> = ({
  setApartmentsToDisplay,
}) => {
  const userData = useRecoilValue(userDataState)
  const [shouldResetCity, setShouldResetCity] = useState(false)
  const [showAddNewApartmentModal, setShowAddNewApartmentModal] =
    useState(false)
  const [filterState, setFilterState] =
    useState<FilterAttributes>(initialFilterState)
  const [alert, setAlert] = useState({
    type: '',
    message: '',
    visible: false,
  })
  const handleApplyFilterClick = useCallback(async () => {
    try {
      let { data: apartments, error } = await supabase
        .from('apartments')
        .select('*, rooms(*)')
        .gte('price', filterState.from_price)
        .lte('price', filterState.to_price)
        .eq('city', filterState.city.toLowerCase())

      if (error) {
        setAlert({
          ...alert,
          type: 'error',
          message: 'Search failed',
          visible: true,
        })
      }
      if (apartments) {
        const apartments_array: ApartmentAttributes[] = apartments.map(
          (singleApartment) => {
            return {
              id: singleApartment.id,
              name: singleApartment.name,
              street: singleApartment.street,
              building_number: singleApartment.building_number,
              apartment_number: singleApartment.apartment_number,
              postal_code: singleApartment.postal_code,
              city: singleApartment.city,
              country: singleApartment.country,
              user_id: singleApartment.user_id,
              price: singleApartment.price,
              description: singleApartment.description,
              rooms: singleApartment.rooms,
              created_at: dayjs(singleApartment.created_at).format(
                'MMM D, YYYY'
              ),
            }
          }
        )
        setApartmentsToDisplay(apartments_array)
      }
    } catch (error: any) {
      setAlert({
        ...alert,
        type: 'error',
        message: error.message,
        visible: true,
      })
    }
  }, [alert, filterState, setApartmentsToDisplay])
  const handleResetFilterClick = useCallback(async () => {
    if (userData.apartments === undefined) return
    setFilterState(initialFilterState)
    setApartmentsToDisplay(userData.apartments)
    setShouldResetCity(true)
  }, [setApartmentsToDisplay, userData.apartments])

  useEffect(() => {
    if (alert.visible) {
      setTimeout(() => {
        setAlert({ ...alert, visible: false })
      }, 3000)
    }
  }, [alert])
  useEffect(() => {
    if (userData.apartments) {
      setFilterState(initialFilterState)
    }
  }, [userData.apartments])
  useEffect(() => {
    if (userData.apartments) {
      setFilterState(initialFilterState)
    }
  }, [userData.apartments])

  return (
    <div className='h-10 w-full flex items-center justify-between px-4 pt-2 gap-2'>
      <div className='flex flex-row gap-4 overflow-scroll w-full '>
        <div className='flex flex-row items-center gap-3'>
          <div className=' w-14 font-semibold'>City:</div>
          <div>
            <DropDownContainer
              onChoseClick={(item) => {
                setFilterState({
                  ...filterState,
                  city: item,
                })
              }}
              items={allCitiesArray.map((item) => item.city)}
              shouldResetValue={shouldResetCity}
              setShouldResetValue={setShouldResetCity}
            />
          </div>
          <div className='text-3xl '>|</div>
        </div>
        <div className='flex flex-row items-center gap-3'>
          <div className=' w-24 font-semibold'>Min price:</div>
          <input
            type='text'
            placeholder='EX : 10$'
            value={filterState.from_price}
            onChange={(event) => {
              if (
                event.target.value === '' ||
                /^[0-9\b]+$/.test(event.target.value)
              ) {
                setFilterState({
                  ...filterState,
                  from_price: event.target.value,
                })
              }
            }}
            className='border-b py-1 w-24  px-2 text-gray-900 shadow-sm placeholder:text-xl text-xl focus:outline-none'
          />
          <div className=' text-md lg:text-xl  mt.5 lg:mt-0.5'>
            <FaDollarSign />
          </div>
          <div className='text-3xl '>|</div>
        </div>
        <div className='flex flex-row items-center gap-3'>
          <div className=' w-24 font-semibold'>Max price:</div>
          <input
            type='text'
            placeholder='EX : 3000$'
            value={filterState.to_price}
            onChange={(event) => {
              if (
                event.target.value === '' ||
                /^[0-9\b]+$/.test(event.target.value)
              ) {
                setFilterState({
                  ...filterState,
                  to_price: event.target.value,
                })
              }
            }}
            className='border-b py-1 w-24 px-2 text-gray-900 shadow-sm placeholder:text-xl text-xl focus:outline-none'
          />
          <div className=' text-md lg:text-xl  mt.5 lg:mt-0.5'>
            <FaDollarSign />
          </div>
        </div>
      </div>
      <div className='flex gap-2'>
        <Tooltip text={'Apply filters'}>
          <button
            disabled={
              JSON.stringify(filterState) === JSON.stringify(initialFilterState)
            }
            className={`bg-gray-100 border-2 rounded-lg p-1 hover:text-blue-400 hover:border-blue-200 ${
              JSON.stringify(filterState) === JSON.stringify(initialFilterState)
                ? 'text-blue-400 border-blue-200'
                : 'border-blue-400 text-black'
            }`}
            onClick={handleApplyFilterClick}
          >
            <IoSearchOutline />
          </button>
        </Tooltip>
        <Tooltip text={'Reset filter'}>
          <button
            className='bg-gray-100 text-gray-700 border-2 rounded-lg p-1 border-red-400 hover:text-red-400 hover:border-red-240'
            onClick={handleResetFilterClick}
          >
            <VscClearAll />
          </button>
        </Tooltip>

        <Tooltip text={'Add new apartment'}>
          <button
            className='bg-gray-100 text-black border-2 rounded-lg p-1 border-blue-400 hover:text-blue-400 hover:text-white hover:border-blue-200'
            onClick={() => {
              setShowAddNewApartmentModal(true)
            }}
          >
            <BsBuildingAdd />
          </button>
        </Tooltip>
      </div>
      <AddNewApartmentModal
        showAddNewApartmentModal={showAddNewApartmentModal}
        setShowAddNewApartmentModal={setShowAddNewApartmentModal}
      />
      {alert.visible && (
        <div className='absolute left-1/2 bottom-1 transform -translate-x-1/2 w-96 z-30'>
          <AlertContainer type={alert.type} message={alert.message} />
        </div>
      )}
    </div>
  )
}

export default ApartmentsFilterSectionContainer
