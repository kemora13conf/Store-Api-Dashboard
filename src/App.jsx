import { createContext, useContext, useEffect, useLayoutEffect, useState } from "react";
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
import CategoryForm from "./Components/Categories/Form";
import ProductForm from "./Components/Products/ProductForm";
import ConfirmProvider from "./Components/Global/Popups/PopupsContainer";
import PopupsProvider from "./Components/Global/Popups/PopupsContainer";

const AppContext = createContext();
const AppProvider = ({ children }) => {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [isAuth, setIsAuth] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [loaded, setLoaded] = useState(false);
  const [reqFinished, setReqFinished] = useState(false);
  const [theme, setTheme] = useState('light')
  const [ selectedLanguage, setSelectedLanguage ] = useState('English')
  const [ language, setLanguage ] = useState({})

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
    setLanguage
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
      fetch(`${import.meta.env.VITE_ASSETS}/Languages/${selectedLanguage}/default.json`)
      .then(res => res.json())
      .then(res => {
        setLanguage(res)
        localStorage.setItem('languageObj', JSON.stringify(res))
      })
  }

  useEffect(() => {
    let language = localStorage.getItem('language')
    localStorage.removeItem('languageObj')
    if( language != null) {
      if (selectedLanguage != language) {
        configLanguage();
      }else{
        if(localStorage.getItem('languageObj')) {
          setLanguage(JSON.parse(localStorage.getItem('languageObj')))
        }else{
          configLanguage();
        }
      }
    } else {
      configLanguage();
    }    
  }, [selectedLanguage])

  useLayoutEffect(() => {
    let randomId = Math.random().toString(36).substring(7);
    if (theme == 'dark') {
      document.documentElement.classList.add('dark')
      /* @vite-ignore */ 
      import('./ScrollBarStyles/darkScrollbar.css?v='+randomId)
    } else {
      document.documentElement.classList.remove('dark')
      import('./ScrollBarStyles/lightScrollbar.css?v='+randomId)
    }
  }, [theme])
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API}/clients/update-language`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('jwt')
        },
        body: JSON.stringify({ language: selectedLanguage })
    }).then(res => res.json())
    .then(res => {
        if (res.type == 'success') {
            setSelectedLanguage(res.data)
        }
    }
    ).catch(err => {
        console.error(err)
    })
  }, [selectedLanguage])
  return (
    <AppContext.Provider value={stateStore}>{children}</AppContext.Provider>
  );
};

function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <AnimatePresence mode="wait">
          <ToastContainer />
          <PopupsProvider>
            <Routes>
              <Route path="/*">

                <Route element={<ProtectedRoute />}>
                  <Route element={<NavigationBar />}>

                    <Route index element={<Home />} />

                    <Route path="categories/*">
                      <Route index element={<Categories />} />
                    </Route>

                    <Route path="products/*">
                      <Route index element={<Products />} />
                    </Route>

                  </Route>
                </Route>

                <Route element={<Locked />}>
                  <Route path="login" element={<Login />} />
                </Route>

                <Route path='*' element={<Navigate to='/' />} />

              </Route>
            </Routes>
          </PopupsProvider>
        </AnimatePresence>
      </AppProvider>
    </BrowserRouter>
  );
}

export default App;
export { AppContext };
