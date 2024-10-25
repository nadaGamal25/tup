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
import logo from '../../assets/tup.PNG';
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';


export default function CompaniesAdmin() {
  // const [sessionExpired, setSessionExpired] = useState(true);
  // let navigate= useNavigate(); //hoke
  // useEffect(() => {
  //   let sessionTimeout;

  //   if (sessionExpired) {
  //     sessionTimeout = setTimeout(() => {
  //       alert('الجلسة انتهت .. قم بتسجيل الدخول مرة اخرى');
  //       navigate('/');
  //     }, 5000); // 10 seconds for testing, change to 1 hour (3600000 milliseconds) in production
  //   }

  //   return () => {
  //     clearTimeout(sessionTimeout);
  //   };
  // }, [sessionExpired, navigate]);
  useEffect(()=>{
    getCompaniesDetailsOrders()
  },[])
  const [companiesDetails,setCompaniesDetails]=useState([])

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
  return (
<>
    <div className='paddingCompanies' id='content'>
      <div className="container">
      <div className="clients-table p-4 my-4">
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col"> الشركة</th>
            <th scope="col">سعر المستخدم</th>
            <th scope="col">سعر المدخلات</th>
            <th scope="col">سعر الزيادة </th>
            <th scope="col">سعر الcod </th>
            <th scope="col">أكبر سعر للمسوقين  </th>
            <th scope="col">أقل سعر للمسوقين  </th>
          </tr>
        </thead>
        <tbody>
          {companiesDetails.map((item,index) =>(
            item !== null ? (
              <tr key={index}>
                <td>{index+1}</td>
                {item.name?<td>{item.name}</td>:<td>_</td>}
                {item.userprice?<td>{item.userprice}</td>:<td>_</td>}
                {item.marketerprice?<td>{item.marketerprice}</td>:<td>_</td>}
                {item.kgprice?<td>{item.kgprice}</td>:<td>_</td>}
                {item.codprice?<td>{item.codprice}</td>:<td>_</td>}
                {item.maxcodmarkteer?<td>{item.maxcodmarkteer}</td>:<td>_</td>}
                {item.mincodmarkteer?<td>{item.mincodmarkteer}</td>:<td>_</td>}
              </tr>
            ): null
          )
          
          // {
          //   return(
          //     <tr key={index}>
          //       <td>{index+1}</td>
          //       {/* {item.name?<td>{item.name}</td>:<td>_</td>} */}
          //       {/* {item.name? <td>{item.name}</td> :<td>_</td>} */}
          //       {/* <td>{item.userprice}</td>
          //       <td>{item.marketerprice}</td>
          //       <td>{item.kgprice}</td> */}
          //     </tr>
          //   )
          // }
          )}
        </tbody>
      </table>
     </div>
        <div className="row g-4">
        {/* <div className="col-md-6">
            <div className="company">
              <div className="text-center">
              <img className='bg-white' src={logo} alt="company" />
              </div>
              <div className="stars text-center mt-3">
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              </div>
              <div className="d-flex pt-4 justify-content-between">
                <h4></h4>
                <Link to="/anwanEdit" className="btn btn-choose">تعديل</Link>
              </div>
            </div>
          </div> */}
        <div className="col-md-6">
            <div className="company">
              <div className="text-center">
              <img src={sae} alt="company" />
              </div>
              <div className="stars text-center mt-3">
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              </div>
              <div className="d-flex pt-4 justify-content-between">
                <h4></h4>
                <Link to="/saeeEdit" className="btn btn-choose">تعديل</Link>
              </div>
            </div>
          </div>
         
          <div className="col-md-6">
            <div className="company">
              <div className="text-center">
              <img src={armx} alt="company" />
              </div>
              <div className="stars text-center mt-3">
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              </div>
              <div className="d-flex pt-4 justify-content-between">
                <h4></h4>
                <Link to='/aramexEdit' className="btn btn-choose">تعديل</Link>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="company">
              <div className="text-center">
              <img src={sms} alt="company" />
              </div>
              <div className="stars text-center mt-3">
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              </div>
              <div className="d-flex pt-4 justify-content-between">
                <h4></h4>
                <Link to="/smsaEdit" className="btn btn-choose">تعديل</Link>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="company">
              <div className="text-center">
              <img src={spl} alt="company" />
              </div>
              <div className="stars text-center mt-3">
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              </div>
              <div className="d-flex pt-4 justify-content-between">
                <h4></h4>
                <Link to='/splEdit' className="btn btn-choose">تعديل</Link>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="company">
              <div className="text-center">
              <img src={glt} alt="company" />
              </div>
              <div className="stars text-center mt-3">
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              </div>
              <div className="d-flex pt-4 justify-content-between">
                <h4></h4>
                <Link to='/gltEdit' className="btn btn-choose">تعديل</Link>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="company">
              <div className="text-center">
              <img src={jt} alt="company" />
              </div>
              <div className="stars text-center mt-3">
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              </div>
              <div className="d-flex pt-4 justify-content-between">
                <h4></h4>
                <Link to="/jtEdit" className="btn btn-choose">تعديل</Link>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="company">
              <div className="text-center">
              <img src={imile} alt="company" />
              </div>
              <div className="stars text-center mt-3">
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              </div>
              <div className="d-flex pt-4 justify-content-between">
                <h4></h4>
                <Link to="/imileEdit" className="btn btn-choose">تعديل</Link>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="company">
              <div className="text-center">
              <img src={jonex} alt="company" />
              </div>
              <div className="stars text-center mt-3">
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              </div>
              <div className="d-flex pt-4 justify-content-center">
                <p className="soon-word">قريباً ...</p>
              </div>
            </div>
          </div>
          
          <div className="col-md-6">
            <div className="company">
              <div className="text-center">
              <img src={mkan} alt="company" />
              </div>
              <div className="stars text-center mt-3">
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              </div>
              <div className="d-flex pt-4 justify-content-center">
                <p className="soon-word">قريباً ...</p>
              </div>
            </div>
          </div>
          
          
          
        </div>
      </div>
    </div>
    </>  )
}
