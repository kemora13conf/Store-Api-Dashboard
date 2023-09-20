import React, { useContext } from 'react'
import { AppContext } from '../../App';
import { PaginationContext } from './Categories';

function SearchForm() {
    const { language } = useContext(AppContext);
    console.log(AppContext)
    const { search, setSearch  } = useContext(PaginationContext);
    const handleSubmit = (e) => {
        e.preventDefault();
    }
    return (
        <form 
            onSubmit={handleSubmit}
            className="flex ml-auto">
            <input 
                type="text" 
                placeholder={language.search}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="
                    w-full max-w-[250px] h-[40px] rounded-md px-4 py-2 pr-[40px] outline-none bg-transparent
                    border border-light-secondary-500 dark:border-dark-secondary-600
                    text-sm text-light-quarternary-500 
                    dark:text-dark-quarternary-500
                    transition-all duration-300
                    hover:bg-light-secondary-500 dark:hover:bg-dark-secondary-600 
                    focus:bg-light-secondary-500 dark:focus:bg-dark-secondary-600
                " 
            />
            <button 
                type="submit" 
                className="
                    w-[40px] h-[40px] -ml-[40px]
                    flex items-center justify-center rounded-full
                    bg-transparent
                    text-light-quarternary-500 dark:text-dark-quarternary-500
                    group
                "
            >
                <i className="fas fa-search transition-all duration-300 group-hover:scale-110"></i>
            </button>
        </form>
    )
}

export default SearchForm