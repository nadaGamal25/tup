import React, { useState } from 'react'
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css'
import ar from 'react-phone-number-input/locale/ar'


export default function AddClient() {
    const [value ,setPhoneValue]=useState()

  return (
    <>
    <div className='p-4 clienrformbox' id='content'>
        <h3>اضافة عميل</h3>
        <div className="client-form p-5 mt-3">
            <div className="row pb-4">
                <div className="col-md-4">
                    <label htmlFor="">اسم العميل *</label>
                    <input type="text" className="form-control" placeholder='الاسم'/>
                </div>
                <div className="col-md-4">
                    <label htmlFor="">البريد الالكترونى *</label>
                    <input type="text" className="form-control" placeholder='البريد الالكترونى'/>
                </div>
                <div className="col-md-4">
                    <label htmlFor="">رقم الهاتف *</label>
                    <PhoneInput name='phone' 
    labels={ar} defaultCountry='EG' className='phoneInput' value={value}
    onChange={value=>setPhoneValue(value)}/>
      
                    {/* <input type="text" className="form-control" placeholder='الهاتف'/> */}
                </div>
            </div>
            <div className='pb-3'>
                <label htmlFor="">العنوان *</label>
                <input type="text" className="form-control" placeholder='العنوان'/>
            </div>
            <div>
                <label htmlFor="">الموقع *</label>
                <input type="text" className="form-control" placeholder='الموقع'/>
            </div>

             <button className="btn btn-add">اضافة</button>

        </div>
    </div>
    </>
  )
}
