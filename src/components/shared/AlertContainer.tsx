import React, { FunctionComponent } from 'react'
type Props = {
  type: string
  message: string
}
const AlertContainer: FunctionComponent<Props> = ({ type, message }) => {
  const alertStyles: { [key: string]: string } = {
    success: 'bg-green-100 border-green-400 text-green-700',
    error: 'bg-red-100 border-red-400 text-red-700',
    warning: 'bg-yellow-100 border-yellow-400 text-yellow-700',
    info: 'bg-blue-100 border-blue-400 text-blue-700',
  }

  return (
    <div
      className={`border-l-4 p-4 ${alertStyles[type]} rounded-lg z-30`}
      role='alert'
    >
      <div className='flex justify-center items-center z-30'>
        <span>{message}</span>
      </div>
    </div>
  )
}

export default AlertContainer
