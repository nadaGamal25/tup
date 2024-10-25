import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function ClientsCreditAdmin() {
    useEffect(()=>{
      getClientsList()
      },[])

      const[clients,setClients]=useState([])
      async function getClientsList() {
        try {
          const response = await axios.get('https://dashboard.go-tex.net/api/clients/clients-with-credit',
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('userToken')}`,
            },
          });
          const List = response.data.clients
          console.log(List)
          setClients(List)
        } catch (error) {
          console.error(error);
        }
      }
      // const [theStatus, setStatus] = useState('');
      // const [selectedId, setSelecteId] = useState(null);
      // async function credit() {
      //   try {
      //     const response = await axios.post(
      //       'https://dashboard.go-tex.net/api/daftra/change-credit-order-status',
      //       {
      //         orderid: selectedId,
      //         status: theStatus,
      //       },
      //       {
      //         headers: {
      //           Authorization: `Bearer ${localStorage.getItem('userToken')}`,
      //         },
      //       }

      //     );
      //     // Handle the response as per your requirement
      //     console.log(response.data);
      //     window.alert(response.data.msg)
      //     setStatus('')
          
      //   } catch (error) {
      //     console.error(error);
      //   }
      // }
      
      const [theStatus, setStatus] = useState('');
      const [selectedId, setSelectedId] = useState(null);
    
      async function handleActionClick(clientid, status) {
        setSelectedId(clientid);
        setStatus(status);
    
        try {
          const response = await axios.post(
            'https://dashboard.go-tex.net/api/admin/change-credit-status',
            {
              clientid: clientid,
              status: status,
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('userToken')}`,
              },
            }
          );
          console.log(response.data);
          window.alert(`ok , ${response.data.data.status}`);
          getClientsList()
        } catch (error) {
          console.error(error);
        }
      }
    
      // function acceptCredit(id){
      //   setSelecteId(id);
      //   console.log(theStatus)
      //   setStatus(Number(1));
      //   credit()

      // }
      // function removeCredit(id){
      //   setSelecteId(id);
      //   console.log(theStatus)
      //   setStatus('');
      //   credit()
      //   getClientsCredit()

      // }
     
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
            <th scope="col">العميل </th>
            <th scope="col">الهاتف </th>
            <th scope="col">المدينة </th>
            <th scope="col">العنوان </th>
            <th scope="col"> الرصيد  </th>
            <th scope="col">حالة الرصيد</th>

            
            <th></th>
            <th></th>            
          </tr>
        </thead>
        <tbody>
          {clients && clients.filter((item)=>{
          return search === ''? item : item.name.includes(search);
          }).map((item,index) =>{
            return(
              <tr key={index}>
                <td>{index+1}</td>
                {item.name?<td>{item.name}</td>:<td>_</td>}
                {item.mobile?<td>{item.mobile} </td>:<td>_</td>}
                {item.city?<td>{item.city}</td>:<td>_</td>}
                {item.address?<td>{item.address}</td>:<td>_</td>}
                {item.credit?<td>{item.credit.limet}</td>:<td>_</td>}
                {item.credit?<td>{item.credit.status}</td>:<td>_</td>}

                <td>
                <button className=' btn btn-success mt-2'
                      onClick={() => handleActionClick(item._id, "accepted")} // Sending status 1 for "قبول"
>                      قبول </button>

              </td>
              <td>
                <button
                        className=' btn btn-danger mt-2'
                        onClick={() => handleActionClick(item._id, "declined")} >
                        رفض 
                      </button>
              </td>
                
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
