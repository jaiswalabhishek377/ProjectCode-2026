import Header from "./components/Header/header"
import Footer from "./components/Footer/footer"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import authService from "./appwrite/auth"
import {login,logout} from "./store/authslice.js"

const App = () => {
  
  const [loading,setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
      if(userData) {
        dispatch(login({userData}));
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
    <div className="min-h-screen flex flex-wrap content-between bg-gray-400">
      <div className="w-full block">
        <Header />
        <main className="flex justify-center items-center py-4">
          {loading ? <p>Loading...</p> : <p>Data Loaded</p>}
        </main>
        <Footer />
      </div>
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