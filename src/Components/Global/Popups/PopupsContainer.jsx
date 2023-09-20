import React, { createContext, useContext, useEffect, useRef, useState } from 'react'
import { AppContext } from '../../../App'
import ConfirmAlert from './ConfirmAlert'
import { AnimatePresence } from 'framer-motion'

const PopupsContext = createContext()

const PopupsProvider = ({ children }) => {
  const { language } = useContext(AppContext)

  // state for the confirm popup
  const [confirm, setConfirm] = useState(undefined)

  // state for the alert popup

  // ref to the container
  const ref = useRef()
  useEffect(() => {
    ref.current.addEventListener('click', (e) => {
      if(e.target === ref.current){
        setConfirm(undefined)
      }
    })
  },[])
  return (
    <PopupsContext.Provider value={{setConfirm}}>
      <div 
        ref={ref}
        className={`
              flex justify-center items-center 
              ${confirm != undefined ? 'bg-light-primary-500 bg-opacity-20 backdrop-blur-md' : 'bg-transparent pointer-events-none'} 
              fixed z-[3000] w-full min-h-screen top-0 left-0
              transition-all duration-300
          `}>
            <AnimatePresence mode='wait'>
              {
                confirm != undefined && (
                  <ConfirmAlert confirm={confirm} />
                )
              }
            </AnimatePresence>

      </div>
      {children}
    </PopupsContext.Provider>
  )
}
export default PopupsProvider
export { PopupsContext }
