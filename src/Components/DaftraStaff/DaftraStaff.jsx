import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';

export default function DaftraStaff() {

    const [staff,setStaff]=useState('')
    async function getDaftraStaff() {
        console.log(localStorage.getItem('userToken'))
        try {
          const response = await axios.get('https://dashboard.go-tex.net/api/daftra/staff-get-all',
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('userToken')}`,
            },
          });
          
          console.log(response.data.data.data)
          setStaff(response.data.data.data)
        } catch (error) {
          console.error(error);
        }
      }  
      useEffect(()=>{
        getDaftraStaff()
      },[])
  return (
    <>
    <div className='p-5' id='content'>
    <div className="clients-table p-4 my-4">
      <table className="table">
        <thead>
          <tr>
            {/* <th scope="col">#</th> */}
            <th scope="col">id </th>
            <th scope="col"> الموظف </th>
            <th scope="col"> الهاتف </th>
            <th scope="col">الايميل </th>
            <th scope="col">العنوان </th>
            <th scope="col">اخر تسجيل دخول </th>
            
            
          </tr>
        </thead>
        <tbody>
          {staff && staff.map((item,index) =>{
            return(
              <tr key={index}>
                {/* <td>{index+1}</td> */}
                
                {item.Staff.id?<td>{item.Staff.id}</td>:<td>_</td>}
                {item.Staff.full_name? <td>{item.Staff.full_name}</td> :<td>_</td>}
                {item.Staff.mobile?<td>{item.Staff.mobile}</td>:<td>_</td>}
                {item.Staff.email_address?<td>{item.Staff.email_address}</td>:<td>_</td>}
                {item.Staff.address1?<td>{item.Staff.address1}</td>:<td>_</td>}
                {item.Staff.last_login?<td>{item.Staff.last_login.slice(0,11)}</td>:<td>_</td>}
               
              
                
              </tr>
            )
          }
          )}
        </tbody>
      </table>
     </div>
    </div>
    </>
  )
}
