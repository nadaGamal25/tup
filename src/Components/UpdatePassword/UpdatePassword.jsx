import axios from 'axios';
import Joi from 'joi';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom'


export default function UpdatePassword() {
    let navigate= useNavigate(); //hoke
    const [visible , setVisible] =useState(false);
    const [errorList, seterrorList]= useState([]); 
    const [theUser,setUser] =useState({
        password: "",
        passwordconfirm:"",
    })
    const [error , setError]= useState('')
    const [isLoading, setisLoading] =useState(false)
    
    let allparams= useParams()

    async function sendDataToApi() {
        try {
          const response = await axios.post(
            'https://dashboard.go-tex.net/api/user/update-password',
            {
              password: theUser.password,
              code: allparams.x,
            }
          );
      
          if (response.status === 200) {
            console.log(response.data);
            setisLoading(false);
            window.alert('تم تغيير كلمة المرور بنجاح');
            navigate('/');
          } else {
            setisLoading(false);
            setError(response.data.msg);
            console.log(response.data.msg);
          }
        } catch (error) {
          console.log(error);
          window.alert(error.response.data.msg);
        }
      }
      
      
    
//   async function sendDataToApi(){
//     try {
//           const response = await axios.post('https://dashboard.go-tex.net/api/user/update-password', theUser,
//           {
//             body: {code: `${allparams.x}`},
//           });
//           if (response.status === 200) {
//             console.log(response.data)
//             setisLoading(false)
//             window.alert('تم تغيير كلمة المرور بنجاح')
//             navigate('/');
//           } else {
//             setisLoading(false)
//             setError(response.data.msg)
//             console.log(response.data.msg)
//           }
//         } catch (error) {
//           console.log(error);
//           window.alert(error.response.data.msg);
//         }
//       }
  
          function submitForm(e) {
            e.preventDefault();
            setisLoading(true);
            let validation = validateForm();
            console.log(validation);
            if (validation.error) {
              setisLoading(false);
              seterrorList(validation.error.details);
            } else {
              
                sendDataToApi();
              
            }
          }
  
    function getUserData(e){
      let myUser={...theUser};
      myUser[e.target.name]= e.target.value;
      setUser(myUser);
      console.log(myUser);
    }
  
    function validateForm(){
      let scheme= Joi.object({
        password:Joi.string().pattern(/^(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/
        ).required(),
        passwordconfirm: Joi.valid(Joi.ref('password')).required().messages({
          'any.only': 'Passwords do not match',
          'any.required': 'Password confirmation is required',
        }),  
      });
      return scheme.validate(theUser, {abortEarly:false});
    }

  return (
<>
    <div className="d-flex min-vh-100 login-container px-3">
        <div className="email-box m-auto">
            <p>يرجى إدخال كلمة المرور الجديدة</p>
            <form onSubmit={submitForm} className='my-3' action="">
            <label htmlFor="password">كلمة المرور الجديدة:</label>
      <div className='pass-box'>
      <input onChange={getUserData} type={visible? "text" :"password"} className='my-input mb-4 form-control pass' name='password' id='password' />
      <span onClick={()=> setVisible(!visible)} className="seenpass">
      {visible?<i class="fa-regular fa-eye "></i> : <i class="fa-regular fa-eye-slash "></i> }
      </span>
      {errorList.map((err,index)=>{
      if(err.context.label ==='password'){
        return <div key={index} className="alert alert-danger my-2">كلمة المرور غير صحيحة</div>
      }
      
    })}
    </div>
    <label htmlFor="passwordconfirm">تأكيد كلمة المرور :</label>
      <div className='pass-box'>
      <input onChange={getUserData} type={visible? "text" :"password"} className='my-input mb-2 form-control' name='passwordconfirm' id='passwordconfirm' />
      <span onClick={()=> setVisible(!visible)} className="seenpass">
      </span>
      {errorList.map((err,index)=>{
      if(err.context.label ==='passwordconfirm'){
        return <div key={index} className="alert alert-danger my-2">كلمة السر غير متطابقة</div>
      }
      
    })}
    </div>
                <hr />
            <button className="btn btn-primary">تغيير</button>
            </form>
        </div>
    </div>
    </>
      )
}
