import axios from 'axios';
import Joi from 'joi';
import React, { useState ,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom'
import logo from '../../assets/tup.PNG'
import { Link } from 'react-router-dom'

export default function ActivateUser() {
    let navigate= useNavigate();
    let allparams= useParams()
    const [responseMsg, setResponseMsg]=useState(true)

    useEffect(()=>{
        sendDataToApi();
        },[])

    async function sendDataToApi() {
        try {
          const response = await axios.get(
            `https://dashboard.go-tex.net/api/user/activate-user/${allparams.code}/${allparams.id}`);
      
          if (response.status === 200) {
            console.log(response);
            window.alert('تم توثيق الايميل بنجاح');
            navigate('/');
            setResponseMsg(true)
          } else {
            console.log(response.data.msg);
          }
        } catch (error) {
          console.log(error);
          window.alert(error.response.data.msg);
          setResponseMsg(false)
        }
      }
      async function verifytUserAgain() {
        try {
          const response = await axios.get('https://dashboard.go-tex.net/api/user/resend-activate-code',
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('userToken')}`,
            },
          });
          const balance = response.data.msg;
          console.log(balance)
        } catch (error) {
          console.error(error);
        }
      }

  return (
    <div className="verify-container min-vh-100 d-flex justify-content-center align-items-center">
        <div className="verify-box">
        <div className="text-center">
          <img className='m-auto logo' src={logo} alt="logo" />
        </div>
        <p className='py-3'>
            {responseMsg == true? 'تم توثيق الايميل بنجاح':'لم يتم توثيق الايميل قم بتوثيقه مرة اخرى..'}
        </p>
        <div className="btns d-flex justify-content-between align-items-center">
            <button className="verify-btn btn" onClick={verifytUserAgain}>توثيق الايميل مرة أخرى</button>
            <Link className='loginlink' to="/">تسجيل الدخول</Link>
        </div>
        </div>
    </div>    
  )
}
