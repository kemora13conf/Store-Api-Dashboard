import { createContext, useContext, useEffect, useLayoutEffect, useRef, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import { AnimatePresence } from "framer-motion";
import { ToastContainer } from "react-toastify";
import ProtectedRoute from "./Components/Global/Protected";
import Locked from "./Components/Global/LockedRoute";
import NavigationBar from "./Components/Global/Base";
import Login from "./Components/Auth/Login";
import "react-toastify/dist/ReactToastify.css";
import Home from "./Components/Home/Home";
import Categories from "./Components/Categories/Categories";
import Products from "./Components/Products/Products";
import './ScrollBarStyles/scrollbar.css'
import Fetch from "./Components/utils";
import Clients from "./Components/Clients/Clients";
import ConfirmAlert from "./Components/Global/Popups/ConfirmAlert";

const AppContext = createContext();
const AppProvider = ({ currentUser, setCurrentUser, children }) => {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [isAuth, setIsAuth] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [reqFinished, setReqFinished] = useState(false);
  const [theme, setTheme] = useState('light')
  const [ selectedLanguage, setSelectedLanguage ] = useState('English')
  const [ language, setLanguage ] = useState({})

  // state for the confirm popup
  const [confirm, setConfirm] = useState(undefined)
  const ref = useRef()

  const stateStore = {
    activeTab,
    setActiveTab,
    isAuth,
    setIsAuth,
    currentUser,
    setCurrentUser,
    loaded,
    setLoaded,
    reqFinished,
    setReqFinished,
    theme,
    setTheme,
    selectedLanguage,
    setSelectedLanguage,
    language,
    setLanguage,
    confirm,
    setConfirm,
  };

  async function checkAuth() {
    setReqFinished(prv => false);
    await fetch(`${import.meta.env.VITE_API}/auth/verify-token`, {
      method: "GET",
      headers: { Authorization: "Bearer " + localStorage.getItem("jwt") },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.type == "success") {
          setCurrentUser(res.data.current_user);
          console.log(res.data.current_user.can_edit_clients)
          setTheme(res.data.current_user.theme)
          setSelectedLanguage(res.data.current_user.language)
          setIsAuth(true);
        } else {
          setIsAuth(false);
        }
      })
      .catch((err) => {
        console.error(err);
        setIsAuth(false);
      });
    setReqFinished(prv => true);
  }

  useEffect(() => {
    checkAuth();
  }, [loaded]);

  const configLanguage = () => {
      localStorage.setItem('language', selectedLanguage)
      Fetch(
        `${import.meta.env.VITE_ASSETS}/Languages/${selectedLanguage}/default.json`,
        'GET'
      )
      .then(res => {
        setLanguage(res)
        localStorage.setItem('languageObj', JSON.stringify(res))
      })
  }

  useEffect(() => {
    let language = localStorage.getItem('language')
    if (selectedLanguage != language) {
      configLanguage();
    }else{
      if(localStorage.getItem('languageObj')) {
        setLanguage(JSON.parse(localStorage.getItem('languageObj')))
      }else{
        configLanguage();
      }
    } 
  }, [selectedLanguage])

  useLayoutEffect(() => {
    if (theme == 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme])
  useEffect(() => {
    if(currentUser?.language != undefined){
      Fetch(
        `${import.meta.env.VITE_API}/clients/update-language`,
        'PUT',
        JSON.stringify({ language: selectedLanguage }),
        {'Content-Type': 'application/json'}
      )
      .then(res => {
          if (res.type == 'success') {
              setSelectedLanguage(res.data)
          }
      }
      ).catch(err => {
          console.error(err)
      })
    }
  }, [selectedLanguage]);

  useEffect(() => {
    ref.current.addEventListener('click', (e) => {
      if(e.target === ref.current){
        setConfirm(undefined)
        console.log('click')
      }
    })
  },[])
  return (
    <AppContext.Provider value={stateStore}>
      <div 
        ref={ref}
        className={`
              flex justify-center items-center 
              ${confirm != undefined ? 'bg-light-primary-500 bg-opacity-20 backdrop-blur-md' : 'bg-transparent pointer-events-none'} 
              fixed z-[3000] w-full min-h-screen top-0 left-0
              transition-all duration-300
          `}>
            <AnimatePresence mode='wait'>
              {
                confirm != undefined && (
                  <ConfirmAlert confirm={confirm} />
                )
              }
            </AnimatePresence>

      </div>
      {children}
    </AppContext.Provider>
  );
};

function App() {
  const [currentUser, setCurrentUser] = useState(undefined);

  return (
    <BrowserRouter>
      <AppProvider {...{ currentUser, setCurrentUser }}>
        <AnimatePresence mode="wait">
          <ToastContainer />
          <Routes>
            <Route path="/*">
              <Route element={<ProtectedRoute />}>
                <Route element={<NavigationBar />}>

                  <Route index element={<Home />} />
                  {
                    currentUser?.permissions?.includes('edit_category') && (
                      <Route path="categories/*">
                        <Route index element={<Categories />} />
                      </Route>
                    )
                  }

                  {
                    currentUser?.permissions?.includes('edit_product') && (
                      <Route path="products/*">
                        <Route index element={<Products />} />
                      </Route>
                    )
                  }
                  
                  {
                    currentUser?.permissions?.includes('edit_client') && (
                      <Route path="clients/*">
                        <Route index element={<Clients />} />
                      </Route>
                    )
                  }

                  

                </Route>
              </Route>

              <Route element={<Locked />}>
                <Route path="login" element={<Login />} />
              </Route>

              <Route path='*' element={<Navigate to='/' />} />
            </Route>
          </Routes>
        </AnimatePresence>
      </AppProvider>
    </BrowserRouter>
  );
}

export default App;
export { AppContext };
