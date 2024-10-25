import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import glt from '../../assets/glt.jpg'
import imile from '../../assets/imile.jpg'
import jonex from '../../assets/jonex.jpg'
import jt from '../../assets/jt.jpg'
import mkan from '../../assets/mkan.jpg'
import sae from '../../assets/sae.jpg'
import sms from '../../assets/sms.jpg'
import spl from '../../assets/spl.jpg'
import armx from '../../assets/armx.jpg'
import axios from 'axios'
import Joi from 'joi'
import NavAdmin from '../NavAdmin/NavAdmin'

export default function Admin() {
  
  return (
    <>
    <NavAdmin/>
        <div className='p-4 admin' id='content'>
           
            
      <div className="shipment-details mt-4 p-4">
        <h3>تفاصيل الشحنات</h3>
        <div className="company-links py-3">
        <Link to="/gltShipment"><img src={glt} alt="company" /></Link>
        <Link to=""><img src={imile} alt="company" /></Link>
        <Link to=""><img src={jonex} alt="company" /></Link>
        <Link to=""><img src={sms} alt="company" /></Link>
        <Link to=""><img src={mkan} alt="company" /></Link>
        <Link to=""><img src={sae} alt="company" /></Link>
        <Link to=""><img src={jt} alt="company" /></Link>
        <Link to=""><img src={spl} alt="company" /></Link>
        <Link to=""><img src={armx} alt="company" /></Link>
        </div>
      </div>
      <div className="merchants mt-5">
      <h3>تفاصيل التجار</h3>
            <div className="clients-table p-4 mt-4">
        <table className="table">
        <thead>
    <tr>
      <th scope="col">الاسم</th>
      <th scope="col">رقم الهاتف  </th>
      <th scope="col">العنوان </th>
      <th scope="col">قيمة الشحنة </th>
      <th scope="col">فاتورة الشحنة</th>
      <th scope="col"> الكمية </th>
      <th scope="col">تاريخ الاستلام </th>
      <th scope="col">رقم الفاتورة </th>
      <th scope="col">الشركة </th>

    </tr>
  </thead>
  </table>
  </div>

      </div>
        </div>
    </>
  )
}

