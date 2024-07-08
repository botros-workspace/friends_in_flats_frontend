import React, { FunctionComponent } from 'react'
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react'

type Props = {
  message: string
  onDeleteConfirmClick: () => void
  showDeleteConfirmationModal: boolean
  setShowDeleteConfirmationModal: (value: boolean) => void
}
const DeleteConfirmationModal: FunctionComponent<Props> = ({
  message,
  onDeleteConfirmClick,
  showDeleteConfirmationModal,
  setShowDeleteConfirmationModal,
}) => {
  return (
    <Dialog
      className='relative z-10'
      open={showDeleteConfirmationModal}
      onClose={setShowDeleteConfirmationModal}
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
            <div className='flex w-full h-full justify-center p-4 font-semibold text-xl'>
              {message}
            </div>
            <div className='p-4 flex flex-row justify-center gap-4'>
              <div className='w-3/5'>
                <button
                  type='button'
                  className='flex w-full justify-center items-center rounded-md bg-red-700 px-3 py-2 text-sm font-semibold text-white shadow-lg shadow-red-500 hover:shadow-red-800 hover:bg-red-600'
                  onClick={onDeleteConfirmClick}
                >
                  Delete
                </button>
              </div>
              <div className='w-1/5 flex justify-center'>
                <button
                  type='button'
                  className='flex w-full justify-center items-center rounded-md bg-gray-700 px-3 py-2 text-sm font-semibold text-white shadow-lg shadow-gray-500 hover:shadow-gray-800 hover:bg-gray-600'
                  onClick={() => setShowDeleteConfirmationModal(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}

export default DeleteConfirmationModal
