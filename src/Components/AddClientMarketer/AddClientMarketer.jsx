import React, { useEffect, useState } from 'react'
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css'
import ar from 'react-phone-number-input/locale/ar'
import axios from 'axios';
import Joi from 'joi';
import { Link } from 'react-router-dom';

export default function AddClientMarketer(userData) {
//   useEffect(()=>{
//     console.log(userData)
//   },[])
    const [value ,setPhoneValue]=useState()

    const [errorList, seterrorList]= useState([]); 
  const [clientData,setClientData] =useState({
    name:'',
    email:'',
    mobile:'',
    city:'',
    address:'',
  })
  const [error , setError]= useState('')
  const [isLoading, setisLoading] =useState(false)

  async function sendDataToApi() {
    console.log(localStorage.getItem('userToken'))
    try {
      const response = await axios.post(
        "https://dashboard.go-tex.net/api/user/add-new-clint",
        clientData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('userToken')}`,
          },
        }
      );
  
      if (response.status === 200) {
        setisLoading(false);
        window.alert("تمت اضافة العميل بنجاح");
        console.log(response.data.data);
        const clients = response.data.data;
        setClientData(clients);
        console.log(clients)      
    }
        else if (response.status === 400) {
        setisLoading(false);
        const errorMessage = response.data?.msg || "An error occurred.";
        window.alert(`${errorMessage}`);
        console.log(response.data);
      }
    } catch (error) {
      // Handle error
      console.error(error);
      setisLoading(false);
      const errorMessage = error.response?.data?.msg || "An error occurred.";
      window.alert(`${errorMessage}`);
    }
  }

function submitForm(e){
  e.preventDefault();
  setisLoading(true)
  let validation = validateForm();
  console.log(validation);
  if(validation.error){
    setisLoading(false)
    seterrorList(validation.error.details)

  }else{
    sendDataToApi();
  }

}

function getData(e) {
  let myData = { ...clientData };
  if (e.target.type === "number") { // Check if the value is a number
    myData[e.target.name] = Number(e.target.value);
  } else if (e.target.value === "true" || e.target.value === "false") {
    myData[e.target.name] = e.target.value === "true";
  } else {
    myData[e.target.name] = e.target.value;
  }

  setClientData(myData);
  console.log(myData);
  console.log(myData.cod);
}

  
  function validateForm(){
    let scheme= Joi.object({
        name:Joi.string().required(),
        email:Joi.string().email({ tlds: { allow: ['com', 'net','lol'] }}).required(),
        mobile:Joi.string().required(),
        city:Joi.string().required(),
        address:Joi.string().required(),
        
    });
    return scheme.validate(clientData, {abortEarly:false});
  } 
  return (
    <>
    <div className='p-4' id='content'>
        <div className="shipmenForm marginForm">
        <form onSubmit={submitForm} className='my-3' action="">
        <label htmlFor="name">الاسم  :</label>
      <input onChange={getData} type="name" className='my-input my-2 form-control' name='name' />
      
      {errorList.map((err,index)=>{
      if(err.context.label ==='name'){
        return <div key={index} className="alert alert-danger my-2">يجب ملئ جميع البيانات </div>
      }
      
    })}
      <label htmlFor="email">البريد الالكترونى :</label>
      <input onChange={getData} type="email" className='my-input my-2 form-control' name='email' id='email' />
      
      {errorList.map((err,index)=>{
      if(err.context.label ==='email'){
        return <div key={index} className="alert alert-danger my-2">الايميل يجب ان يكون بريدا الكتروني صحيح</div>
      }
      
    })}
    <label htmlFor="">رقم الهاتف</label>
                {/* <input type="text" className="form-control" /> */}
                <PhoneInput name='mobile' 
    labels={ar} defaultCountry='SA' dir='ltr' className='phoneInput my-2' value={value}
    onChange={(value) => {
      setPhoneValue(value);
      getData({ target: { name: 'mobile', value } });
    }}/>
    {errorList.map((err,index)=>{
      if(err.context.label ==='mobile'){
        return <div key={index} className="alert alert-danger my-2">يجب ملئ جميع البيانات </div>
      }
      
    })}
     <label htmlFor="city">الموقع(المدينة)  :</label>
      <input onChange={getData} type="city" className='my-input my-2 form-control' name='city' />
      
      {errorList.map((err,index)=>{
      if(err.context.label ==='city'){
        return <div key={index} className="alert alert-danger my-2">يجب ملئ جميع البيانات </div>
      }
      
    })}
     <label htmlFor="address">العنوان  :</label>
      <input onChange={getData} type="address" className='my-input my-2 form-control' name='address' />
      
      {errorList.map((err,index)=>{
      if(err.context.label ==='address'){
        return <div key={index} className="alert alert-danger my-2">يجب ملئ جميع البيانات </div>
      }
      
    })}
      <div className="text-center pt-2">
      <button className='btn btn-dark my-2'>
      إضافة عميل 
      </button>
      </div>
      
     </form>
        </div>
        </div>

</>  )
}

