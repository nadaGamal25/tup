import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Footer from '../Footer/Footer'
import Navbar from '../Navbar/Navbar'

export default function Layout({userData,setuserData}) {
  let navigate= useNavigate();
  function logout(){
    localStorage.removeItem('userToken');
    setuserData(null);
    navigate('/')
  }
  return (
    <>
    <Navbar userData={userData} logout={logout}/>
    <Outlet></Outlet>
    <Footer/>
    </>
  )
}
