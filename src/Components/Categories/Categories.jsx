import React, { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../../App";
import Fetch from "../utils";
import Header from "./Header";
import Table from "./Table";
import SearchForm from "./SearchForm";
import Footer from "./Footer";
import { AnimatePresence } from "framer-motion";
import Form from "./Form";

function Categories() {
  const {
    setActiveTab,
    setLoaded,
    reqFinished,
    language,
    selectedLanguage,
    setReqFinished,
  } = useContext(AppContext);
  const [data, setData] = useState([]);
  const [checkedItems, setCheckedItems] = useState([]);
  const [checkAll, setCheckAll] = useState(false);
  const [reload, setReload] = useState(false);

  // edit and creation form
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [openedId, setOpenedId] = useState(null);

  // Search
  const [search, setSearch] = useState("");
  const [searchBy, setSearchBy] = useState(language.all)

  // Order
  const [orderBy, setOrderBy] = useState('name');

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);

  // form ref
  const formRef = useRef();

  useEffect(() => {
    setActiveTab(language.categories);
    setLoaded(true);
  }, [reqFinished, selectedLanguage]);

  useEffect(() => {
    setLoading(true);
    Fetch(
      `${
        import.meta.env.VITE_API
      }/categories?search=${search}&searchby=${searchBy}&orderby=${orderBy}&page=${currentPage}&limit=${itemsPerPage}`,
      "GET"
    ).then((res) => {
      setData(res.data.categories);
      setTotalItems(res.data.total);
      setTotalPages(res.data.pages);
      setReqFinished(true);
      setLoading(false);
    });
  }, [currentPage, itemsPerPage, search, reload]);

  useEffect(() => {
    if (formRef.current) {
      function formRefClickHandler(e) {
        if (e.target === formRef.current) {
          setIsFormOpen(false);
        }
      }
      formRef.current.addEventListener("click", formRefClickHandler);
      return () => {
        if (formRef.current) {
          formRef.current.removeEventListener("click", formRefClickHandler);
        }
      };
    }
  }, [openedId, isFormOpen]);
  return (
    <>
      <div className="bg-light-primary-500 dark:bg-dark-primary-500 p-4 rounded-md shadow flex flex-col">
        <Header
          {...{
            checkedItems,
            setCheckedItems,
            setIsFormOpen,
            setOpenedId,
            setReload,
          }}
        />
        <div className="w-full mx-auto">
          <div className="flex py-3">
            <SearchForm
              {...{
                search,
                setSearch,
                searchBy,
                setSearchBy,
              }}
            />
          </div>
          <div className="w-full flex flex-col rounded-md shadow-light dark:shadow-dark">
            <Table
              {...{
                data,
                setData,
                checkedItems,
                setCheckedItems,
                checkAll,
                setCheckAll,
                setOpenedId,
                setIsFormOpen,
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
      <AnimatePresence mode="wait">
        {isFormOpen && (
          <div
            ref={formRef}
            className={`
                fixed top-0 left-0 z-[2000] w-full min-h-screen max-h-screen
                flex items-start justify-end overflow-hidden overflow-y-auto scroll-smooth
                ${
                  isFormOpen
                    ? "bg-light-quarternary-500 bg-opacity-20 backdrop-blur-[5px]"
                    : "bg-transparent"
                }
              `}
          >
            <Form
              id={openedId}
              setReload={setReload}
              setIsFormOpen={setIsFormOpen}
              setOpenedId={setOpenedId}
            />
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Categories;
