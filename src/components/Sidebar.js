
import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom';
import { LoginContext } from './ContextProvider/Context'
import img1 from '../images/image 223.jpg'
import img2 from '../images/image 213.jpg'
import img3 from '../images/image 222.jpg'

export default function Sidebar() {
  const [active, setActive] = useState(1)
  const { contextData, setContextData } = useContext(LoginContext)
  // console.log('sidebar', contextData);
  
  return (
    <>
      {
        contextData ?
          <nav className='sidebar_nav'>
            <ul className='sidebar_ul'>
              <Link to='/home'><li onClick={() => setActive(1)} className={active === 1 ? 'active' : ''} ><img src={img3} width="18px" height="18px" alt="Home" /><span>Home</span></li></Link>
              <Link to="/categories" ><li onClick={() => setActive(2)} className={active === 2 ? 'active' : ''}><img src={img1} width="18px" height="18px" alt="Category" /><span>Category</span></li></Link>
              <Link to="/products"><li onClick={() => setActive(3)} className={active === 3 ? 'active' : ''}><img src={img2} width="18px" height="18px" /><span>Products</span></li></Link>
            </ul>
          </nav> :
          null
      }
    </>
  )
}
