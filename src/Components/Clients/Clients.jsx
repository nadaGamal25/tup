import React from 'react'
import { Link } from 'react-router-dom'

export default function Clients() {
  return (
    <>
    <div className='p-4' id='content'>
      <div className="clients-heading py-2 d-flex justify-content-between">
        <h3><i class="fa-solid fa-users bx"></i>العملاء </h3>
        <Link to="/addclient" className='btn'><i class="fa-solid fa-plus"></i>اضافة عميل </Link>
      </div>
      <div className="search-box p-4 mt-2 row g-1">
        <div className="col-md-2">
        <button className="btn"><i class="fa-solid fa-magnifying-glass"></i> بحث</button>
        </div>
        <div className="col-md-10">
        <input className='form-control' type="search" placeholder='الأسم' />
        </div>
      </div>
      <div className="clients-table p-4 mt-4">
        <table className="table">
        <thead>
    <tr>
      <th scope="col"><i class="fa-solid fa-user"></i></th>
      <th scope="col">الأسم</th>
      <th scope="col">رقم الهاتف</th>
      <th scope="col">العنوان</th>
      <th scope="col">الحالة</th>
      <th scope="col">الاجراءات</th>
    </tr>
  </thead>
        </table>
      </div>
    </div>
    </>
  )
}
