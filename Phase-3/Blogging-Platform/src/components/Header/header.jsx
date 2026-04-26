import React from 'react'
import Container from '../Container/container'
import Logo from '../Logo'
import LogoutBtn from './LogoutBtn'
import {Link} from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'


const Header = () => {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  const navItems = [
    {
      name: 'Home',
      slug: "/",
      active: true
    }, 
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
  },
  {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
  },
  {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
  },
  {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
  },
  ]

  return (
    <header className='py-4 shadow-md bg-white border-b border-gray-200'>
      <Container >
        <nav className='flex items-center justify-between'>
          <div className='mr-4'>
            <Link to="/">
              <Logo width="70px" />
            </Link>
          </div>
          <ul className='flex items-center ml-auto gap-4 sm:gap-6'>
              {
                navItems.map((item)=>
                  item.active ? <li key={item.name}>
                    <button onClick={()=>navigate(item.slug)} className='inline-block px-4 py-2 duration-200 text-gray-700 font-semibold hover:bg-blue-100 hover:text-blue-600 rounded-full'>
                      {item.name}</button>
                  </li> : null
                )}
                {authStatus && <li><LogoutBtn /></li>}
            </ul>
        </nav>
      </Container>
    </header>
  )
}

export default Header