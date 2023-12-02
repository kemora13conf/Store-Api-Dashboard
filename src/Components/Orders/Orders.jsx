import React, { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../../App";
import Fetch from "../utils";
import Header from "./Header";
import Table from "./Table";
import Footer from "./Footer";
import { motion } from 'framer-motion'

function Orders() {
  const {
    setActiveTab,
    setLoaded,
    reqFinished,
    language,
    selectedLanguage,
    setReqFinished,
    theme,
  } = useContext(AppContext); // global context api

  const [data, setData] = useState([]);
  const [checkedItems, setCheckedItems] = useState([]);
  const [checkAll, setCheckAll] = useState(false);
  const [reload, setReload] = useState(false);

  // Order
  const [orderBy, setOrderBy] = useState(language.date);

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
      }/orders?orderby=${orderBy}&page=${currentPage}&limit=${itemsPerPage}`,
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
  }, [currentPage, itemsPerPage, orderBy, reload]);

  return (
    <motion.div
      initial={{ opacity: 0.4, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
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
            orderBy,
            setOrderBy
          }}
        />
        <div className="w-full mx-auto">
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
