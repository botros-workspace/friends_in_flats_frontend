import AllApartmentsContainer from '@/components/AllApartmentsContainer'
import { userDataState } from '@/shared/recoilStates/user-data.state'
import { NextPage } from 'next'
import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { supabase } from '../../../supabase'
import dayjs from 'dayjs'
import { ApartmentAttributes } from '@/shared/interfaces/ApartmentAttributes'
import ApartmentsFilterSectionContainer from '@/components/ApartmentsFilterSectionContainer'
import { useRouter } from 'next/router'

const ProfilePage: NextPage = () => {
  const [userData, setUserData] = useRecoilState(userDataState)
  const router = useRouter()
  const [apartmentsToDisplay, setApartmentsToDisplay] = useState<
    ApartmentAttributes[]
  >([])
  const [showFilterSection, setShowFilterSection] = useState(false)
  const fetchApartments = useCallback(async () => {
    try {
      let { data: apartments } = await supabase
        .from('apartments')
        .select('*, rooms(*)')
        .eq('user_id', userData.userId)
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
        setUserData({
          ...userData,
          apartments: apartments_array,
        })
        setApartmentsToDisplay(apartments_array)
      }
    } catch (error: any) {
      setUserData({
        ...userData,
        apartments: [],
      })
    }
  }, [setUserData, userData])

  useEffect(() => {
    if (userData.apartments === undefined) {
      fetchApartments()
    }
  }, [fetchApartments, userData.apartments])
  useEffect(() => {
    if (userData.apartments !== undefined) {
      setApartmentsToDisplay(userData.apartments)
    }
  }, [userData.apartments])
  useEffect(() => {
    if (userData.apartments?.length !== 0) {
      setShowFilterSection(true)
    }
  }, [userData.apartments])
  useLayoutEffect(() => {
    if (userData.userId === '' && userData.userEmail === '') {
      router.push('./')
    }
  }, [router, userData.userEmail, userData.userId])
  return (
    <div className='w-full h-full relative'>
      {showFilterSection && (
        <div>
          <ApartmentsFilterSectionContainer
            setApartmentsToDisplay={setApartmentsToDisplay}
          />
        </div>
      )}
      <div>
        <AllApartmentsContainer apartmentsToDisplay={apartmentsToDisplay} />
      </div>
    </div>
  )
}

export default ProfilePage
