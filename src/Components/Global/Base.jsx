import React, { useContext, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { AppContext } from '../../App';
import Loading from './Loading';
import Header from './Header/Header';
import { AnimatePresence } from 'framer-motion';
const Base = () => {
  const { loaded } = useContext (AppContext);
  return (
    <>
      <Loading loading={loaded} />
      <div className="flex w-full md:w-[calc(100%-285px)] md:ml-[285px] justify-center pt-[80px] min-h-screen px-2 md:px-4 overflow-hidden">
        <Header />
        <div className="w-full max-w-[1640px] md:px-4 py-2">
          <AnimatePresence mode="wait">
            <Outlet />
          </AnimatePresence>
        </div>
      </div>
    </>
  )
}

export default Base