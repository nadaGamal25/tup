import axios from 'axios';
import Joi from 'joi';
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'

export default function FormPayment() {
  const [errorList, seterrorList]= useState([]); 
    const [theUser,setUser] =useState({
        amount: "",
    })
    const [error , setError]= useState('')
    const [isLoading, setisLoading] =useState(false)
    
    let allparams= useParams()

    async function sendDataToApi() {
        try {
          const response = await axios.post(
            `https://dashboard.go-tex.net/api/markter/genrate-cc-link/${allparams.uId}/${allparams.cId}`,
            {
              amount: theUser.amount,
            }
          );
      
          if (response.status === 200) {
            setisLoading(false);
            console.log(response);
            window.alert('يرجى ملئ جميع البيانات التالية ')
            const stickerUrl = `${response.data.data.url}`;
         const newTab = window.open();
         newTab.location.href = stickerUrl;
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
        amount:Joi.number().required(),
        })
    
      return scheme.validate(theUser, {abortEarly:false});
    }

  return (
    <>
    <div className='d-flex min-vh-100 login-container px-3'>
            <div className="email-box m-auto">
              
                  <p className="text-center mb-3">شحن رصيد</p>
                  <form onSubmit={submitForm} action="">
                    <label htmlFor="">قيمة الرصيد : </label>
                    <input onChange={getUserData} type="number"  step="0.001" className='my-input my-2 form-control'  name='amount' />
                    {errorList.map((err,index)=>{
      if(err.context.label ==='amount'){
        return <div key={index} className="alert alert-danger my-2">يجب ملىء جميع البيانات</div>
      }
      
    })}
    <hr/>
    <div className="text-center">
                    <button className='btn btn-primary mt-2'>
                    {isLoading == true?<i class="fa-solid fa-spinner fa-spin"></i>:'تأكيد'}
                   </button>
                   </div>
    </form>
    </div>
    
    </div>
    </>  )
}
