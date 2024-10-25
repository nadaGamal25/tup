import React, { useEffect, useState } from 'react'
import glt from '../../assets/glt.jpg'
import imile from '../../assets/imile.jpg'
import jonex from '../../assets/jonex.jpg'
import jt from '../../assets/jt.jpg'
import mkan from '../../assets/mkan.jpg'
import sae from '../../assets/sae.jpg'
import sms from '../../assets/sms.jpg'
import spl from '../../assets/spl.jpg'
import armx from '../../assets/armx.jpg'
import dhl from '../../assets/dhl.jpg'
import logo from '../../assets/tup.PNG';
import { Link } from 'react-router-dom'
import axios from 'axios'
import {Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; 

export default function Companies(userData) {
  useEffect(()=>{
    getCompaniesDetailsOrders()
    console.log(userData)
    getUserBalance()
    // console.log(userData.data.user.rolle)
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
          setUserBalance(balance)
        } catch (error) {
          console.error(error);
        }
      }
  const [companiesDetails,setCompaniesDetails]=useState([])
  const num =0;

  async function getCompaniesDetailsOrders() {
    try {
      const response = await axios.get('https://dashboard.go-tex.net/api/companies/get-all');
      const companiesPrices = response.data.data;
      console.log(companiesPrices)
      setCompaniesDetails(companiesPrices)
    } catch (error) {
      console.error(error);
    }
  }
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
    <div className='' id='content'>
      <div className=" px-3 pt-4 pb-2" dir='ltr'>
      <span class="wallet-box">الرصيد الحالى
                (<span className='txt-blue'> {userBalance}</span> ر.س)
                </span>
      </div>
      <div className='paddingCompanies' >
      <div className="container">
      {/* <div className="clients-table p-4 my-4">
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col"> الشركة</th>
            <th scope="col">سعر المستخدم</th>
            <th scope="col">سعر المدخلات</th>
            <th scope="col">سعر الزيادة </th>
          </tr>
        </thead>
        <tbody>
            {companiesDetails.map((item, index) => {
                  if (item.status) {
                    return (
                      <tr key={index}>
                        <td></td>
                        <td>{item.name}</td>
                        <td>{item.userprice}</td>
                        <td>{item.marketerprice}</td>
                        <td>{item.kgprice}</td>
                      </tr>
                    );
                  }
                  return null;
                })}
        </tbody>
      </table>
     </div> */}
        <div className="row g-4 py-4">
          {/* <div className="col-md-12 ">
          { userData.userData.data.user.rolle === "user"?
            <div className='text-center package-poster '>
              <div className='p-4'>
              <p>قم بشراء باقة الأن..
                <Link to="/packeges">اضغط هنا  </Link>
              </p>
              </div>
              
            </div>:null}
          </div> */}
            {/* <div className="col-md-12  position-relative">
            <div className="company-main company area position-relative">
            <ul class="circles">
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
            </ul>
              <div className="text-center">
              <img src={logo} className='bg-white' alt="company" />
              </div>
              <div className="stars text-center mt-3 mb-5">
              {/* <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i> 
              </div>
              {companiesDetails.map((item, index) => (
                item === null?(<div className=" pt-4"></div>):
                item.status === false && item.name === "anwan" ? (
                  <div key={index} className="d-flex pt-4 justify-content-center">
                    <p className="soon-word">متوقفة مؤقتاً ...</p>
                  </div>
                ) : item.status === true && item.name === "anwan" ? (
                  <div key={index} className="d-flex pt-4 justify-content-between">
                    {userData.userData.data.user.rolle === "user"?(<h4>SAR {item.userprice}</h4>):
                    <h4></h4>}
                    <Link to="/anwanShipment" className="btn btn-choose">أختر</Link>
                  </div>
                ) : null
                ))}
            </div>
          </div> */}
    {/* </div >
    
          </div> */}
       
        
        <div className="col-md-6">
            <div className="company saee">
              <div className="text-center h-80">
             <img src={sae} alt="company" />
              </div>
              <div className="stars text-center mt-0">
              {/* <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i> */}
              </div>
              {companiesDetails.map((item, index) => (
                item === null?(<div></div>):
                item.status === false && item.name === "saee" ? (
                  <div key={index} className="d-flex pt-2 justify-content-center">
                    <p className="soon-word">متوقفة مؤقتاً ...</p>
                  </div>
                ) : item.status === true && item.name === "saee" ? (
                  <div key={index} className="d-flex pt-2 justify-content-between">
                   {userData.userData.data.user.rolle === "user"?(<h4>SAR {item.userprice}</h4>):
                   userData.userData.data.user.rolle === "marketer"?(<h4></h4>):
                   <h4></h4>}
                   <Link to="/saeeShipments" className="btn btn-choose">أختر</Link>
                  </div>
                ) : null
                ))}
              
            </div>
          </div>
          <div className="col-md-6">
            <div className="company jt">
              <div className="text-center h-80">
              <img src={jt} alt="company" />
              </div>
              <div className="stars text-center mt-0">
              {/* <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i> */}
              </div>
              {/* <div className="d-flex pt-4 justify-content-center">
                <p className="soon-word">قريباً ...</p>
              </div> */}
              {companiesDetails.map((item, index) => (
                item === null?(<div></div>):
                item.status === false && item.name === "jt" ? (
                  <div key={index} className="d-flex pt-2 justify-content-center">
                    <p className="soon-word">متوقفة مؤقتاً ...</p>
                  </div>
                ) : item.status === true && item.name === "jt" ? (
                  <div key={index} className="d-flex pt-2 justify-content-between">
                    {userData.userData.data.user.rolle === "user"?(<h4>SAR {item.userprice}</h4>):
                    <h4></h4>}
                <Link className="btn btn-choose" to='/jtShippments'>أختر</Link>
                  </div>
                ) : null
                ))} 
            </div>
          </div>
          <div className="col-md-6">
            <div className="company aramex">
              <div className="text-center h-80">
              <img src={armx} alt="company" />
              </div>
              <div className="stars text-center mt-0">
              {/* <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i> */}
              </div>
              {companiesDetails.map((item, index) => (
                item === null?(<div></div>):
                item.status === false && item.name === "aramex" ? (
                  <div key={index} className="d-flex pt-2 justify-content-center">
                    <p className="soon-word">متوقفة مؤقتاً ...</p>
                  </div>
                ) : item.status === true && item.name === "aramex" ? (
                  <div key={index} className="d-flex pt-2 justify-content-between">
                    {userData.userData.data.user.rolle === "user"?(<h4>SAR {item.userprice}</h4>):
                    <h4></h4>}
                    <Link to="/aramexShipment" className="btn btn-choose">أختر</Link>
                  </div>
                ) : null
                ))}
            </div>
          </div>
         
          <div className="col-md-6">
            <div className="company spl">
              <div className="text-center h-80">
              <img src={spl} alt="company" />
              </div>
              <div className="stars text-center mt-0">
              {/* <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i> */}
              </div>
              {/* <div className="d-flex pt-4 justify-content-center">
                <p className="soon-word">قريباً ...</p>
              </div> */}
              {companiesDetails.map((item, index) => (
                item === null?(<div></div>):
                item.status === false && item.name === "spl" ? (
                  <div key={index} className="d-flex pt-2 justify-content-center">
                    <p className="soon-word">متوقفة مؤقتاً ...</p>
                  </div>
                ) : item.status === true && item.name === "spl" ? (
                  <div key={index} className="d-flex pt-2 justify-content-between">
                    {userData.userData.data.user.rolle === "user"?(<h4>SAR {item.userprice}</h4>):
                    <h4></h4>}
                    <Link to="/splShipment" className="btn btn-choose">أختر</Link>
                  </div>
                ) : null
                ))}
              
              
            </div>
          </div>
          
          <div className="col-md-6">
            <div className="company imile">
              <div className="text-center h-80">
              <img src={imile} alt="company" />
              </div>
              <div className="stars text-center mt-0">
              {/* <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i> */}
              </div>
              {companiesDetails.map((item, index) => (
                item === null?(<div></div>):
                item.status === false && item.name === "imile" ? (
                  <div key={index} className="d-flex pt-2 justify-content-center">
                    <p className="soon-word">متوقفة مؤقتاً ...</p>
                  </div>
                ) : item.status === true && item.name === "imile" ? (
                  <div key={index} className="">
                    {userData.userData.data.user.rolle === "user"?
                    (
                    //   <div className="d-flex pt-4 justify-content-center">
                    // <p className="soon-word"> قريباً  ...</p>
                    // </div>
                    <div className="d-flex pt-2 justify-content-between">
                    <h4>SAR {item.userprice}</h4>
                   <Link className="btn btn-choose" onClick={openModal}>أختر</Link>
                   </div>
                    ):
                    <>
                 <div className="d-flex pt-4 justify-content-between">
                    <h4></h4>
                    <Link to="/imileShippments" className="btn btn-choose">أختر</Link>
                    </div>
</>
                    }

                  </div>
                ) : null
                ))}
              {/* <div className="d-flex pt-4 justify-content-between">
                <h4></h4>
                <Link className="btn btn-choose" onClick={openModal}>أختر</Link>
              </div> */}
            </div>
          </div>
          <div className="col-md-6">
            <div className="company smsa">
              <div className="text-center h-80">
              <img src={sms} alt="company" />
              </div>
              <div className="stars text-center mt-0">
              {/* <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i> */}
              </div>
              <div className="d-flex pt-2 justify-content-center">
                <p className="soon-word">قريباً ...</p>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="company dhl">
              <div className="text-center h-80">
              <img src={dhl} alt="company" />
              </div>
              <div className="stars text-center mt-0">
              {/* <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i> */}
              </div>
              <div className="d-flex pt-2 justify-content-center">
                <p className="soon-word">قريباً ...</p>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="company jonex">
              <div className="text-center h-80">
              <img src={jonex} alt="company" />
              </div>
              <div className="stars text-center mt-0">
              {/* <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i> */}
              </div>
              <div className="d-flex pt-2 justify-content-center">
                <p className="soon-word">قريباً ...</p>
              </div>
            </div>
          </div>
          
          <div className="col-md-6">
            <div className="company aymkan">
              <div className="text-center h-80">
              <img src={mkan} alt="company" />
              </div>
              <div className="stars text-center mt-0">
              {/* <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i> */}
              </div>
              <div className="d-flex pt-2 justify-content-center">
                <p className="soon-word">قريباً ...</p>
              </div>
            </div>
          </div>
          
          <div className="col-md-6">
            <div className="company glt">
              <div className="text-center h-80">
              <img src={glt} alt="company" />
              </div>
              <div className="stars text-center mt-0">
              {/* <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i> */}
              </div>
              {companiesDetails.map((item, index) => (
                item === null?(<div></div>):
                item.status === false && item.name === "glt" ? (
                  <div key={index} className="d-flex pt-2 justify-content-center">
                    <p className="soon-word">متوقفة مؤقتاً ...</p>
                  </div>
                ) : item.status === true && item.name === "glt" ? (
                  <div key={index} className="d-flex pt-2 justify-content-between">
                    {userData.userData.data.user.rolle === "user"?(<h4>SAR {item.userprice}</h4>):
                    <h4></h4>}
                   {/* userData.userData.data.user.roll === "admin"?(<h4>SAR {item.marketerprice}</h4>):null} */}
                    <Link to="/gltOrders" className="btn btn-choose">أختر</Link>
                  </div>
                ) : null
                ))}
              
            </div>
          </div>
          
        </div>
      </div>
      </div>
    </div>
    <Modal show={showModal} onHide={closeModal}>
        <Modal.Header >
          <Modal.Title>شركة
            iMile </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Your content inside the modal */}
          <div className='text-center'>
          <Link to="/addClientAll" className="btn btn-dark m-2">إضافة عميل</Link>
          <Link to="/imileShippments" className="btn btn-orange m-2">عمل شحنة </Link>            
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
          إغلاق
          </Button>
          {/* Additional buttons or actions can be added here */}
        </Modal.Footer>
      </Modal>
    </>
      )
}


