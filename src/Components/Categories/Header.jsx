import React, { useContext } from 'react'
import { AppContext } from '../../App';
import MyLink from '../Global/MyLink';
import { AnimatePresence, anticipate, motion } from 'framer-motion';

function Header({
    checkedItems,
    setIsFormOpen,
    setOpenedId
  }) {
  const { language } = useContext(AppContext);
  const deleteMany = () => {
  }
  return (
    <div className="
          w-full @container/head
          bg-light-secondary-500 dark:bg-dark-primary-700
          px-4 py-3 rounded-md dakr:shadow-dark shadow-light
        ">
      <div className="w-full flex items-center justify-between gap-2 flex-col @[500px]/head:flex-row">
        <h1 className="text-2xl font-bold text-dark-primary-500 dark:text-light-primary-500 mr-auto">{language.categories}</h1>
        <div className="w-full flex gap-3 justify-end">
          <AnimatePresence>
            {
              checkedItems?.length != 0 && (
                <motion.button
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ ease: 'linear', duration: 0.2 }}
                  exit={{ opacity: 0, y: -20 }}
                  key="add"
                  onClick={deleteMany}
                  disabled={checkedItems?.length == 0}
                  className="
                      flex items-center justify-center px-4 gap-2 py-2 rounded-md border-[1.5px] border-error  dark:border-dark-primary-300
                      hover:bg-error hover:text-light-secondary-200 hover:border-transparent text-error dark:hover:border-transparent
                      transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:scale-90"
                >
                  <i className="fas fa-trash"></i> 
                  {language.delete}
                </motion.button>
              )
            }
          </AnimatePresence>
          <button
            onClick={() => {
              setOpenedId(undefined)
              setIsFormOpen(true)
            }}
            className="
                flex items-center justify-center px-4 pl-2 gap-2 py-2 rounded-md border-[1.5px] border-light-quarternary-300 dark:border-dark-primary-300
                hover:bg-info hover:text-light-secondary-200 
                text-light-quarternary-500 dark:text-dark-quarternary-500
                hover:border-transparent dark:hover:border-transparent
                transition-all duration-200
              ">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 00-1 1v5H4a1 1 0 100 2h5v5a1 1 0 102 0v-5h5a1 1 0 100-2h-5V4a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {language.add}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Header