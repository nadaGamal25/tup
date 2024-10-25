import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Footer from '../Footer/Footer'
import NavAdmin from '../NavAdmin/NavAdmin';

export default function LayoutAdmin({userData,setuserData}) {
    let navigate= useNavigate();
    function logout(){
      localStorage.removeItem('userToken');
      setuserData(null);
      navigate('/')
    }
    return (
      <>
      <NavAdmin userData={userData} logout={logout}/>
      <Outlet></Outlet>
      <Footer/>
      </>
    )
  }
