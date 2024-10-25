import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import logo from '../../assets/tup.PNG'
import { useNavigate } from 'react-router-dom';

export default function NavAdmin({userData ,logout}) {
    let navigate= useNavigate();
    
    const [sideToggle ,setSideToggle]=useState(false);

//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth < 768) {
//         setSideToggle(true);
//       } else {
//         setSideToggle(false);
//       }
//     };

//     window.addEventListener('resize', handleResize);
//     return () => {
//       window.removeEventListener('resize', handleResize);
//     };
//   }, []);

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
            {/* <li>
                <a>
                    <i class="bx fa-solid fa-table-columns"></i>
                    <span class="text">لوحة تحكم الادمن </span>
                </a>
            </li> */}
            <li className='active'>
                <Link to="/companiesAdmin">
                    <i class="fa-solid fa-truck-fast bx"></i>
                    <span class="text">شركات الشحن</span>
                </Link>
            </li>
            <li>
                <Link to="/shipmentsAdmin">
                <i class="fa-solid fa-box-open bx"></i>
                    <span class="text">الشحنات </span>
                </Link>
            </li>
            
            <li>
                <Link to="/userListAdmin">
                    <i class="fa-solid fa-users bx"></i>
                    <span class="text">المستخدمين</span>
                </Link>
            </li>
            <li>
                <Link to="/InvitedWaiting">
                <i class="fa-solid fa-clipboard-list bx"></i>
                    <span class="text">قائمة انتظار المدعويين</span>
                </Link>
            </li>
            <li>
                <Link to="/daftraStaff">
                <i class="bx fa-solid fa-clipboard-user"></i>
                    <span class="text">الموظفين  </span>
                </Link>
            </li>
            <li>
                <Link to="/clientsAdmin">
                <i class="fa-solid fa-users bx"></i>
                <span class="text">العملاء</span>
                </Link>
            </li>
            <li>
                <Link to="/marketersAdmin">
                <i class="fa-solid fa-users-rays bx"></i>
                    <span class="text">المسوقات</span>
                </Link>
            </li>
            <li>
                <Link to="/clientsAmarketers">
                <i class="fa-solid fa-users-viewfinder bx"></i>
                    <span class="text">ربط المتاجر بالمسوقات</span>
                </Link>
            </li>
            <li>
                <Link to="/invocesAdmin">
                <i class="fa-solid fa-receipt bx"></i>
                <span class="text">الفواتير</span>
                </Link>
            </li>
            <li>
                <Link to="/clientsCreditAdmin">
                <i class="fa-regular fa-credit-card bx"></i>
                <span class="text">الحد الائتمانى(credit)</span>
                </Link>
            </li>
            <li>
                <Link to="/packegesAdmin">
                <i class="fa-solid fa-money-bill bx"></i>
                    <span class="text"> الباقات
               
                </span>
                </Link>
            </li>
            {/* <li>
                <Link to="/addDepositAdmin">
                <i class="fa-solid fa-dollar-sign bx"></i>
                    <span class="text">اضافة رصيد</span>
                </Link>
            </li> */}
           
        {/* </ul>
        <ul class="side-menu"> */}
            
        <li>
                <Link onClick={logout} class="logout" to='/'>
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
        
    </>  )
}
