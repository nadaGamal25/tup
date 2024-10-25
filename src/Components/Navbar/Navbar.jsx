import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import logo from '../../assets/tup.PNG'
import axios from 'axios';

export default function Navbar({userData ,logout}) {

  const [sideToggle ,setSideToggle]=useState(false);

  // useEffect(() => {
  //   const handleResize = () => {
  //     if (window.innerWidth < 768) {
  //       setSideToggle(true);
  //     } else {
  //       setSideToggle(false);
  //     }
  //   };

  //   window.addEventListener('resize', handleResize);

  //   return () => {
  //     window.removeEventListener('resize', handleResize);
  //   };
    
  // }, []);
    const [isCollapsed, setIsCollapsed] = useState(false);
  
    // Function to toggle the collapsed state of the sidebar
    function toggleSidebar() {
      setIsCollapsed((prevIsCollapsed) => !prevIsCollapsed);
    }

  useEffect(()=>{
    getUserBalance()
    console.log(userData)
  },[])

      const [userBalance,setUserBalance]=useState('')
      async function getUserBalance() {
        try {
          const response = await axios.get('https://dashboard.go-tex.net/api/user/get-user-balance',
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('userToken')}`,
            },
          });
          const balance = response.data.data;
          console.log(balance)
          console.log(userData)
          // console.log(userData.data.user.rolle)
          setUserBalance(balance)
        } catch (error) {
          console.error(error);
        }
      }
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
      function waitingAlert(){
        window.alert('سوف يكون متاح قريباً ')
      }

      const [showModal, setShowModal] = useState(false);
          const [depositAmount, setDepositAmount] = useState('');
          async function addDepositToUser() {
            try {
              const response = await axios.post(
                'https://dashboard.go-tex.net/api/user/user-charge',
                {
                  amount: depositAmount,
                },
                {
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem('userToken')}`,
                  },
                }
    
              );
              // Handle the response as per your requirement
              console.log(response.data);
              window.alert('يرجى ملئ جميع البيانات التالية ')
              // navigate(response.data.data.order.url);
              const stickerUrl = `${response.data.data.transaction.url}`;
           const newTab = window.open();
           newTab.location.href = stickerUrl;

              // if (response.data.msg === 'ok') {
                closeModal();
                // getUsersListsAdmin();
              // }
            } catch (error) {
              console.error(error);
            }
          }
          const openModal = () => {
            setShowModal(true);
          };
        
          const closeModal = () => {
            setShowModal(false);
            setDepositAmount('');
          };
          const handleDepositChange = (event) => {
            setDepositAmount(Number(event.target.value));
          };
  return (
    <>
    {/* <!-- start side navbar --> */}
    <section id="sidebar" className={`${sideToggle? "hide sidenav" :"sidenav"} ${isCollapsed ? 'collapsed' : ''}`}>
        <a href="#" class="brand">
            <img src={logo} alt='logo'/>
        </a>
       
        <ul class="side-menu top">
            {/* <li class="">
                <a href="#">
                    <i class="bx fa-solid fa-table-columns"></i>
                    <span class="text">لوحة التحكم</span>
                </a>
            </li> */}
            <li className='active'>
                <Link  to="/companies">
                    <i class="fa-solid fa-truck-fast bx"></i>
                    <span class="text">شركات الشحن</span>
                </Link>
            </li>
            <li>
                <Link to="/payment">
                <i class="fa-solid fa-sack-dollar bx"></i>
                <span class="text">المحفظة
                {/* ({userBalance} ر.س) */}
                </span>
                </Link>
            </li>
            {/* {userData?.data?.user?.rolle === "user"?(
            <li>
                <Link to="/packeges">
                <i class="fa-solid fa-money-bill bx"></i>
                    <span class="text">شراء باقة
               
                </span>
                </Link>
            </li>
            ):null}
            {userData?.data?.user?.rolle === "user"?(
            <li>
                <Link to="/packageDetails">
                <i class="fa-solid fa-money-bill bx"></i>
                    <span class="text"> تفاصيل باقتك
               
                </span>
                </Link>
            </li>
            ):null} */}
            {/* <li>
                <Link to="/clients">
                    <i class="fa-solid fa-users bx"></i>
                    <span class="text">العملاء</span>
                </Link>
            </li> */}
            <li>
                <Link to="shipments">
                <i class="fa-solid fa-box-open bx"></i>
                    <span class="text">الشحنات</span>
                </Link>
            </li>
            {userData?.data?.user?.rolle === "user"?(
            <>
            <li>
                <Link onClick={waitingAlert}
                //  to="#" onClick={openModal}
                >
                <i class="fa-solid fa-credit-card bx"></i>
                  <span class="text">إضافة رصيد </span>
                </Link>
            </li>
            {/* <li>
                <Link to="/paymentOrders">
                <i class="fa-solid fa-file-invoice bx"></i>
                    <span class="text">طلبات الدفع
                </span>
                </Link>
            </li> */}
            </>
            ):null}
            
            {/* {userData?.data?.user?.rolle === "marketer"?( */}
              <li className=''>
              <Link  to="/addClientAll">
              <i class="fa-solid fa-user-plus bx"></i>
                  <span class="text">إضافة عميل </span>
              </Link>
          </li>
            {/* ):null} */}
            {/* {userData?.data?.user?.rolle === "marketer"?( */}
              <li className=''>
              <Link  to="/clientsAll">
              <i class="fa-solid fa-users bx"></i>
                  <span class="text"> العملاء </span>
              </Link>
          </li>
            {/* ):null} */}
            {userData?.data?.user?.rolle === "marketer"?(
            <li>
                <Link to="/packageMarketers">
                <i class="fa-solid fa-money-bill bx"></i>
                    <span class="text"> باقات العملاء
               
                </span>
                </Link>
            </li>
            ):null}
            {userData?.data?.user?.rolle === "marketer"?(
            <li>
                <Link onClick={waitingAlert}
                // to="/generateLinkPayment"
                >
                <i class="fa-solid fa-link bx"></i>
                    <span class="text">  إنشاء رابط للرصيد 
               
                </span>
                </Link>
            </li>
            ):null}
            
            {/* {userData?.data?.user?.rolle === "marketer"?(
              <li className=''>
              <Link  to="/addClientMarketer">
              <i class="fa-solid fa-user-plus bx"></i>
                  <span class="text"> إضافة عميل</span>
              </Link>
          </li>
            ):null}
            {userData?.data?.user?.rolle === "marketer"?(
              <li className=''>
              <Link  to="/displayClientsMarkter">
              <i class="fa-solid fa-users bx"></i>
                  <span class="text"> العملاء </span>
              </Link>
          </li>

            ):null} */}
            <li>
              <Link onClick={waitingAlert}>
              <i class="fa-solid fa-keyboard bx"></i>
                    <span class="text">مستلزمات الشحن(قريباً)</span>
              </Link>
          </li>
            {/* {userData?.data?.user?.rolle !== "marketer"?(
              <li>
              <Link onClick={waitingAlert}>
              <i class="fa-solid fa-keyboard bx"></i>
                    <span class="text">مستلزمات الشحن(قريباً)</span>
              </Link>
          </li>
            ):null} */}


            {/* {userData?.data?.user?.rolle === "marketer"?(
              <li className=''>
              <Link  to="/MArketerAddClient">
              <i class="fa-solid fa-user-plus bx"></i>
                  <span class="text">إضافة عميل(دفترة) </span>
              </Link>
          </li>
            ):null}
             {userData?.data?.user?.rolle === "marketer"?(
              <li className=''>
              <Link  to="/MarketerClients">
              <i class="fa-solid fa-users bx"></i>
                  <span class="text"> العملاء (دفترة)</span>
              </Link>
          </li>
            ):null} */}
            {userData?.data?.user?.rolle === "marketer"?(
              <li className=''>
              <Link  to="/inviteLink">
              <i class="fa-solid fa-link bx"></i>
                  <span class="text"> إنشاء دعوة</span>
              </Link>
          </li>
            ):null}
             {/* {userData?.data?.user?.rolle === "marketer"?(
            <li>
                <Link to="/marketerEditClient">
                <i class="fa-solid fa-user-pen bx"></i>
                      <span class="text">تعديل بيانات العميل</span>
                </Link>
            </li>
            ):null} */}
            {userData?.data?.user?.rolle === "marketer"?(
            <li>
                <Link to="/invocesMarkter">
                <i class="fa-solid fa-receipt bx"></i>
                <span class="text">الفواتير</span>
                </Link>
            </li>
            
            ):null}
            {/* <li>
                <Link to="#">
                <i class="fa-solid fa-receipt bx"></i>
                <span class="text"></span>
                </Link>
            </li> */}

            {/* <li>
                <Link onClick={waitingAlert}>
                <i class="fa-solid fa-users-line bx"></i>
                    <span class="text">طلب مندوب</span>
                </Link>
            </li> */}
            
        {/* </ul> */}
        {/* <ul class="side-menu"> */}
            
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
          <i class="fa-solid fa-bars" onClick={()=> {setSideToggle(!sideToggle)
          }}></i>
          {/* <i class="fa-solid fa-bars" id="menu-toggle" onClick={toggleSidebar}></i> */}
            
            
            {/* <a href="#" class="profile">
                <img src="image/profile.jpg" alt="profile image"/>
            </a> */}
        </nav>
        {/* <!--end navbar --> */}
        </section>
        {showModal && (
        <div className='modal bg-d' style={{ display: 'block' }}>
          <div className='modal-dialog'>
            <div className='modal-content '>
              <div className='modal-header'>
                <h5 className='modal-title'>إضافة رصيد </h5>
                {/* <button
                  type='button'
                  className='close'
                  onClick={closeModal}
                >
                  <span aria-hidden='true'>&times;</span>
                </button> */}
              </div>
              <div className='modal-body'>
                <div className='form-group'>
                  <label htmlFor='deposit'>الرصيد :</label>
                  <input
                    type='number'
                    className='form-control'
                    id='deposit'
                    value={depositAmount}
                    onChange={handleDepositChange}
                   
                  />
                </div>
              </div>
              <div className='modal-footer'>
                <button
                  type='button'
                  className='btn btn-primary'
                  onClick={addDepositToUser}
                >
                  إضافة
                </button>
                <button
                  type='button'
                  className='btn btn-secondary'
                  onClick={closeModal}
                >
                  إلغاء
                </button>
              </div>
            </div>
          </div>
        </div>
      )}  
    </>
  )
}
