import React from 'react'
import NavAdmin from '../NavAdmin/NavAdmin'
import axios from 'axios'
import Joi from 'joi'
import { useState } from 'react';

export default function AddDepositAdmin() {
    const [errorList, seterrorList]= useState([]); 
    const [depositsAdmin,setDepositsAdmin] =useState({
      id :'',
      deposit :'',
    })
    const [error , setError]= useState('')
    const [isLoading, setisLoading] =useState(false)
  
    async function sendDepositsAdminToApi() {
      console.log(localStorage.getItem('userToken'))
      try {
        const {data} = await axios.post(`https://dashboard.go-tex.net/api/admin/add-deposit-to-user`, depositsAdmin,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('userToken')}`,
          },
        });
        if (data.msg === 'ok') {
          console.log(data.msg)
          setisLoading(false)
          window.alert("تمت الاضافة");
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
    
  function submitDepositsAdminForm(e){
    e.preventDefault();
    setisLoading(true)
    let validation = validateDepositsAdminForm();
    console.log(validation);
    if(validation.error){
      setisLoading(false)
      seterrorList(validation.error.details)
  
    }else{
      sendDepositsAdminToApi();
    }
  
  }
  
    function getDepositsAdmin(e){
      let myDepositsAdmin={...depositsAdmin};
      myDepositsAdmin[e.target.name]= e.target.value;
      setDepositsAdmin(myDepositsAdmin);
      console.log(myDepositsAdmin);
    }
  
    function validateDepositsAdminForm(){
      let scheme= Joi.object({
          id:Joi.string().required(),
          deposit:Joi.number().required(),
  
      });
      return scheme.validate(depositsAdmin, {abortEarly:false});
    }
  return (
<>
    <NavAdmin/>
    <div className='p-4 admin' id='content'>
            <div className="row py-3 ">
                <div className="col-md-3"></div>
              <div className="col-md-6">
                <div className="p-saee p-3">
                  <h5 className="text-center mb-3">إضافة رصيد </h5>
                  <form onSubmit={submitDepositsAdminForm} action="">
                    <label htmlFor="">id_المسخدم</label>
                    <input onChange={getDepositsAdmin} type="text" className='my-input my-2 form-control' name='id' />
                    {errorList.map((err,index)=>{
      if(err.context.label ==='id'){
        return <div key={index} className="alert alert-danger my-2">يجب ملىء جميع البيانات</div>
      }
      
    })}
                    <label htmlFor="">الرصيد </label>
                    <input onChange={getDepositsAdmin} type="number" className='my-input my-2 form-control' name='deposit' />
                    {errorList.map((err,index)=>{
      if(err.context.label ==='deposit'){
        return <div key={index} className="alert alert-danger my-2">يجب ملىء جميع البيانات</div>
      }
      
    })}
                    
                    

                      <button className='btn btn-primary mt-3'>
                      {isLoading == true?<i class="fa-solid fa-spinner fa-spin"></i>:'إيداع'}
                     </button>
                  </form>
                </div>
              </div>
            </div>
            </div>
    
    </>  )
}
