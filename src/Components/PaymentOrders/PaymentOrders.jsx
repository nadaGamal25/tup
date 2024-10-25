import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'

export default function PaymentOrders() {
    useEffect(()=>{
        getUserBalanceOrders()
      },[])
    
          const [BalanceOrders,setBalanceOrders]=useState('')
          async function getUserBalanceOrders() {
            try {
              const response = await axios.get('https://dashboard.go-tex.net/api/user/get-user-payment-orders',
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem('userToken')}`,
                },
              });
              console.log(response.data.data)
              setBalanceOrders(response.data.data)
            } catch (error) {
              console.error(error);
            }
          }
          
  return (
    <div className='p-4' id='content'>
    <div className="clients-table p-3 mt-4">
    
      <table className="table">
        <thead>
          <tr>
           <th scope="col">#</th>
           <th scope="col"> الكمية</th>
           <th scope="col">الحالة </th>
           <th scope="col">رقم العملية </th>
           
          </tr>
        </thead>
      <tbody>
      {BalanceOrders && BalanceOrders.map((item,index) =>{
           return(
             <tr key={index}>
             <td>{index+1}</td>
             <td>{item.amount}</td>
             <td>{item.status}</td>
             <td>{item._id}</td>
             
             
           </tr>
           )
         }
         )}
          
       </tbody>
     </table>
    </div> 
    </div>
 )
}
