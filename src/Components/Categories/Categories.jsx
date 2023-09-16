import React, { createContext, useContext, useEffect, useState } from 'react'
import { AppContext } from '../../App';
import Fetch from '../utils';
import CategoryHeader from './CategoryHeader';
import CategoryTable from './CategoryTable';
import SearchForm from './SearchForm';
import CategoriesFooter from './CategoriesFooter';

const PaginationContext = createContext();
const PaginationProvider = ({ children }) => {
    const { setReqFinished, language } = useContext(AppContext);
    const [ categories, setCategories ] = useState([]);
    // Search
    const [ search, setSearch ] = useState('');
    // pagination
    const [ currentPage, setCurrentPage ] = useState(1);
    const [ itemsPerPage, setItemsPerPage ] = useState(10);
    const [ totalItems, setTotalItems ] = useState(0);
    const [ totalPages, setTotalPages ] = useState(0);
    const [ loading, setLoading ] = useState(false);

    const paginationStore = {
        categories,
        setCategories,
        search,
        setSearch,
        currentPage,
        setCurrentPage,
        itemsPerPage,
        setItemsPerPage,
        totalItems,
        setTotalItems,
        totalPages,
        setTotalPages,
        loading,
        setLoading
    }
    useEffect(() => {
      setLoading(true);
      if(search.length > 0){
        Fetch(`${import.meta.env.VITE_API}/categories?search=${search}&page=${currentPage}&limit=${itemsPerPage}`, 'GET')
        .then(res => {
          setCategories(res.data.categories);
          setTotalItems(res.data.total);
          setTotalPages(res.data.pages);
          setReqFinished(true);
          setLoading(false);
        })
      }else{
        Fetch(`${import.meta.env.VITE_API}/categories?page=${currentPage}&limit=${itemsPerPage}`, 'GET')
        .then(res => {
          setCategories(res.data.categories);
          setTotalItems(res.data.total);
          setTotalPages(res.data.pages);
          setReqFinished(true);
          setLoading(false);
        })
      }
    },[currentPage, itemsPerPage, search]);
    return (
        <PaginationContext.Provider value={paginationStore}>
            {children}
        </PaginationContext.Provider>
    )
}

function Categories() {
    const { setActiveTab, setLoaded, reqFinished, language, selectedLanguage } = useContext(AppContext);
    const [ checkedItems, setCheckedItems ] = useState([]);
    const [ checkAll, setCheckAll ] = useState(false);

    useEffect(() => {
      setActiveTab(language.categories);
      setLoaded(true);
    }, [reqFinished, selectedLanguage]);
  return (
    <div className='bg-light-primary-500 dark:bg-dark-primary-500 p-4 rounded-t-md shadow flex flex-col gap-3'>
      <CategoryHeader {...{
        checkedItems,
        setCheckedItems,
      }} />
        <PaginationProvider>
          <div className="w-full mx-auto">
            <div className="flex py-3">
              <SearchForm />
            </div>
            <div className="w-full flex flex-col rounded-md shadow-light dark:shadow-dark">
              <CategoryTable {...{
                checkedItems,
                setCheckedItems,
                checkAll,
                setCheckAll
              }} />
              <CategoriesFooter />
            </div>
          </div>
        </PaginationProvider>
    </div>
    
  )
}

export default Categories
export { PaginationContext, PaginationProvider }