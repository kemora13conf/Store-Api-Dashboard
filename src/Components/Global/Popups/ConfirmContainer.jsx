import React, { createContext, useContext, useEffect, useRef, useState } from 'react'
import { AppContext } from '../../../App'

const ConfirmContext = createContext()

const ConfirmProvider = ({ children }) => {
  const { language } = useContext(AppContext)
  const [confirm, confirmPrompt] = useState(undefined)
  const ref = useRef()
  useEffect(() => {
    ref.current.addEventListener('click', (e) => {
      if(e.target === ref.current){
        confirmPrompt(undefined)
      }
    })
  },[])
  return (
    <ConfirmContext.Provider value={{confirmPrompt}}>
      <div 
        ref={ref}
        className={`
              ${confirm ? 'fixed' : 'hidden'} flex justify-center items-center 
              bg-black bg-opacity-50 backdrop-blur-sm 
              absolute z-[3000] w-full min-h-screen top-0 left-0
          `}>
            {
              confirm && (
                <div className="bg-light-primary-500 dark:bg-dark-primary-500 rounded-md shadow-lg p-4">
                  <h1 className="text-lg font-semibold text-light-primary-50 dark:text-dark-primary-50">
                    {confirm.title}
                  </h1>
                  <p className="text-light-primary-50 dark:text-dark-primary-50">
                    {confirm.message}
                  </p>
                  <div className="flex gap-3 mt-3">
                    <button className="btn btn-primary" onClick={confirm.confirm}>
                      {confirm.confirmText}
                    </button>
                    <button className="btn btn-secondary" onClick={confirm.cancel}>
                      {confirm.cancelText}
                    </button>
                  </div>
                </div>
              )
            }

      </div>
      {children}
    </ConfirmContext.Provider>
  )
}
export default ConfirmProvider
export { ConfirmContext }
