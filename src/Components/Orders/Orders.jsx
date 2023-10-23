import React, { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../../App";
import Fetch from "../utils";
import Header from "./Header";
import Table from "./Table";
import SearchForm from "./SearchForm";
import Footer from "./Footer";
import { AnimatePresence } from "framer-motion";
import SelectBox from "../Global/SelectBox/SelectBox";
import Menu from "../Global/SelectBox/Menu";
import Option from "../Global/SelectBox/Option";
import { motion } from 'framer-motion'

function Orders() {
  const {
    setActiveTab,
    setLoaded,
    reqFinished,
    language,
    selectedLanguage,
    setReqFinished,
  } = useContext(AppContext); // global context api

  const [data, setData] = useState([]);
  const [checkedItems, setCheckedItems] = useState([]);
  const [checkAll, setCheckAll] = useState(false);
  const [reload, setReload] = useState(false);

  // Search
  const [search, setSearch] = useState("");
  const [searchBy, setSearchBy] = useState('All');

  // Order
  const [orderBy, setOrderBy] = useState('Fullname');

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);

  // form ref
  const formRef = useRef();

  useEffect(() => {
    setActiveTab(language.orders);
    setLoaded(true);
  }, [reqFinished, selectedLanguage]);

  useEffect(() => {
    setLoading(true);
    Fetch(
      `${
        import.meta.env.VITE_API
      }/orders?search=${search}&searchby=${searchBy}&orderby=${orderBy}&page=${currentPage}&limit=${itemsPerPage}`,
      "GET"
    ).then((res) => {
      if(res.type==='success'){
        setData(res.data.orders);
        setTotalItems(res.data.total);
        setTotalPages(res.data.pages);
        setReqFinished(true);
        setLoading(false);
      }
    });
  }, [currentPage, itemsPerPage, search, orderBy, reload]);

  return (
    <motion.div
      initial={{ opacity: 0.4, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0.4, y: -50 }}
      key={'clients'}
    >
      <div 
        className="
          bg-light-primary-500 dark:bg-dark-primary-500 
          rounded-md shadow 
          flex flex-col
        "
      >
        <Header
          {...{
            checkedItems,
            setCheckedItems,
            setReload,
          }}
        />
        <div className="w-full mx-auto">
          <div className="w-full @container/tableFilters">
            <div 
              className="
                flex p-3 gap-3 items-center justify-center flex-col 
                @[400px]/tableFilters:flex-row
              "
            >
              <div 
                className="
                  flex gap-2 justify-between items-center
                  max-w-fit w-full @[400px]/tableFilters:w-fit h-fit 
                  p-0 pl-2  
                  border border-light-secondary-500 dark:border-dark-secondary-600 rounded-md
                  text-light-quarternary-500 dark:text-dark-quarternary-500 text-sm
                  bg-light-secondary-500 dark:bg-dark-secondary-600
                "
              >
                <p className="whitespace-nowrap">
                  { language.order_by }
                </p>

                <SelectBox
                    {...{
                        selected: orderBy,
                        setSelected: setOrderBy,
                        className: "max-w-fit !rounded-md text-sm",
                    }}
                >
                  <Menu
                      className={
                          ` flex flex-col gap-2 py-2 px-2 
                          absolute top-[calc(100%+10px)] right-0 md:left-0 z-index-[2000]
                          bg-light-primary-500 dark:bg-dark-primary-500 rounded-md shadow-lg dark:shadow-dark
                          w-full min-w-fit h-auto 
                          border border-light-secondary-500 dark:border-dark-secondary-600`
                      }
                  >
                    <Option value={ 'Fullname' }>
                        <div className="flex items-center gap-2 px-3 py-2 rounded-md">
                            <h1 className="text-light-quarternary-500 dark:text-dark-quarternary-500 text-sm">
                            { language.fullname }
                            </h1>
                        </div>
                    </Option>
                    <Option value={ 'Email' }>
                        <div className="flex items-center gap-2 px-3 py-2 rounded-md">
                            <h1 className="text-light-quarternary-500 dark:text-dark-quarternary-500 text-sm">
                            { language.email }
                            </h1>
                        </div>
                    </Option>
                    <Option value={ 'Phone' }>
                        <div className="flex items-center gap-2 px-3 py-2 rounded-md">
                            <h1 className="text-light-quarternary-500 dark:text-dark-quarternary-500 text-sm">
                            { language.phone }
                            </h1>
                        </div>
                    </Option>
                  </Menu>
                </SelectBox>
              </div>
              <SearchForm
                {...{
                  search,
                  setSearch,
                  searchBy,
                  setSearchBy,
                }}
              />
            </div>
          </div>
          <div className="w-full flex flex-col rounded-md dark:shadow-dark">
            <Table
              {...{
                data,
                setData,
                checkedItems,
                setCheckedItems,
                checkAll,
                setCheckAll,
              }}
            />
            <Footer
              {...{
                currentPage,
                setCurrentPage,
                itemsPerPage,
                setItemsPerPage,
                totalItems,
                setTotalItems,
                totalPages,
                setTotalPages,
                loading,
                setLoading,
              }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default Orders;
