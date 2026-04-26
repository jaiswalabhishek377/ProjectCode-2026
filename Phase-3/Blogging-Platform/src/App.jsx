import Header from "./components/Header/header"
import Footer from "./components/Footer/footer"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import AuthService from "./appwrite/auth"
import {login,logout} from "./store/authslice.js"
import { Outlet } from "react-router-dom"

const App = () => {
  
  const [loading,setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    AuthService.getCurrentUser()
    .then((userData) => {
      if(userData) {
        dispatch(login(userData));
      }
      else{
        dispatch(logout());
      }
    })
    .finally(() => {
      setLoading(false);
    })
  },[])

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
        <Header />
        <main className="flex-grow flex flex-col w-full min-h-[70vh]">
          {loading ? (
             <div className="flex flex-grow justify-center items-center">
                <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
             </div>
          ) : (
            <Outlet />
          )}
        </main>
        <Footer />
    </div>
  )
}

export default App

// console.log(import.meta.env.VITE_APPWRITE_URL);
  // const [text,setText] = useState('');
  // function slug(text) {
  //   // return text.toLowerCase().replace(/\s+/g, '-');// or can be done by split and join method
  //   return text.toLowerCase().split(' ').join('-');
  // }
// {/* <h1>Blogging Platform</h1> */}
//       {/* <input type="text" value={text} onChange={(e) => setText(e.target.value)} /> 
//       <p>{slug(text)}</p> */}