import React, { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../../../App";
import Sidebar from "./Sidebar";
import useMeasure from "react-use-measure";
import './header.css'
import { AnimatePresence } from "framer-motion";
import ProfileMenu from "./ProfileMenu";

function Header() {
  const { currentUser, activeTab, loaded } = useContext(AppContext);
  const [ profileMenu, setProfileMenu ] = useState(false)
  const [ openedSidebar, setOpenedSidebar ] = useState(false);
  const [ref, bounds] = useMeasure()
  const btnRef = useRef(null)


  useEffect(()=>{
    setOpenedSidebar(false)
  }, [loaded])
  return (
    <>
      <div ref={ref} className={`
        flex justify-between items-center 
        fixed z-[51] top-0 left-0 
        w-full py-3 px-4
        before:content-[''] before:absolute 
        before:top-[66px] before:left-[300px]
        before:w-[50px] before:h-[50px] before:z-[50] 
        before:bg-transparent before:rounded-xl 
        before:shadow-runded-corner-light before:dark:shadow-runded-corner-dark
        before:transition-all before:duration-300
        md:px-5 transition-all 
        duration-300 reveal
        ${openedSidebar ? 'shadow-scaled' : ''}
        `
      }>
        <div 
          className="
            absolute top-0 left-0 z-[50]
          " 
        />
        <div className="flex items-center gap-4 pl-2">
          <div onClick={()=>{setOpenedSidebar(prv => !prv)}}  className={`flex md:hidden nav-btn ${openedSidebar ? 'active' : ''}`}>
              <span></span>
          </div>
          <h1 className="ml-2 text-2xl font-semibold text-light-quarternary-500 dark:text-dark-quarternary-500 ">{activeTab}</h1>
        </div>
        <div className="flex items-center">
          <div
            className={
              `flex items-center justify-center w-fit h-fit pr-1 gap-1 transition-all duration-300 cursor-pointer 
              relative border border-light-secondary-500 rounded-full
              ${profileMenu ? 'bg-light-secondary-500 dark:bg-dark-primary-700' : 'bg-transparent'}
              dark:border-dark-primary-500
              `
            }>
            <img src={`${import.meta.env.VITE_ASSETS}/Clients-images/${currentUser.image}`} className="max-w-[40px] w-[40px] h-[40px] object-cover object-center rounded-full shadow-lg" />
            <div
              onClick={() => setProfileMenu(prv => !prv)} 
              ref={btnRef}
              className="flex justify-center items-center  w-[40px] h-[30px] ">
              <i className={`fas fa-chevron-down text-sm h-fit transition-all duration-300  text-light-quarternary-500 dark:text-light-primary-500 ${profileMenu ? 'rotate-180' : ''}`}></i>
            </div>
            <AnimatePresence mode="wait">
              {
                profileMenu 
                ? [1].map((_, i) => (
                    <ProfileMenu key={i} {...{profileMenu, setProfileMenu, btnRef}}/>
                  ))
                : null
              }
            </AnimatePresence>
          </div>
        </div>
      </div>
      <Sidebar openedSidebar={openedSidebar} setOpenedSidebar={setOpenedSidebar} width={bounds.width} />
    </>
  );
}

export default Header;
