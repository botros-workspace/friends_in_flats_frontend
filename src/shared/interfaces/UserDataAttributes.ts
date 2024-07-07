import { ApartmentAttributes } from './ApartmentAttributes'

export interface userDataAttributes {
  userId: string
  userEmail: string
  apartments: ApartmentAttributes[] | undefined
}
