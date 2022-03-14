import React, { useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

const NavBar = () => {
  const Location=useLocation();
  let Navigate=useNavigate();
  const handleLogout=()=>{
    localStorage.removeItem('authtoken');
    Navigate('/login');
  }
    useEffect(()=>{
        console.log(Location);
    },[Location])
  return (
    <>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <div className="container-fluid">
    <NavLink className="navbar-brand" to="#">Navbar</NavLink>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <NavLink className={`nav-link ${Location.pathname==="/"?"active":""}`} aria-current="page" to="/">Home</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className={`nav-link ${Location.pathname==="/notes"?"active":""}`} aria-current="page" to="/notes">Notes</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className={`nav-link ${Location.pathname==="/about"?"active":""}`} to="/about">About</NavLink>
        </li>
      </ul>
      {localStorage.getItem('authtoken')===null?<form className="d-flex">
      <NavLink className="btn btn-primary mx-1" to='/login' role="button">LogIn</NavLink>
      <NavLink className="btn btn-primary mx-1" to='/signup' role="button">SignUp</NavLink>
      </form>:<button onClick={handleLogout} className='btn btn-primary'>LogOut</button>}
    </div>
  </div>
</nav>
    </>
  )
}

export default NavBar
