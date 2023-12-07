import React, { useContext, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { AppContext } from "../../App";
import Loading from "./Loading";
import Header from "./Header/Header";
import { AnimatePresence } from "framer-motion";
const Base = () => {
  const { loaded, theme } = useContext(AppContext);
  return (
    <>
      <Loading loading={loaded} />
      <div
        className="
          flex justify-center pt-[60px] 
          w-full md:w-[calc(100%-300px)] md:ml-[300px]  min-h-screen max-h-screen
        "
      >
        <div 
          className={`
            mx-auto
            w-full overflow-y-auto md:pt-4 
            ${theme === "dark" ? "dark-cust-scrollbar" : "cust-scrollbar"}
          `}
        >
          <Header />
          <div className="w-full max-w-[1640px] md:px-4 py-2">
            <AnimatePresence mode="wait">
              <Outlet />
            </AnimatePresence>
          </div>
        </div>
      </div>
    </>
  );
};

export default Base;
