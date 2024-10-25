import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Footer from '../Footer/Footer'
import NavMarketers from '../NavMarketers/NavMarketers';

export default function LayoutMarketers({marketerData,setmarketerData}) {
    let navigate= useNavigate();
    function logout(){
      localStorage.removeItem('marketerToken');
      setmarketerData(null);
      navigate('/loginMarketers')
    }
     
    return (
      <>
      <NavMarketers marketerData={marketerData} logout={logout}/>
      <Outlet></Outlet>
      <Footer/>
      </>
    )
}
