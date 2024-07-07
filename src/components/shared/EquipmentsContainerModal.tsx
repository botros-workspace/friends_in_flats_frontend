import React, { FunctionComponent } from 'react'
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react'
import EquipmentImage from './EquipmentImage'
import { roomEquipmentArray } from '@/shared/constants/EquipmentsArray'

type Props = {
  equipments: number[]
  showEquipmentsContainerModal: boolean
  setShowEquipmentsContainerModal: (value: boolean) => void
}

const EquipmentsContainerModal: FunctionComponent<Props> = ({
  equipments,
  showEquipmentsContainerModal,
  setShowEquipmentsContainerModal,
}) => {
  return (
    <Dialog
      className='relative z-10'
      open={showEquipmentsContainerModal}
      onClose={setShowEquipmentsContainerModal}
    >
      <DialogBackdrop
        transition
        className='fixed inset-0 bg-gray-500 bg-opacity-50 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in'
      />

      <div className='fixed inset-0 z-10 w-screen overflow-y-auto'>
        <div className='flex min-h-full items-end justify-center p-4 text-center sm:items-center relative top-0 sm:p-0'>
          <DialogPanel
            transition
            className='relative transform overflow-hidden w-full  rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95 absolute top-0 left-0 right-0'
          >
            <div>
              <div className='w-full flex justify-center items-center gap-4 min-h-72 flex-wrap py-6'>
                {equipments.map((singleEquipment, index) => {
                  return (
                    <div
                      key={index}
                      className={
                        'h-16 w-24 text-xs border-2 flex flex-col items-center justify-center bg-white rounded-lg gap-2 shadow-md'
                      }
                    >
                      <div className='text-3xl'>
                        <EquipmentImage
                          equipment={roomEquipmentArray[singleEquipment]}
                        />
                      </div>
                      <div className={'text-blue-400 capitalize'}>
                        {roomEquipmentArray[singleEquipment]}
                      </div>
                    </div>
                  )
                })}
              </div>
              <div className='w-full flex justify-center py-4'>
                <button
                  type='button'
                  className='flex w-72 justify-center items-center rounded-md bg-red-700 px-3 py-2 text-sm font-semibold text-white shadow-lg shadow-red-500 hover:shadow-red-800 hover:bg-red-600'
                  onClick={() => setShowEquipmentsContainerModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}

export default EquipmentsContainerModal
