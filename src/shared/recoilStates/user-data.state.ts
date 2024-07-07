import { atom } from 'recoil'
import { userDataAttributes } from '../interfaces/UserDataAttributes'
import { recoilPersist } from 'recoil-persist'
const { persistAtom } = recoilPersist()

export const userDataState = atom<userDataAttributes>({
  key: 'userAuthData',
  default: {
    userId: '',
    userEmail: '',
    apartments: undefined,
  },
  effects_UNSTABLE: [persistAtom],
})
