import React, { useContext } from 'react'
import { AppContext } from '../../App';
import SelectBox from '../Global/SelectBox/SelectBox';
import Menu from '../Global/SelectBox/Menu';

function SearchForm(props) {
    const { language } = useContext(AppContext);
    const { search, setSearch, searchBy, setSearchBy,  } = props;
    const handleSubmit = (e) => {
        e.preventDefault();
    }
    return (
        <form 
            onSubmit={handleSubmit}
            className='flex gap-3 ml-auto'
        >
            <SelectBox
                {...{
                    selected: searchBy,
                    setSelected: setSearchBy,
                    className: "border border-light-secondary-500 dark:border-dark-secondary-600 max-w-fit !rounded-md",
                }}
            >
                <Menu 
                    className={
                        ` flex flex-col gap-2 py-2 px-2 
                        absolute top-[calc(100%+10px)] right-0 z-index-[2000]
                        bg-light-primary-500 dark:bg-dark-primary-500 rounded-md shadow-lg dark:shadow-dark
                        w-full min-w-fit h-auto 
                        border border-light-secondary-500 dark:border-dark-secondary-600`
                    }
                >
                    
                    <Option value={ 'all' }>
                        <div className="flex items-center gap-2 px-3 py-2 rounded-md">
                            <h1 className="text-light-quarternary-500 dark:text-dark-quarternary-500 text-sm">
                            { language.all }
                            </h1>
                        </div>
                    </Option> 
                    <Option value={ 'name' }>
                        <div className="flex items-center gap-2 px-3 py-2 rounded-md">
                            <h1 className="text-light-quarternary-500 dark:text-dark-quarternary-500 text-sm">
                            { language.name }
                            </h1>
                        </div>
                    </Option>   
                    <Option value={ 'description' }>
                        <div className="flex items-center gap-2 px-3 py-2 rounded-md">
                            <h1 className="text-light-quarternary-500 dark:text-dark-quarternary-500 text-sm">
                            { language.description }
                            </h1>
                        </div>
                    </Option>
                </Menu>
            </SelectBox>
            <div className="flex">
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
            </div>
        </form>
    )
}

export default SearchForm