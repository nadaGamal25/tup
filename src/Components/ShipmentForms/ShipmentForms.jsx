import React, { useEffect, useState } from 'react'
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css'
import ar from 'react-phone-number-input/locale/ar'
import axios from 'axios';
import Joi from 'joi';

export default function ShipmentForms({userData}) {
  useEffect(()=>{
    console.log(userData)
  },[])
    const [value ,setPhoneValue]=useState()
    const [phone2,setPhone2] =useState()

    const [errorList, seterrorList]= useState([]); 
  const [orderData,setOrderData] =useState({
    p_name:'',
    p_city:'',
    p_mobile:'',
    p_streetaddress:'',
    weight:'',
    quantity:'',
    c_name:'',
    c_city:'',
    c_streetaddress:'',
    c_mobile:''
  })
  const [error , setError]= useState('')
  const [isLoading, setisLoading] =useState(false)

  async function sendOrderDataToApi() {
    console.log(localStorage.getItem('userToken'))
    // try {
    //   const response = await axios.post(
    //     "https://dashboard.go-tex.net/api/saee/create-user-order",
    //     orderData,
    //     {
    //       headers: {
    //         Authorization: `Bearer ${localStorage.getItem('userToken')}`,
    //       },
    //     }
    //   );
  
    //   if (response.status === 200) {
    //     setisLoading(false);
    //     window.alert("تم تسجيل الشحنة بنجاح");
    //     console.log(response.data);
    //     console.log("okkkkkkkkkkk")
    //   }else if (response.status === 400) {
    //     setisLoading(false);
    //     const errorMessage = response.data?.msg || "An error occurred.";
    //     window.alert(`${errorMessage}`);
    //     console.log(response.data);
    //   }
    // } catch (error) {
    //   // Handle error
    //   console.error(error);
    //   setisLoading(false);
    //   const errorMessage = error.response?.data?.msg || "An error occurred.";
    //   window.alert(`${errorMessage}`);
    // }
  }
  
// async function sendOrderDataToApi(){
//       console.log(localStorage.getItem('userToken'))
//   let response= await axios.post(`https://dashboard.go-tex.net/api/saee/create-user-order`,orderData,
//   {
//     headers: {
//       Authorization: `Bearer ${localStorage.getItem('userToken')}`,
//     },
//   });
//   // if (response.status === 200) {
//   //   setisLoading(false);
//   //   window.alert("تم تسجيل الشحنة بنجاح");
//   //   console.log(response.data);
//   //   console.log("okkkkkkkkkkk")
//   // }

//   if(response.data.msg==="ok"){
//     setisLoading(false);
//     // setError(response.data.msg);
//     // window.alert(response.data.msg)
//     console.log("okkkkkkkkkkk")

//     }else if (response.status === 400) {
//       setisLoading(false);
//       const errorMessage = response.data.msg || "An error occurred.";
//       window.alert(`Error: ${errorMessage}`);
//       console.log(response.data);
//     }
// }

function submitOrderUserForm(e){
  e.preventDefault();
  setisLoading(true)
  let validation = validateOrderUserForm();
  console.log(validation);
  if(validation.error){
    setisLoading(false)
    seterrorList(validation.error.details)

  }else{
    sendOrderDataToApi();
  }

}

  function getOrderData(e){
    let myOrderData={...orderData};
    myOrderData[e.target.name]= e.target.value;
    setOrderData(myOrderData);
    console.log(myOrderData);
  }

  function validateOrderUserForm(){
    let scheme= Joi.object({
        p_name:Joi.string().required(),
        p_city:Joi.string().required(),
        p_mobile:Joi.string().required(),
        p_streetaddress:Joi.string().required(),
        weight:Joi.string().required(),
        quantity:Joi.string().required(),
        c_name:Joi.string().required(),
        c_city:Joi.string().required(),
        c_streetaddress:Joi.string().required(),
        c_mobile:Joi.string().required()

    });
    return scheme.validate(orderData, {abortEarly:false});
  }

  return (
    <div className='p-4' id='content'>
        <form onSubmit={submitOrderUserForm} className='shipmenForm' action="">
            <div className="row">
            <div className="col-md-6">
            <div className="shipper-details brdr-grey p-4">
                <h3>تفاصيل المرسل</h3>
                
                <div className='pb-3'>
                <label htmlFor=""> اسم الشركة/المتجر</label>
                <input type="text" className="form-control" name='p_name' onChange={getOrderData}/>
                {errorList.map((err,index)=>{
      if(err.context.label ==='p_name'){
        return <div key={index} className="alert alert-danger my-2">يجب ملىء هذه الخانة </div>
      }
      
    })}
            </div>
            <div className='pb-3'>
                <label htmlFor="">رقم الهاتف</label>
                {/* <input type="text" className="form-control" /> */}
                <PhoneInput name='p_mobile' 
    labels={ar} defaultCountry='SA' dir='ltr' className='phoneInput' value={value}
    onChange={(value) => {
      setPhoneValue(value);
      getOrderData({ target: { name: 'p_mobile', value } });
    }}/>
    {errorList.map((err,index)=>{
      if(err.context.label ==='p_mobile'){
        return <div key={index} className="alert alert-danger my-2">رقم الهاتف يجب الا يقل عن 12 رقما</div>
      }
      
    })}
      
            </div>
            <div className='pb-3'>
                <label htmlFor=""> الموقع</label>
                <input type="text" className="form-control" name='p_city' onChange={getOrderData}/>
                {errorList.map((err,index)=>{
      if(err.context.label ==='p_city'){
        return <div key={index} className="alert alert-danger my-2">يجب ملىء هذه الخانة </div>
      }
      
    })}
            </div>
            <h6 className='text-center py-2'>{'<<'}  معلومات اضافية  {'>>'}</h6>
            <div className='pb-3'>
                <label htmlFor=""> العنوان </label>
                <input type="text" className="form-control" name='p_streetaddress' onChange={getOrderData}/>
                {errorList.map((err,index)=>{
      if(err.context.label ==='p_streetaddress'){
        return <div key={index} className="alert alert-danger my-2">يجب ملىء هذه الخانة </div>
      }
      
    })}
            </div>
            <div className='pb-3'>
                <label htmlFor=""> البريد الالكترونى</label>
                <input type="text" className="form-control"/>
            </div>
            </div>
            <div className="package-info brdr-grey p-3 my-3 ">
                <h3>بيانات الشحنة</h3>
                <div className="row">
                <div className="col-md-6">
                <div className='pb-3'>
                <label htmlFor=""> الوزن</label>
                <input type="text" className="form-control" name='weight' onChange={getOrderData}/>
                {errorList.map((err,index)=>{
      if(err.context.label ==='weight'){
        return <div key={index} className="alert alert-danger my-2">يجب ملىء هذه الخانة </div>
      }
      
    })}
            </div>
                </div>
                <div className="col-md-6">
                <div className='pb-3'>
                <label htmlFor=""> القيمة</label>
                <input type="text" className="form-control"/>
            </div>
                </div>
                <div className="col-md-6">
                <div className='pb-3'>
                <label htmlFor=""> محتويات الشحنة</label>
                <input type="text" className="form-control"/>
            </div>
                </div>
                <div className="col-md-6">
                <div className='pb-3'>
                <label htmlFor=""> رقم الفاتورة</label>
                <input type="text" className="form-control"/>
            </div>
                </div>
                <div className="col-md-6">
                <div className='pb-3'>
                <label htmlFor=""> عدد القطع</label>
                <input type="text" className="form-control" name='quantity' onChange={getOrderData}/>
                {errorList.map((err,index)=>{
      if(err.context.label ==='quantity'){
        return <div key={index} className="alert alert-danger my-2">يجب ملىء هذه الخانة </div>
      }
      
    })}
            </div>
                </div>
                <h6 className='text-center py-2'>{'<<'}  معلومات اضافية  {'>>'}</h6>
                <div className="col-md-4">
                <div className='pb-3'>
                <label htmlFor=""> الامتداد </label>
                <input type="text" className="form-control"/>
            </div>
                </div>
                <div className="col-md-4">
                <div className='pb-3'>
                <label htmlFor=""> العرض </label>
                <input type="text" className="form-control"/>
            </div>
                </div>
                <div className="col-md-4">
                <div className='pb-3'>
                <label htmlFor=""> الطول </label>
                <input type="text" className="form-control"/>
            </div>
                </div>
                </div>
            </div>
            </div>
            <div className="col-md-6">
            <div className="reciever-details brdr-grey p-3">
                <h3>تفاصيل المستلم</h3>
                {/* <div className=" mb-4 mt-2">
        <input className='form-control' type="search" placeholder='بحث بالأسم' />
        </div> */}
        <div className='pb-3'>
                <label htmlFor=""> الاسم</label>
                <input type="text" className="form-control" name='c_name' onChange={getOrderData}/>
                {errorList.map((err,index)=>{
      if(err.context.label ==='c_name'){
        return <div key={index} className="alert alert-danger my-2">يجب ملىء هذه الخانة </div>
      }
      
    })}
            </div>
            <div className='pb-3'>
                <label htmlFor=""> رقم الهاتف</label>
                {/* <input type="text" className="form-control"/> */}
                <PhoneInput name='c_mobile' 
    labels={ar} defaultCountry='SA' dir='ltr' className='phoneInput' value={phone2}
    onChange={(phone2) => {
      setPhone2(phone2);
      getOrderData({ target: { name: 'c_mobile', value: phone2 } });
    }}/>
    {errorList.map((err,index)=>{
      if(err.context.label ==='c_mobile'){
        return <div key={index} className="alert alert-danger my-2">رقم الهاتف يجب الا يقل عن 12 رقما</div>
      }
      
    })}
      
            </div>
            <div className='pb-3'>
                <label htmlFor=""> الموقع</label>
                <input type="text" className="form-control" name='c_city' onChange={getOrderData}/>
                {errorList.map((err,index)=>{
      if(err.context.label ==='c_city'){
        return <div key={index} className="alert alert-danger my-2">يجب ملىء هذه الخانة </div>
      }
      
    })}
            </div>
            <div className='pb-3'>
                <label htmlFor=""> العنوان</label>
                <input type="text" className="form-control" name='c_streetaddress' onChange={getOrderData}/>
                {errorList.map((err,index)=>{
      if(err.context.label ==='c_streetaddress'){
        return <div key={index} className="alert alert-danger my-2">يجب ملىء هذه الخانة </div>
      }
      
    })}
            </div>
            
            <h6 className='text-center py-2'>{'<<'}  معلومات اضافية  {'>>'}</h6>
            <div className='pb-3'>
                <label htmlFor=""> العنوان 2</label>
                <input type="text" className="form-control"/>
            </div>
            <div className='pb-3'>
                <label htmlFor=""> البريد الالكترونى</label>
                <input type="text" className="form-control"/>
            </div>
            <button className="btn btn-orange"> <i className='fa-solid fa-plus'></i> اضافة مستلم</button>
            </div>
            </div>
            </div>
        </form>
        <div className="clients-table p-4 mt-5">
            <h6 className='text-center'>بيانات المستلم</h6>
        <table className="table">
        <thead>
    <tr>
      <th scope="col"></th>
      <th scope="col">الأسم</th>
      <th scope="col">البريد الالكترونى</th>
      <th scope="col">الهاتف </th>
      <th scope="col">الموقع</th>
      <th scope="col">الدفع عند الاستلام</th>
      <th scope="col">الاجراءات</th>
    </tr>
  </thead>
        </table>
      </div>
    </div>
  )
}
