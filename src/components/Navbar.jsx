import React, { useContext, useState } from 'react'
import { CiSearch } from "react-icons/ci";
import { Link, useNavigate } from 'react-router-dom';
import AppContext from '../context/AppContext';
import { FaCartShopping } from "react-icons/fa6";

const Navbar = () => {
    const { logout, isAuthentication,cart} = useContext(AppContext)
    console.log("user cart",cart);
    
    const [searchTerm, setSearchTerm] = useState(" ")
    const navigate = useNavigate()
    const onSubmitHandler = (e) => {
        e.preventDefault()
        navigate(`/product/search/${searchTerm}`)
        setSearchTerm("")
    }
    return (
        <>
            <div className="nav sticky-top">
                <div className="nav-bar ">
                    <Link to={"/"} className="left" style={{
                        textDecoration: 'none'
                    }}>
                        <img className='logo' src="logo.png" alt="" />
                    </Link>
                    <form onSubmit={onSubmitHandler} className="search-bar">
                        <CiSearch className='icon' />
                        <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className='search' type="text" placeholder='Search Punherbs.in'/>
                    </form>
                   
                    <div className="right">
                        
                        {isAuthentication ? <>
                            <Link to={"/cart"} type="button" className="btn btn-primary position-relative mx-3">
                            <FaCartShopping />

                            {cart?.items?.length> 0 &&(
                             <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                             {cart?.items?.length}
                             <span className="visually-hidden">unread messages</span>
                         </span>
                        )}
                            </Link>
                            <Link to={"/profile"} className="btn btn-primary mx-3">Profile</Link>
                            <button className="btn btn-danger mx-3" onClick={() => {
                                logout()
                                navigate("/")
                            }}>Logout</button>
                        </> : ""}

                        {!isAuthentication ? <>
                            <Link to={"/login"} className="btn btn-warning mx-3" >Login</Link>
                            <Link to={"/register"} className="btn btn-warning mx-3">Register</Link>
                        </> : ""}


                    </div>
                </div>
                <div className="sub-bar"></div>
            </div>
        </>
    )
}

export default Navbar