import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Joi from 'joi';
import { Link } from 'react-router-dom';
import logo from '../../assets/tup.PNG'

export default function Login({saveUserData}) {

  let navigate= useNavigate(); //hoke
  const [errorList, seterrorList]= useState([]); 
  const [theUser,setUser] =useState({
    email:'',
    password:''
  })
  const [visible , setVisible] =useState(false);
  const [error , setError]= useState('')
  const [isLoading, setisLoading] =useState(false)
  
//   // const [sessionExpired, setSessionExpired] = useState(false);
//   const [loginTime, setLoginTime] = useState(null);
// const [sessionExpired, setSessionExpired] = useState(false);
// function checkSessionExpired() {
//   const currentTime = new Date().getTime();
//   console.log(currentTime)
//   const oneHour = 10000; // One hour in milliseconds

//   if (loginTime && currentTime - loginTime >= oneHour) {
//     setSessionExpired(true);
//   }
// }

// useEffect(() => {
//   checkSessionExpired();

//   const interval = setInterval(() => {
//     checkSessionExpired();
//   }, 1000); // Check every second

//   return () => clearInterval(interval); // Clean up the interval when the component unmounts
// }, [loginTime]);

// function showAlertAndRedirect() {
//   window.alert('الجلسة انتهت .. قم بتسجيل الدخول مرة أخرى');
//   navigate('/');
// }


  // useEffect(() => {
  //   let countdown;
  //   const sessionDuration = 10000; // 1 hour in milliseconds

  //   if (sessionExpired) {
  //     const logout = () => {
  //       console.log('الجلسة انتهت .. قم بتسجيل الدخول مرة اخرى');
  //       navigate('/');
  //     };

  //     countdown = setTimeout(logout, sessionDuration);

  //     console.log('Session countdown started');

  //     const remainingTime = sessionDuration / 1000; // Convert milliseconds to seconds
  //     console.log(`Remaining time: ${remainingTime} seconds`);
  //   }

  //   return () => {
  //     clearTimeout(countdown);
  //   };
  // }, [sessionExpired, navigate]);
  
  function navigationCompany(){
  navigate('/companies');

  }
  async function sendLoginDataToApi(){
    try {
      const {data} = await axios.post(`https://dashboard.go-tex.net/api/user/login`, theUser);
      if (data.msg === 'ok') {
        navigate('/companies');
        localStorage.setItem('userToken', data.token);
        // navigationCompany('', () => {
        //   console.log(data.token);
        //   setisLoading(false);
        //   saveUserData();
        // });
        console.log(data.token);
        setisLoading(false);
         saveUserData();
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
  
// async function sendLoginDataToApi(){
//   try {
//         const {data} = await axios.post('https://dashboard.go-tex.net/api/user/login', theUser);
//         if (data.msg === 'ok') {
//           await navigate('/companies');
//           console.log(data.token)
//           setisLoading(false)
//           localStorage.setItem('userToken', data.token);
//           saveUserData();
//         } else {
//           setisLoading(false)
//           setError(data.msg)
//           console.log(data.msg)
//         }
//       } catch (error) {
//         console.log(error);
//         window.alert('كلمة المرور او البريد الالكترونى قد يكون خطأ');
//       }
//     }


    async function sendLoginAdminToApi(){
      try {
            const {data} = await axios.post('https://dashboard.go-tex.net/api/admin/login', theUser);
            if (data.msg === 'ok') {
              navigate('/companiesAdmin');
              console.log(data.token)
              setisLoading(false)
              localStorage.setItem('userToken', data.token);
              saveUserData();
            } else {
              setisLoading(false)

              setError(data.msg)
              console.log(data.msg)
            }
          } catch (error) {
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
            if (theUser.email === 'admin@gotex.com' || theUser.email === 'aljawadcompany07@gmail.com') {
              sendLoginAdminToApi();
            } else {
              sendLoginDataToApi();
            }
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
      email:Joi.string().email({ tlds: { allow: ['com', 'net','lol','info','pro'] }}).required(),
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
      <Link className='pt-2' to="/forgetPassword">هل نسيت كلمة المرور؟</Link> <br/>
      <button className='btn btn-login'>
      {isLoading == true?<i class="fa-solid fa-spinner fa-spin"></i>:' تسجيل الدخول'}
       
      </button>
     </form>
     <div className='text-center sign-footer'>
      <p className='p-footer'>هل أنت جديد فى المنصة؟ <Link className='sign-link' to='/register'>قم بعمل حساب جديد..</Link> </p>
     </div>
    
     </div>

     </div>
    </>
  )
}



  // async function sendLoginDataToApi() {
  //   try {
  //     const { data } = await axios.post('https://dashboard.go-tex.net:5000/user/signup', theUser);
  //     if (data.msg === 'ok') {
  //       setisLoading(false);
  //       navigate('/companies');
  //     } else {
  //       setisLoading(false);
  //       setError(data.msg);
  //     }
  //   } catch (error) {
  //     setisLoading(false);
  //     setError('An error occurred while logging in');
  //   }
  // }

  
//   let {data}= await axios.post(`https://dashboard.go-tex.net/api/user/login`,theUser);
//   if(data.msg == 'ok'){
//     console.log(data.token)
//     setisLoading(false)
//     localStorage.setItem('userToken', data.token);
//     saveUserData();
//     navigate('/companies');
//   }
//   else{
//     setisLoading(false)
//     setError(data.msg)
//     window.alert("lol")
//     console.log(data.msg)
//     console.log(data.response.data.msg)
//   }
// }