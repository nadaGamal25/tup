import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function MarketerClients() {
    useEffect(()=>{
        getClientsList()
      },[])

      const[clients,setClients]=useState([])


      async function getClientsList() {
        try {
          const response = await axios.get('https://dashboard.go-tex.net/api/daftra/get-markter-clints',
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('userToken')}`,
            },
          });
          const List = response.data.data
          console.log(List)
          setClients(List)
        } catch (error) {
          console.error(error);
        }
      }

      const [showModal, setShowModal] = useState(false);
      const [depositAmount, setDepositAmount] = useState('');
      const [selectedUserId, setSelectedUserId] = useState(null);
      async function addDepositToUser() {
        try {
          const response = await axios.post(
            'https://dashboard.go-tex.net/api/daftra/markter-add-credit-for-client',
            {
              client_id: selectedUserId,
              credit_limit: depositAmount,
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('userToken')}`,
              },
            }

          );
          // Handle the response as per your requirement
          console.log(response.data);
          window.alert(response.data.msg)
          // if (response.data.msg === 'ok') {
            closeModal();
            // getUsersListsAdmin();
          // }
        } catch (error) {
          console.error(error);
        }
      }
      const openModal = (userId) => {
        setSelectedUserId(userId);
        setShowModal(true);
      };
    
      const closeModal = () => {
        setSelectedUserId(null);
        setShowModal(false);
        setDepositAmount('');
      };
      const handleDepositChange = (event) => {
        setDepositAmount(Number(event.target.value));
      };
     
      
  return (
    <>
    <div className='p-5' id='content'>
    <div className="clients-table p-4 my-4">
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">العميل </th>
            <th scope="col">الشركة </th>
            <th scope="col">الهاتف </th>
            <th scope="col">الايميل </th>
            <th scope="col">المدينة </th>
            <th scope="col">العنوان </th>
            <th scope="col">الشارع  </th>
            <th scope="col">الفئة </th>
            <th scope="col"> credit  </th>
            <th scope="col">الشحنات </th>
            {/* <th scope="col">id_العميل </th> */}
            <th scope="col">ملاحظات </th>
            {/* <th scope="col">id_الموظف </th> */}
            <th></th>
            
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
                {item.email?<td>{item.email}</td>:<td>_</td>}
                {item.city?<td>{item.city}</td>:<td>_</td>}
                {item.address?<td>{item.address}</td>:<td>_</td>}
                {item.street?<td>{item.street}</td>:<td>_</td>}
                {item.category?<td>{item.category}</td>:<td>_</td>}
                {item.wallet?<td>{item.wallet}</td>:<td>_</td>}
                {item.orders ? (
          <td>
            {item.orders.map((order) => (
              <span key={order.id}>{order.company}, </span>
            ))}
          </td>
        ) : (
          <td>_</td>
        )}
                {/* {item.Client.id?<td>{item.Client.id}</td>:<td>_</td>} */}
                {/* {item.Client.staff_id?<td>{item.Client.staff_id}</td>:<td>_</td>} */}
                {item.notes?<td>{item.notes}</td>:<td>_</td>}

                <td>
                <button
                        className='sdd-deposite btn btn-success mt-2'
                        onClick={() => openModal(item._id)}
                      >
                        إضافة credit 
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

    {showModal && (
        <div className='modal' style={{ display: 'block' }}>
          <div className='modal-dialog'>
            <div className='modal-content'>
              <div className='modal-header'>
                <h5 className='modal-title'>إضافة حد ائتمانى</h5>
                <button
                  type='button'
                  className='close'
                  onClick={closeModal}
                >
                  <span aria-hidden='true'>&times;</span>
                </button>
              </div>
              <div className='modal-body'>
                <div className='form-group'>
                  <label htmlFor='deposit'>السعة :</label>
                  <input
                    type='number'
                    className='form-control'
                    id='deposit'
                    value={depositAmount}
                    onChange={handleDepositChange}
                   
                  />
                </div>
              </div>
              <div className='modal-footer'>
                <button
                  type='button'
                  className='btn btn-primary'
                  onClick={addDepositToUser}
                >
                  إضافة
                </button>
                <button
                  type='button'
                  className='btn btn-secondary'
                  onClick={closeModal}
                >
                  إلغاء
                </button>
              </div>
            </div>
          </div>
        </div>
      )}     
    </>
  )
}
