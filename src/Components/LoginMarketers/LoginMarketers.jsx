import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Joi from 'joi';
import { Link } from 'react-router-dom';
import logo from '../../assets/tup.PNG'

export default function LoginMarketers({saveMarketerData}) {
    let navigate= useNavigate(); //hoke
  const [errorList, seterrorList]= useState([]); 
  const [theUser,setUser] =useState({
    email:'',
    password:''
  })
  const [visible , setVisible] =useState(false);
  const [error , setError]= useState('')
  const [isLoading, setisLoading] =useState(false)

  async function sendLoginDataToApi(){
    try {
      const {data} = await axios.post('https://dashboard.go-tex.net/api/markter/login', theUser);
      if (data.msg === 'ok') {
        navigate('/marketersShipments');
        localStorage.setItem('marketerToken', data.token);
       
        console.log(data.token);
        setisLoading(false);
        saveMarketerData();
      } else {
        setisLoading(true);
        setError(data.msg);
        console.log(data.msg);
      }
    } catch (error) {
      setisLoading(true)
      console.log(error);
      window.alert('كلمة المرور او البريد الالكترونى قد يكون خطأ');
    }
  }
  


    
        function submitLoginForm(e) {
          e.preventDefault();
          setisLoading(true);
          let validation = validateLoginForm();
          console.log(validation);
          if (validation.error) {
            setisLoading(false);
            seterrorList(validation.error.details);
          } else {
            
              sendLoginDataToApi();
            
          }
        }

  function getUserData(e){
    let myUser={...theUser};
    myUser[e.target.name]= e.target.value;
    setUser(myUser);
    console.log(myUser);
  }

  function validateLoginForm(){
    let scheme= Joi.object({
      email:Joi.string().email({ tlds: { allow: ['com', 'net','lol'] }}).required(),
      password:Joi.string().required()

    });
    return scheme.validate(theUser, {abortEarly:false});
  }
  return (
    <>
        {/* {sessionExpired && showAlertAndRedirect()} */}

    <div className="d-flex min-vh-100 login-container px-3">
    <div className="login-box m-auto">
        <div className="text-center">
    <img className='m-auto' src={logo} alt="logo" />
    </div>
    {error.length >0 ?<div className='alert alert-danger my-2'>{error}</div>:''}
    <form onSubmit={submitLoginForm} className='my-3' action="">
      <label htmlFor="email">البريد الإلكترونى :</label>
      <input onChange={getUserData} type="email" className='my-input my-2 form-control' name='email' id='email' />
      {/* {errorList.filter((err)=> err.context.label == 'email')[0]?
      <div className="alert alert-danger my-2">{errorList.filter((err)=> err.context.label =='email')[0]?.message}</div>:''
      } */}
      {errorList.map((err,index)=>{
      if(err.context.label ==='email'){
        return <div key={index} className="alert alert-danger my-2">الايميل يجب ان يكون بريدا الكتروني صحيح</div>
      }
      
    })}
      <label htmlFor="password">كلمة المرور :</label>
      <div className='pass-box'>
      <input onChange={getUserData} type={visible? "text" :"password"} className='my-input my-2 form-control pass' name='password' id='password' />
      <span onClick={()=> setVisible(!visible)} className="seenpass">
      {visible?<i class="fa-regular fa-eye "></i> : <i class="fa-regular fa-eye-slash "></i> }
      </span>
      {errorList.map((err,index)=>{
      if(err.context.label ==='password'){
        return <div key={index} className="alert alert-danger my-2">كلمة المرور غير صحيحة</div>
      }
      
    })}
    </div>
      {/* <Link className='pt-2' to="/forgetPassword">هل نسيت كلمة المرور؟</Link> <br/> */}
      <button className='btn btn-login'>
      {isLoading == true?<i class="fa-solid fa-spinner fa-spin"></i>:' تسجيل الدخول'}
       
      </button>
     </form>
     <div className='text-center sign-footer'>
      <p className='p-footer'>ليس لديك حساب ؟ <Link className='sign-link' to='/signupMarketers'>قم بعمل حساب جديد..</Link> </p>
     </div>
     {/* <div className='text-center'>
      <p className='mb-0 p-footer'> للإنضمام للعمل مع فريق جوتكس : <Link className='sign-link' to='/marketerSignUp'>قم بالتسجيل هنا  ..</Link> </p>
     </div> */}
     </div>
     </div>
    </>
  )
}
