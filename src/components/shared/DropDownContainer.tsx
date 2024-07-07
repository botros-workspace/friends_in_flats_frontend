import React, { FunctionComponent, useEffect, useRef, useState } from 'react'
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from 'react-icons/md'

type Props = {
  items: string[]
  onChoseClick: (value: string) => void
  shouldResetValue?: boolean
  setShouldResetValue?: (value: boolean) => void
}

const DropDownContainer: FunctionComponent<Props> = ({
  items,
  onChoseClick,
  shouldResetValue,
  setShouldResetValue,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [chosenItem, setChosenItem] = useState('Chose one')
  const menuRef = useRef<HTMLDivElement>(null)
  const filteredItems = items.filter((item) =>
    item.toLowerCase().includes(searchTerm.toLowerCase())
  )
  useEffect(() => {
    if (shouldResetValue && setShouldResetValue) {
      setChosenItem('Chose one')
      setShouldResetValue(false)
    }
  }, [setShouldResetValue, shouldResetValue])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        event.target &&
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className=' text-left w-full'>
      <div>
        <button
          type='button'
          className='flex items-center justify-center w-36 md:w-44 rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-gray-700 hover:bg-gray-50 focus:outline-none overflow-scroll h-10'
          onClick={() => setIsOpen(!isOpen)}
        >
          {chosenItem}
          <div className='-mr-1 ml-2 mt-2 h-4 w-4'>
            {isOpen ? (
              <MdOutlineKeyboardArrowUp />
            ) : (
              <MdOutlineKeyboardArrowDown />
            )}
          </div>
        </button>
      </div>

      {isOpen && (
        <div
          ref={menuRef}
          className='origin-top-right absolute right-auto mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 h-72 overflow-scroll z-50'
        >
          <div className='py-1'>
            <input
              type='text'
              className='block w-full px-4 py-2 text-sm text-gray-900 placeholder-gray-500 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
              placeholder='Search...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {filteredItems.map((item, index) => (
              <a
                key={index}
                onClick={() => {
                  setChosenItem(item)
                  onChoseClick(item)
                  setIsOpen(false)
                }}
                className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default DropDownContainer
