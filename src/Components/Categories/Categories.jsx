import React, { createContext, useContext, useEffect, useState } from 'react'
import { AppContext } from '../../App';
import Fetch from '../utils';
import CategoryHeader from './CategoryHeader';
import CategoryTable from './CategoryTable';

const PaginationContext = createContext();
const PaginationProvider = ({ children }) => {
    // pagination
    const [ currentPage, setCurrentPage ] = useState(1);
    const [ itemsPerPage, setItemsPerPage ] = useState(10);
    const [ pages, setPages ] = useState([]);
    const [ totalItems, setTotalItems ] = useState(0);
    const [ totalPages, setTotalPages ] = useState(0);

    const paginationStore = {
        currentPage,
        setCurrentPage,
        itemsPerPage,
        setItemsPerPage,
        pages,
        setPages,
        totalItems,
        setTotalItems,
        totalPages,
        setTotalPages
    }
    return (
        <PaginationContext.Provider value={paginationStore}>
            {children}
        </PaginationContext.Provider>
    )
}

function Categories() {
    const { setActiveTab, setLoaded, reqFinished, setReqFinished, language, selectedLanguage } = useContext(AppContext);
    const [ categories, setCategories ] = useState([]);
    const [ checkedItems, setCheckedItems ] = useState([]);
    const [ checkAll, setCheckAll ] = useState(false);


    useEffect(() => {
        setActiveTab(language.categories);
        Fetch(import.meta.env.VITE_API+'/categories', 'GET')
        .then(res => {
          setCategories(res.data);
          setReqFinished(true);
        })
    },[]);

    useEffect(() => {
      setActiveTab(language.categories);
      setLoaded(true);
    }, [reqFinished, selectedLanguage]);
  return (
    <div className='bg-light-primary-500 dark:bg-dark-primary-500 p-4 rounded-md shadow flex flex-col gap-3'>
      <CategoryHeader {...{
        checkedItems,
        setCheckedItems,
      }} />
      <div className="w-full mx-auto">
        <PaginationProvider>
          <CategoryTable {...{
            categories,
            setCategories,
            checkedItems,
            setCheckedItems,
            checkAll,
            setCheckAll
          }} />
        </PaginationProvider>
      </div>
    </div>
    
  )
}

export default Categories
export { PaginationContext, PaginationProvider }