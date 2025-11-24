import React, { useEffect, useRef } from 'react'
import "./navbar.css"
import logo from '../../assets/icons/logo.png'
import search from '../../assets/icons/search.png'
import notification from '../../assets/icons/notificationicon.png'
import profileimage from '../../assets/icons/profileimage.png'
import caretdownwhiteicon from '../../assets/icons/caretdownwhiteicon.png'
import { logout } from '../../firebase'

const Navbar = () => {
  const navRef = useRef();
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 80) {
        navRef.current.classList.add("nav-dark");
      }else{
        navRef.current.classList.remove("nav-dark");
      }
  })
}, []);

return (
  <div className='navbar'>
    <div ref= {navRef} className="navbar-left">
          <img src={logo} alt="logo" className='logo' height={60} width={30}/>
            <ul>
              <li>Home</li>
              <li>Courses</li>
              <li>Grammer</li>
              <li>Vocabulary</li>
              <li>Semantics</li>
              <li>New videos</li>
            </ul>
    </div>
    <div className="navbar-right">
              <img src={search} alt="search" className='icons' height={20} width={20} />
              <p>Children</p>
              <img src={notification} alt="" className='icons' height={20} width={20}/>
              <div className="navbar-profile">
                <img src={profileimage} alt="profile" className='profile' height={20} width={20}/>
                <img src={caretdownwhiteicon} alt="" className='caret' height={20} width={20}/>
                <div className="dropdown">
                  <p onClick={() => {logout()}}>Sign Out of AMS</p>
                </div>
              </div>
            </div>
  </div>
    )
}

export default Navbar
