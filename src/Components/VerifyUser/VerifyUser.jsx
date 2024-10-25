import React from 'react'
import logo from '../../assets/tup.PNG'
import { Link } from 'react-router-dom'
import axios from 'axios';

export default function VerifyUser() {
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
    <>
    <div className="verify-container min-vh-100 d-flex justify-content-center align-items-center">
        <div className="verify-box">
        <div className="text-center">
          <img className='m-auto logo' src={logo} alt="logo" />
        </div>
        <p className='py-3'>قبل البدء يجب توثيق الايميل المسجل من خلال النقر على الرابط الذى أرسلناه اليك عبر بريدك الالكترونى..اذا لم تتلق الايميل فسنرسل لك مرة اخرى.</p>
        <div className="btns d-flex justify-content-between align-items-center">
            <button className="verify-btn btn" onClick={verifytUserAgain}>توثيق الايميل مرة أخرى</button>
            <Link className='loginlink' to="/">تسجيل الدخول</Link>
        </div>
        </div>
    </div>
    </>
  )
}
