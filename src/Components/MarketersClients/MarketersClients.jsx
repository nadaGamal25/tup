import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function MarketersClients() {
    useEffect(()=>{
        getClientsList()
      },[])

      const[clients,setClients]=useState([])


      async function getClientsList() {
        try {
          const response = await axios.get('https://dashboard.go-tex.net/api/markter/get-marketer-clients',
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('marketerToken')}`,
            },
          });
          const List = response.data.data
          console.log(response)
          console.log(List)
          setClients(List)
        } catch (error) {
          console.error(error);
        }
      }
  return (
    <div className='p-5' id='content'>
    <div className="clients-table p-4">
    <table className="table">
        <thead>
          <tr>
          <th scope="col">#</th>
            <th scope="col">العميل </th>
            <th scope="col">الشركة </th>
            <th scope="col">الهاتف </th>
            {/* <th scope="col">الايميل </th> */}
            <th scope="col">المدينة </th>
            <th scope="col">العنوان </th>
            <th scope="col">الشارع  </th>
            <th scope="col">الفروع  </th>
            <th scope="col">المحفظة </th>
            <th scope="col"> credit </th>
            {/* <th scope="col">الشحنات </th>
            <th scope="col">ملاحظات </th> */}
            {/* <th scope="col"></th>             */}
                      

           
          </tr>
        </thead>
        <tbody>
          {clients && clients.map((item,index) =>{
            return(
              <tr key={index}>

                <td>{index+1}</td>
                {item.name?<td>{item.name}</td>:<td>_</td>}
                {item.company?<td>{item.company}</td>:<td>_</td>}
                {item.mobile?<td>{item.mobile} </td>:<td>_</td>}
                {/* {item.email?<td>{item.email}</td>:<td>_</td>} */}
                {item.city?<td>{item.city}</td>:<td>_</td>}
                {item.address?<td>{item.address}</td>:<td>_</td>}
                {item.street?<td>{item.street}</td>:<td>_</td>}
                 {item.branches ? (
          <td>
            {item.branches.map((branche) => (
              <span key={branche._id}>{branche.city}  {branche.address} & </span>
            ))}
          </td>
        ) : (
          <td>_</td>
        )}
                {item.wallet?<td>{item.wallet}</td>:<td>0</td>}
                {item.credit?<td>{item.credit.limet} <br/> '{item.credit.status}'</td>:<td>0</td>}
               
                 {/* {item.notes?<td>{item.notes}</td>:<td>_</td>} */}
               

              </tr>
            )
          }
          )}
        </tbody>
      </table>
     </div>
         </div>  )
}
