import React, { FunctionComponent, useState } from 'react'

type Props = {
  children: React.ReactNode
  text: string
}
const Tooltip: FunctionComponent<Props> = ({ children, text }) => {
  const [visible, setVisible] = useState(false)

  return (
    <div
      className='relative cursor-pointer '
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      {visible && (
        <div className='capitalize absolute bottom-full mb-2 -right-5 w-max px-2 py-1 bg-gray-700 text-white text-sm rounded'>
          {text}
        </div>
      )}
    </div>
  )
}

export default Tooltip
