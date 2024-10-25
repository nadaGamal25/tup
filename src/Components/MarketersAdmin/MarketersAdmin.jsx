import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function MarketersAdmin() {
    useEffect(()=>{
        getMarketerssAdmin()
      },[])
      const [marketersAdmin,setMarketersAdmin]=useState([])
     
    async function getMarketerssAdmin() {
        try {
          const response = await axios.get('https://dashboard.go-tex.net/api/markter/get-all-markter',
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('userToken')}`,
            },
          });
          const clients = response.data.data;
          console.log(clients)
          setMarketersAdmin(clients)
        } catch (error) {
          console.error(error);
        }
      }
      const [search, setSearch]= useState('')

  return (
    <>
    <div className='p-5' id='content'>
    <div className="search-box p-4 mt-2 row g-1">
        <div className="col-md-2">
        <button className="btn"><i class="fa-solid fa-magnifying-glass"></i> بحث</button>
        </div>
        <div className="col-md-10">
        <input className='form-control' name="search" onChange={(e)=> setSearch(e.target.value)} type="search" placeholder='الاسم' />
        </div>
      </div>
    <div className="clients-table p-4 my-4">
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">الاسم </th>
            <th scope="col">الهاتف </th>
            <th scope="col">الايميل </th>
            <th scope="col">الكود </th>
            
            
          </tr>
        </thead>
        <tbody>
          {marketersAdmin && marketersAdmin.filter((item)=>{
          return search === ''? item : item.name.includes(search);
          }).map((item,index) =>{
            return(
              <tr key={index}>
                <td>{index+1}</td>
                {item?<td>{item.name}</td>:<td>_</td>}
                {item?<td>{item.mobile}</td>:<td>_</td>}
                {item.email?<td>{item.email}</td>:<td>_</td>}
                {item.code?<td>{item.code}</td>:<td>_</td>}
               
              </tr>
            )
          }
          )}
        </tbody>
      </table>
     </div>
         </div></>
  )
}
