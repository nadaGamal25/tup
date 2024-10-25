
import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Joi from 'joi';
import { Link } from 'react-router-dom';
import logo from '../../assets/tup.PNG';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css'
import ar from 'react-phone-number-input/locale/ar'
export default function Register() {

  let navigate= useNavigate(); //hoke
  const [visible , setVisible] =useState(false);
  const [errorList, seterrorList]= useState([]); 
  const [user,setUser] =useState({
    name:'',
    mobile:'',
    email:'',
    password:'',
    passwordconfirm:'',
    address:'',
    location:'',
  })
  const [error , setError]= useState('')
  const [isLoading, setisLoading] =useState(false)
  const [value ,setPhoneValue]=useState()

  async function sendRegisterDataToApi(){
    let {data}= await axios.post(`https://dashboard.go-tex.net:5000/user/signup`,user);
    if(data.message == 'success'){
      setisLoading(false)
      console.log(data)
      console.log("yes")
      navigate('/login')
  
    }
    else{
      setisLoading(false)
      setError(data.message)
    }
  }


  
function submitRegisterForm(e){
  e.preventDefault();
  setisLoading(true)
  seterrorList([]); 
  let validation = validateRegisterForm();
  console.log(validation);
  if(validation.error){
    setisLoading(false)
    seterrorList(validation.error.details)

  }else{
    if (user.password !== user.passwordconfirm) {
    setError('Passwords do not match');
    setisLoading(false);
    return;
  }else{
    sendRegisterDataToApi();
  }
  }
}

  function getUserData(e){
    if (e && e.target) {
    let myUser={...user};
    myUser[e.target.name]= e.target.value;
    setUser(myUser);
    console.log(myUser);
    }
  }

  function validateRegisterForm(){
    let scheme= Joi.object({
      name:Joi.string().min(3).max(10).required(),
      mobile:Joi.string(),
      email:Joi.string().email({ tlds: { allow: ['com', 'net'] }}).required(),
      password:Joi.string(),
      // password:Joi.string().pattern(/^[a-zA-Z0-9]{8,}$/),
    //   passwordconfirm: Joi.any().valid(Joi.ref('password')).required(),
    passwordconfirm: Joi.valid(Joi.ref('password')).required().messages({
        'any.only': 'Passwords do not match',
        'any.required': 'Password confirmation is required',
      }),
      address:Joi.string().required(),
      location:Joi.string().required(),

    });
    return scheme.validate(user, {abortEarly:false});
  }
  return (
    <>
    <div className="d-flex min-vh-100 p-5 register-container">
    <div className="register-box m-auto">
    <div className="text-center">
    <img className='m-auto logo' src={logo} alt="logo" />
    </div>
    
    {error.length >0 ?<div className='alert alert-danger my-2'>{error}</div>:''}
    <form onSubmit={submitRegisterForm} className='my-3' action="">
      <label htmlFor="name">اسم المتجر :</label>
      <input onChange={getUserData} type="text" className='my-input my-2 form-control' name='name' id='name' />
      {errorList.map((err,index)=>{
      if(err.context.label ==='name'){
        return <div key={index} className="alert alert-danger my-2">يجب ملىء جميع البيانات</div>
      }
      
    })}
    <label htmlFor="email">البريد الالكترونى :</label>
      <input onChange={getUserData} type="email" className='my-input my-2 form-control' name='email' id='email' />
      {errorList.map((err,index)=>{
      if(err.context.label ==='email'){
        return <div key={index} className="alert alert-danger my-2">الايميل يجب ان يكون بريدا الكتروني صحيح</div>
      }
      
    })}
      <label htmlFor="password">كلمة المرور :</label>
      <div className='pass-box'>
      <input onChange={getUserData} type={visible? "text" :"password"} className='my-input my-2 form-control' name='password' id='password' />
      <span onClick={()=> setVisible(!visible)} className="seenpass">
      {visible?<i class="fa-regular fa-eye "></i> : <i class="fa-regular fa-eye-slash "></i> }
      </span>
      {errorList.map((err,index)=>{
      if(err.context.label ==='password'){
        return <div key={index} className="alert alert-danger my-2">كلمة المرور يجب ان  لا تقل عن ثمانية احرف وارقام على الاقل</div>
      }
      
    })}
    </div>
      <label htmlFor="passwordconfirm">تأكيد كلمة المرور :</label>
      <div className='pass-box'>
      <input onChange={getUserData} type={visible? "text" :"password"} className='my-input my-2 form-control' name='passwordconfirm' id='passwordconfirm' />
      <span onClick={()=> setVisible(!visible)} className="seenpass">
      </span>
      {/* {error.length >0 ?<div className='alert alert-danger my-2'>{error}</div>:''} */}
      {errorList.map((err,index)=>{
      if(err.context.label ==='passwordconfirm'){
        return <div key={index} className="alert alert-danger my-2">كلمة السر غير متطابقة</div>
      }
      
    })}
    </div>
     
    <label htmlFor="mobile">رقم الهاتف :</label>
    <input onChange={getUserData} type="text" className='my-input my-2 form-control' name='mobile' id='mobile' />
    {errorList.map((err,index)=>{
      if(err.context.label ==='mobile'){
        return <div key={index} className="alert alert-danger my-2">يجب ملىء جميع البيانات</div>
      }
      
    })}
    {/* <PhoneInput name='mobile' 
    labels={ar} defaultCountry='EG' className='phoneInput' value={value}
    onChange={(value, country, e) => {
      setPhoneValue(value);
      getUserData(e);
    }}/> */}
      
      
      <label htmlFor="address">العنوان :</label>
      <input onChange={getUserData} type="text" className='my-input my-2 form-control' name='address' id='address' />
      {errorList.map((err,index)=>{
      if(err.context.label ==='address'){
        return <div key={index} className="alert alert-danger my-2">يجب ملىء جميع البيانات</div>
      }
      
    })}
      <label htmlFor="location">الموقع(المدينة-المحافظة) :</label>
      <input onChange={getUserData} type="text" className='my-input my-2 form-control' name='location' id='location' />
      {errorList.map((err,index)=>{
      if(err.context.label ==='location'){
        return <div key={index} className="alert alert-danger my-2">يجب ملىء جميع البيانات</div>
      }
      
    })}
      <button className='btn btn-signup'>
        {isLoading == true?<i class="fa-solid fa-spinner fa-spin"></i>:'انشاء حساب'}
      </button>
     </form>
     
     <div className='text-center'>
      <p>هل لديك حساب بالفعل؟ <Link className='sign-link' to='/'>قم بتسجيل الدخول..</Link> </p>
     </div>
     </div>
     </div>
     
    </>
  )
}
{/* {errorList.length > 0 && (
      <div className="alert alert-danger">
        <ul>
          {errorList.map((error, index) => (
            <li key={index}>{error.message}</li>
          ))}
        </ul>
      </div>
    )} */}
     {/* <label htmlFor="phone">رقم الهاتف :</label>
      <input onChange={getUserData} type="text" className='my-input my-2 form-control' name='phone' id='phone' />
      {errorList.map((err,index)=>{
      if(err.context.label ==='phone'){
        return <div key={index} className="alert alert-danger my-2">يجب ملىء جميع البيانات</div>
      }
      
    })} */}
    // async function sendRegisterDataToApi(){
//     if (user.password !== user.passwordconfirm) {
//         setError('Passwords do not match');
//         setisLoading(false);
//         return;
//       }
// //   let {data}= await axios.post(``,user);
// //   if(data.message == 'success'){
// //     setisLoading(false)
// //     navigate('/login')

// //   }
// //   else{
// //     setisLoading(false)
// //     setError(data.message)
// //   }
// }
// async function sendRegisterDataToApi(){
//     console.log('sending data', user);
    
  
//     // try {
//     //   const response = await axios.post(``, user);
//     //   console.log('response', response.data);
//     //   if (response.data.message === 'success') {
//     //     setisLoading(false);
//     //     navigate('/login');
//     //   } else {
//     //     setisLoading(false);
//     //     setError(response.data.message);
//     //   }
//     // } catch (error) {
//     //   setisLoading(false);
//     //   setError(error.message);
//     // }
//   }