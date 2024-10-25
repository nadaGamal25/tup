import React, { useEffect, useState } from 'react'
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css'
import ar from 'react-phone-number-input/locale/ar'
import axios from 'axios';
import Joi from 'joi';

export default function MarketerEditClient() {
    const [value ,setPhoneValue]=useState()

    const [errorList, seterrorList]= useState([]); 
  const [clientData,setClientData] =useState({
    client_id:"",
    business_name: "",
    first_name: "",
    last_name: "",
    email: "",
    address: "",
    city: "",
    state: "",
    phone: "",
    notes: "",
    category: "",
    birth_date: ""
  })
  const [error , setError]= useState('')
  const [isLoading, setisLoading] =useState(false)

  async function sendDataToApi() {
    console.log(localStorage.getItem('userToken'))
    try {
      const response = await axios.post(
        "https://dashboard.go-tex.net/api/daftra/edit-client-info",
        clientData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('userToken')}`,
          },
        }
      );
  
      if (response.status === 200) {
        setisLoading(false);
        window.alert("تم تعديل بيانات العميل بنجاح");
        console.log(response.data.data);
        const clients = response;
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
}

  
  function validateForm(){
    let scheme= Joi.object({
        first_name:Joi.string().allow(null, ''),
        last_name:Joi.string().allow(null, ''),
        business_name:Joi.string().allow(null, ''),
        email:Joi.string().email({ tlds: { allow: ['com', 'net','lol'] }}).allow(null, ''),
        phone:Joi.string().allow(null, ''),
        city:Joi.string().allow(null, ''),
        address:Joi.string().allow(null, ''),
        state:Joi.string().allow(null, ''),
        category:Joi.string().allow(null, ''),
        notes:Joi.string().allow(null, ''),
        birth_date:Joi.date().allow(null, ''), 
        client_id:Joi.string(),    
    });
    return scheme.validate(clientData, {abortEarly:false});
  } 
  return (
    <>
    <div className='p-4' id='content'>
        <div className="shipmenForm marginForm">
        <form onSubmit={submitForm} className='my-3' action="">
            <div className="row">
            <div className="col-md-12 pb-3">
        <label htmlFor="client_id">id_العميل   :</label>
      <input onChange={getData} type="text" className='my-input my-2 form-control' name='client_id' />
      
      {errorList.map((err,index)=>{
      if(err.context.label ==='client_id'){
        return <div key={index} className="alert alert-danger my-2">يجب ملئ جميع البيانات </div>
      }
      
    })}
    </div>
                <div className="col-md-6 pb-3">
        <label htmlFor="first_name">الاسم الاول  :</label>
      <input onChange={getData} type="text" className='my-input my-2 form-control' name='first_name' />
      
      {errorList.map((err,index)=>{
      if(err.context.label ==='first_name'){
        return <div key={index} className="alert alert-danger my-2">يجب ملئ جميع البيانات </div>
      }
      
    })}
    </div>
    <div className="col-md-6 pb-3">
        <label htmlFor="last_name">اسم العائلة   :</label>
      <input onChange={getData} type="text" className='my-input my-2 form-control' name='last_name' />
      
      {errorList.map((err,index)=>{
      if(err.context.label ==='last_name'){
        return <div key={index} className="alert alert-danger my-2">يجب ملئ جميع البيانات </div>
      }
      
    })}
    </div><div className="col-md-6 pb-3">
        <label htmlFor="business_name">اسم الشهرة   :</label>
      <input onChange={getData} type="text" className='my-input my-2 form-control' name='business_name' />
      
      {errorList.map((err,index)=>{
      if(err.context.label ==='business_name'){
        return <div key={index} className="alert alert-danger my-2">يجب ملئ جميع البيانات </div>
      }
      
    })}
    </div><div className="col-md-6 pb-3">
        <label htmlFor="birth_date">تاريخ الميلاد   :</label>
      <input onChange={getData} type="date" className='my-input my-2 form-control' name='birth_date' />
      
      {errorList.map((err,index)=>{
      if(err.context.label ==='birth_date'){
        return <div key={index} className="alert alert-danger my-2">يجب ملئ جميع البيانات </div>
      }
      
    })}
    </div>
    <div className="col-md-6 pb-3">
    <label htmlFor="phone">رقم الهاتف</label>
                {/* <input type="text" className="form-control" /> */}
                <PhoneInput name='phone' 
    labels={ar} defaultCountry='SA' dir='ltr' className='phoneInput my-2' value={value}
    onChange={(value) => {
      setPhoneValue(value);
      getData({ target: { name: 'phone', value } });
    }}/>
    {errorList.map((err,index)=>{
      if(err.context.label ==='phone'){
        return <div key={index} className="alert alert-danger my-2">يجب ملئ جميع البيانات </div>
      }
      
    })}
    </div>
    <div className="col-md-6 pb-3">
        <label htmlFor="email"> الايميل  :</label>
      <input onChange={getData} type="text" className='my-input my-2 form-control' name='email' />
      
      {errorList.map((err,index)=>{
      if(err.context.label ==='email'){
        return <div key={index} className="alert alert-danger my-2">يجب ملئ جميع البيانات </div>
      }
      
    })}
    </div>
    <div className="col-md-6 pb-3">
        <label htmlFor="state">الموقع   :</label>
      <input onChange={getData} type="text" className='my-input my-2 form-control' name='state' />
      
      {errorList.map((err,index)=>{
      if(err.context.label ==='state'){
        return <div key={index} className="alert alert-danger my-2">يجب ملئ جميع البيانات </div>
      }
      
    })}
    </div>
    <div className="col-md-6 pb-3">
        <label htmlFor="city"> المدينة  :</label>
      <input onChange={getData} type="text" className='my-input my-2 form-control' name='city' />
      
      {errorList.map((err,index)=>{
      if(err.context.label ==='city'){
        return <div key={index} className="alert alert-danger my-2">يجب ملئ جميع البيانات </div>
      }
      
    })}
    </div>
    <div className="col-md-6 pb-3">
        <label htmlFor="address">العنوان   :</label>
      <input onChange={getData} type="text" className='my-input my-2 form-control' name='address' />
      
      {errorList.map((err,index)=>{
      if(err.context.label ==='address'){
        return <div key={index} className="alert alert-danger my-2">يجب ملئ جميع البيانات </div>
      }
      
    })}
    </div>
    <div className="col-md-6 pb-3">
        <label htmlFor="category">الفئة   :</label>
      <input onChange={getData} type="text" className='my-input my-2 form-control' name='category' />
      
      {errorList.map((err,index)=>{
      if(err.context.label ==='category'){
        return <div key={index} className="alert alert-danger my-2">يجب ملئ جميع البيانات </div>
      }
      
    })}
    </div>
    <div className="col-md-6 pb-3">
        <label htmlFor="notes">ملاحظات   :</label>
        <textarea className="form-control" name='notes' onChange={getData} cols="70" rows="3"></textarea>
                {errorList.map((err,index)=>{
      if(err.context.label ==='notes'){
        return <div key={index} className="alert alert-danger my-2">يجب ملىء هذه الخانة </div>
      }
      
    })}
    </div>
      
    
     
      <div className="text-center pt-2">
      <button className='btn btn-dark my-2'>
      تعديل  
      </button>
      </div>
      </div>
     </form>
        </div>
        </div>

</> 
  )
}

