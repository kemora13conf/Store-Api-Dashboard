import React, { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../../../App";
import { toast } from "react-toastify";
import MyLink from "../MyLink";
import MenuTab from "./MenuTab";

function generateTabs(permissions, language) {
  const tabs = [
    {
        name: language.dashboard,
        icon: "fas fa-tachometer-alt",
        link: ""
    }];
  if(permissions.includes('edit_category')){
    tabs.push({
      name: language.categories,
      icon: "fas fa-list",
      link: "categories"
    })
  }
  if(permissions.includes('edit_product')){
    tabs.push({
      name: language.products,
      icon: "fas fa-box",
      link: "products"
    })
  }
  if(permissions.includes('edit_client')){
    tabs.push({
      name: language.clients,
      icon: "fas fa-users",
      link: "clients"
    })
  }
  if(permissions.includes('edit_order')){
    tabs.push({
      name: language.orders,
      icon: "fas fa-shopping-cart",
      link: "orders"
    })
  }
  if(permissions.includes('edit_settings')){
    tabs.push({
      name: language.settings,
      icon: "fas fa-cog",
      menu: [
        {
          name: language.general,
          icon: "fas fa-cog",
          link: "settings/general"
        },
        {
          name: language.smtp,
          icon: "fas fa-envelope",
          link: "settings/smtp"
        },
        {
          name: language.languages,
          icon: "fas fa-language",
          link: "settings/languages"
        },
        {
          name: language.payment,
          icon: "fas fa-money-bill-wave",
          link: "settings/payment"
        },
      ]
    })
  }
  return tabs;
}



function Sidebar({ openedSidebar, setOpenedSidebar, width }) {
  const { activeTab, language, currentUser, theme } = useContext(AppContext);
  const [ tabs, setTabs ] = useState([])
  const ref = useRef();
  const handleClickOutside = (e) => {
    if (ref.current == e.target ) {
      setOpenedSidebar(false);
    }
  };
  useEffect(() => {
    ref.current.addEventListener("click", handleClickOutside);
    return () => {
      try {
        ref.current.removeEventListener("click", handleClickOutside);
      } catch (error) {
        // console.warn(error.message)
      }
    };
  }, [openedSidebar]);
  useEffect(() => {
    if(currentUser){
      setTabs(generateTabs(currentUser.permissions, language))
    }
  }, [currentUser, language])
  return (
    <div
      ref={ref}
      className={`
        w-full left-0 fixed z-50 top-[66px]
        ${ 
          width < 767
            ? openedSidebar ? "min-h-[calc(100vh-66px)] bg-black bg-opacity-25" : "min-h-0 max-h-0"
            : 'min-h-0 max-h-0'
          }
      `}>
      <div
        className={`
          flex flex-col left-0 fixed z-50 top-[66px] 
          ${
            width < 767
              ? openedSidebar
                ? "left-0 !top-[66px] reveal light min-h-[calc(100vh-66px)] max-h-[calc(100vh-66px)] shadow "
                : "!-left-[300px]"
              : 'reveal'
          } 
          ${
            theme == "dark"
              ? "dark-cust-scrollbar"
              : "cust-scrollbar"
          }
          w-[300px] min-h-[calc(100vh-66px)] max-h-[calc(100vh-66px)] 
          py-4 px-4 
          transition-all duration-300
          overflow-hidden overflow-y-auto pb-10 
        `}
      >
        <div className="flex flex-col justify-start w-full gap-4 min-h-[calc(100vh-138px)] md:min-h-[calc(100vh-128px)] flex-grow-0 flex-shrink-0">
          {
            tabs.map((tab, i) => {
              if(tab.menu){
                return (
                  <MenuTab key={i} tab={tab} index={i} />
                )
              }else{
                return (
                  <MyLink
                      key={i}
                      to={tab.link}
                      className={`
                          ${
                              activeTab == tab.name ? "activeTab" : ""
                          } flex items-center w-full rounded-xl py-2 px-2 gap-4 cursor-pointer transition-all duration-300 
                          hover:bg-light-secondary-300 dark:hover:bg-dark-secondary-800 
                          group
                      `}
                  >
                      <div className="flex w-[40px] h-[40px] bg-dark-primary-700 dark:bg-dark-secondary-700 text-light-primary-500 
                                      justify-center items-center rounded-full shadow-md 
                                      transition-all duration-300 group-hover:bg-light-primary-500dark-soft 
                      ">
                      <i className={`${tab.icon} text-1xl transition-all duration-300`}></i>
                      </div>
                      <p className="text-light-quarternary-500 dark:text-dark-tertiary-300 dark-soft">{tab.name}</p>
                  </MyLink>
                )
              }
            }
            )
          }

        </div>
      </div>
    </div>
  );
}

export default Sidebar;
