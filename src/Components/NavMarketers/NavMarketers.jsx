import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import logo from '../../assets/tup.PNG'
import { useNavigate } from 'react-router-dom';

export default function NavMarketers({marketerData ,logout}) {
    let navigate= useNavigate();
    
    const [sideToggle ,setSideToggle]=useState(false);
    useEffect(() => {
        const handleClick = (e) => {
          const allSideMenu = document.querySelectorAll('.side-menu.top li a');
          const li = e.currentTarget.parentElement;
    
          allSideMenu.forEach((i) => {
            i.parentElement.classList.remove('active');
          });
          
          li.classList.add('active');
        };
    
        const allSideMenu = document.querySelectorAll('.side-menu.top li a');
        allSideMenu.forEach((item) => {
          item.addEventListener('click', handleClick);
        });
    
        return () => {
          allSideMenu.forEach((item) => {
            item.removeEventListener('click', handleClick);
          });
        };
      }, []);
  return (
    <>
    {/* <!-- start side navbar --> */}
    <section id="sidebar" className={sideToggle? "hide" :""}>
        <a href="#" class="brand">
            <img src={logo} alt='logo'/>
        </a>
        {/* <div>
        <p className='iclose'><i class="fa-solid fa-xmark"></i></p>
        </div> */}
        <ul class="side-menu top">
            
            <li>
                <Link to="/marketersShipments">
                <i class="fa-solid fa-box-open bx"></i>
                    <span class="text">الشحنات </span>
                </Link>
            </li>
            <li>
                <Link to="/marketersClients">
                    <i class="fa-solid fa-users bx"></i>
                    <span class="text">العملاء</span>
                </Link>
            </li>
            <li>
                <Link to="/marketerGenerateLink">
                <i class="fa-solid fa-link bx"></i>
                    <span class="text">   رابط التسجيل للعميل 
               
                </span>
                </Link>
            </li>
            
           
        </ul>
        <ul class="side-menu">
            
        <li>
                <Link onClick={logout} class="logout" to='/loginMarketers'>
                <i class="fa-solid fa-right-from-bracket bx"></i>
                    <span class="text">تسجيل الخروج</span>
                </Link>
            </li>
            
        </ul>
    </section>
    
        {/* <!-- end side navbar --> */}
    <section id="content">
        {/* <!--start navbar --> */}
        <nav class="d-flex align-items-center" id='navb'>
          <div className="w-280" ></div>
                <i class="fa-solid fa-bars" onClick={()=> setSideToggle(!sideToggle)}></i>
            
            
            {/* <a href="#" class="profile">
                <img src="image/profile.jpg" alt="profile image"/>
            </a> */}
        </nav>
        {/* <!--end navbar --> */}
        </section>
        
    </> 
  )
}
