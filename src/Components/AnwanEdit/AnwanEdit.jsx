import React from 'react'
import axios from 'axios'
import Joi from 'joi'
import { useState } from 'react'
import { useEffect } from 'react';

export default function AnwanEdit() {
    const [errorList, seterrorList]= useState([]); 
  const [Prices,setPrices] =useState({
    status :'',
    userprice :'',
    marketerprice:'',
    kgprice :'',
    userCodPrice : '',
    maxcodmarkteer :'',
    mincodmarkteer :'',
  })
  const [error , setError]= useState('')
  const [isLoading, setisLoading] =useState(false)

  async function sendPricesToApi() {
    console.log(localStorage.getItem('userToken'))
    try {
      const {data} = await axios.post(`https://dashboard.go-tex.net/api/anwan/edit`, Prices,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('userToken')}`,
        },
      });
      if (data.msg === 'ok') {
        console.log(data)
        setisLoading(false)
        window.alert("تم التعديل بنجاح");
      } else {
        setisLoading(false)
        setError(data.msg)
        console.log(data.msg)
      }
    } catch (error) {
      console.log(error);
      window.alert('wrong');
    }
  }
  
function submitPricesForm(e){
  e.preventDefault();
  setisLoading(true)
  let validation = validatePricesForm();
  console.log(validation);
  if(validation.error){
    setisLoading(false)
    seterrorList(validation.error.details)

  }else{
    sendPricesToApi();
  }

}
function getPrices(e) {
  let myPrices = { ...Prices };
  if (e.target.type === "number") { // Check if the value is a number
    myPrices[e.target.name] = Number(e.target.value);
  } else if (e.target.value === "true" || e.target.value === "false") {
    myPrices[e.target.name] = e.target.value === "true";
  } else {
    myPrices[e.target.name] = e.target.value;
  }

  setPrices(myPrices);
  console.log(myPrices);
}
  // function getPrices(e){
  //   let myPrices={...anwanPrices};
  //   myPrices[e.target.name]= e.target.value;
  //   setAnwanPrices(myPrices);
  //   console.log(myPrices);
  // }

  function validatePricesForm(){
    let scheme= Joi.object({
      status:Joi.boolean().required(),
        userprice:Joi.number().required(),
        marketerprice:Joi.number().required(),
        kgprice :Joi.number().required(),
        userCodPrice :Joi.number().required(),
        maxcodmarkteer :Joi.number().required(),
        mincodmarkteer :Joi.number().required(),

    });
    return scheme.validate(Prices, {abortEarly:false});
  }
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
      setPrices({
        ...Prices,
        status:companiesPrices[4].status, 
        userprice:companiesPrices[4].userprice,
        marketerprice:companiesPrices[4].marketerprice,
        kgprice:companiesPrices[4].kgprice,
        userCodPrice:companiesPrices[4].codprice,
        maxcodmarkteer:companiesPrices[4].maxcodmarkteer,
        mincodmarkteer: companiesPrices[4].mincodmarkteer, 
      });
    } catch (error) {
      console.error(error);
    }
  }
  return (
<>
    <div className='p-4 admin' id='content'>
            <div className=" py-3">
              <div className="edit-form">
                <div className="p-saee p-3">
                  <h5 className="text-center mb-3">أسعار شركة Gotex </h5>
                  <form onSubmit={submitPricesForm} action="">
                    <label htmlFor="">سعر المسخدم</label>
                    <input onChange={getPrices} type="number" value={Prices.userprice} step="0.001" className='my-input my-2 form-control' name='userprice' />
                    {errorList.map((err,index)=>{
      if(err.context.label ==='userprice'){
        return <div key={index} className="alert alert-danger my-2">يجب ملىء جميع البيانات</div>
      }
      
    })}
                    <label htmlFor="">سعر المدخلات</label>
                    <input onChange={getPrices} type="number" value={Prices.marketerprice} step="0.001" className='my-input my-2 form-control' name='marketerprice' />
                    {errorList.map((err,index)=>{
      if(err.context.label ==='marketerprice'){
        return <div key={index} className="alert alert-danger my-2">يجب ملىء جميع البيانات</div>
      }
      
    })}
                    <label htmlFor="">سعر الزيادة</label>
                    <input onChange={getPrices} type="number" value={Prices.kgprice} step="0.001" className='my-input my-2 form-control' name='kgprice' />
                    {errorList.map((err,index)=>{
      if(err.context.label ==='kgprice'){
        return <div key={index} className="alert alert-danger my-2">يجب ملىء جميع البيانات</div>
      }
      
    })}
                    <label htmlFor="">سعر الدفع عند الاستلام</label>
                    <input onChange={getPrices} type="number" value={Prices.userCodPrice} step="0.001" className='my-input my-2 form-control' name='userCodPrice' />
                    {errorList.map((err,index)=>{
      if(err.context.label ==='userCodPrice'){
        return <div key={index} className="alert alert-danger my-2">يجب ملىء جميع البيانات</div>
      }
      
    })}
                    <label htmlFor="">اكبر سعر للمسوقين   </label>
                    <input onChange={getPrices} type="number" value={Prices.maxcodmarkteer} step="0.001" className='my-input my-2 form-control' name='maxcodmarkteer' />
                    {errorList.map((err,index)=>{
      if(err.context.label ==='maxcodmarkteer'){
        return <div key={index} className="alert alert-danger my-2">يجب ملىء جميع البيانات</div>
      }
      
    })}
                    <label htmlFor="">اقل سعر للمسوقين   </label>
                    <input onChange={getPrices} type="number" value={Prices.mincodmarkteer} step="0.001" className='my-input my-2 form-control' name='mincodmarkteer' />
                    {errorList.map((err,index)=>{
      if(err.context.label ==='mincodmarkteer'){
        return <div key={index} className="alert alert-danger my-2">يجب ملىء جميع البيانات</div>
      }
      
    })}
                    <label htmlFor="" className='d-block'>الحالة:</label>
                    <div>
                    <input type="radio" value="true" onChange={getPrices} name='status' />
                    <label htmlFor="status">إظهار</label>
                    </div>
                    <div>
                    <input type="radio" value="false" onChange={getPrices} name='status' />
                    <label htmlFor="status">عدم إظهار</label>
                    </div>
                    

                      {errorList.map((err,index)=>{
      if(err.context.label ==='status'){
        return <div key={index} className="alert alert-danger my-2">يجب ملىء جميع البيانات</div>
      }
      
    })}

<div className="text-center">
                    <button className='btn btn-primary mt-3'>
                    {isLoading == true?<i class="fa-solid fa-spinner fa-spin"></i>:'تسجيل'}
                   </button>
                   </div>
                  </form>
                </div>
              </div>
            </div>
            </div>
    
    </>   )
}
