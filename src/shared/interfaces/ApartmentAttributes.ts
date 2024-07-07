import { RoomAttributes } from './RoomAttributes'

export interface ApartmentAttributes {
  id: string
  name: string
  street: string
  building_number: string
  apartment_number: string
  city: string
  country: string
  postal_code: string
  price: string
  description: string
  user_id: string
  rooms: RoomAttributes[]
  created_at: string
}
