import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './store/store'
import Protected from './components/Protected'
import { createBrowserRouter } from 'react-router-dom'
import Home from './Pages/Home'
import Login from './Pages/Login.jsx'
import SignUp from './Pages/SignUp'
import Post from './Pages/Post'
import EditPost from './Pages/EditPost'
import AllPost from './Pages/AllPost.jsx'
import AddPost from './Pages/AddPost.jsx'
import { RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
        {
            path: "/",
            element: <Home />,
        },
        {
            path: "/login",
            element: (
                <Protected authentication={false}>
                    <Login />
                </Protected>
            ),
        },
        {
            path: "/signup",
            element: (
                <Protected authentication={false}>
                    <SignUp />
                </Protected>
            ),
        },
        {
            path: "/all-posts",
            element: (
                <Protected authentication>
                    {" "}
                    <AllPost />
                </Protected>
            ),
        },
        {
            path: "/add-post",
            element: (
                <Protected authentication>
                    {" "}
                    <AddPost />
                </Protected>
            ),
        },
        {
            path: "/edit-post/:slug",
            element: (
                <Protected authentication>
                    {" "}
                    <EditPost />
                </Protected>
            ),
        },
        {
            path: "/post/:slug",
            element: <Post />,
        },
    ],
},
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
