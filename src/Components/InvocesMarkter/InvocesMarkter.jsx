import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function InvocesMarkter() {
    useEffect(()=>{
        getInvoces()
      },[])
      const [invoces,setInvoces]=useState([])
    
      async function getInvoces() {
        try {
          const response = await axios.get('https://dashboard.go-tex.net/api/daftra/get-all-markter-invoices',
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('userToken')}`,
            },
          });
          console.log(response.data.data)
          setInvoces(response.data.data)
        } catch (error) {
          console.error(error);
        }
      }
  return (
    <div>InvocesMarkter</div>
  )
}
