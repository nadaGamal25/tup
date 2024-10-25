import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function DisplayClientsMarkter() {
    useEffect(()=>{
        getClientsList()
      },[])

      const[clients,setClients]=useState([])
      const [showModal, setShowModal] = useState(false);
      const [depositAmount, setDepositAmount] = useState('');
      const [receiptFile, setReceiptFile] = useState(null);
      const [selectedClientId, setSelectedClientId] = useState('');


      async function getClientsList() {
        try {
          const response = await axios.get('https://dashboard.go-tex.net/api/user/all-markter-clint',
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('userToken')}`,
            },
          });
          const List = response.data.data;
          console.log(List)
          console.log(response.data.data[0].name)
          setClients(List)
        } catch (error) {
          console.error(error);
        }
      }
      function handleOpenModal(clientId) {
        setSelectedClientId(clientId);
        setShowModal(true);
      }
      async function handleDepositSubmit(e) {
        e.preventDefault();
      
        if (!depositAmount || isNaN(depositAmount) || !receiptFile) {
          alert('يرجى ملء جميع الحقول المطلوبة');
          return;
        }
        const depositAmountNumber = Number(depositAmount);

        const formData = new FormData();
        formData.append('deposit', depositAmountNumber);
        formData.append('recipt', receiptFile);
        formData.append('clintid', selectedClientId);
      
        try {
          const response = await axios.post(
            'https://dashboard.go-tex.net/api/user/add-clint-deposit',
            formData,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('userToken')}`,
              },
            }
          );
      
          console.log('Deposit request successful', response.data);
          getClientsList()
          // Close the modal
          setShowModal(false);
        } catch (error) {
          console.error('Error while adding deposit', error);
      
        }
      }
      
  return (
    <>
    <div className='p-4' id='content'>
    <div className="clients-table p-4 my-4">
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col"> العميل </th>
            <th scope="col"> الايميل </th>
            <th scope="col">الهاتف </th>
            <th scope="col">الموقع </th>
            <th scope="col">العنوان </th>
            <th scope="col">الرصيد </th>
            <th scope="col">الشحنات </th>
            <th></th>
            <th></th>
            
          </tr>
        </thead>
        <tbody>
          {clients.map((item,index) =>{
            return(
              <tr key={index}>
                <td>{index+1}</td>
                
                {item.name? <td>{item.name}</td> :<td>_</td>}
                {item.email?<td>{item.email}</td>:<td>_</td>}
                {item.mobile?<td>{item.mobile}</td>:<td>_</td>}
                {item.city?<td>{item.city}</td>:<td>_</td>}
                {item.address?<td>{item.address}</td>:<td>_</td>}
                {item.wallet?<td>{item.wallet}</td>:<td>0</td>}
                {item.orders ? (
          <td>
            {item.orders.map((order) => (
              <span key={order.id}>{order.company}, </span>
            ))}
          </td>
        ) : (
          <td>_</td>
        )}
                        <td>
                <button
                        className='sdd-deposite btn btn-success mt-2'
                        onClick={() => handleOpenModal(item._id)}
                        >
                        إضافة رصيد
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
        <div className='add-deposit-modal-overlay' style={{ display: 'block' }}>
          <div className='add-deposit-modal-dialog'>
            <div className='add-deposit-modal-content'>
              <div className='add-deposit-modal-header'>
                <h2 className='add-deposit-modal-title'>إضافة رصيد</h2>
                <button
                  className='close'
                  onClick={() => setShowModal(false)}
                >
                  &times;
                </button>
              </div>
              <div className='add-deposit-modal-body'>
                <form onSubmit={handleDepositSubmit}>
                  <label>الرصيد:</label>
                  <input
                    type='number' className='form-control'
                    value={depositAmount}
                    onChange={(e) => setDepositAmount(Number(e.target.value))}
                  />
                  <label>الإيصال:</label> <br/>
                  <input
                    type='file'
                    onChange={(e) => setReceiptFile(e.target.files[0])}
                  /><br/>
                  <button
                    type='submit'
                    className='add-deposit-btn-primary btn btn-primary m-2'
                  >
                    إرسال
                  </button>
                  <button
                    type='button'
                    className='btn btn-secondary m-2'
                    onClick={() => setShowModal(false)}
                  >
                    إلغاء
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
{/* {showModal && (
        <div className='add-deposit-modal-overlay' style={{ display: 'block' }}>
          <div className='add-deposit-modal-dialog'>
            <div className='add-deposit-modal-content'>
              <div className='add-deposit-modal-header'>
                <h2 className='add-deposit-modal-title'>إضافة رصيد</h2>
                <button
                  className='close'
                  onClick={() => setShowModal(false)}
                >
                  &times;
                </button>
              </div>
              <div className='add-deposit-modal-body'>
                <form onSubmit={handleDepositSubmit}>
                  <label>الرصيد:</label>
                  <input
                    type='number' className='form-control'
                    value={depositAmount}
                    onChange={(e) => setDepositAmount(e.target.value)}
                  />
                  <br/>
                  <label>الإيصال:</label><br/>
                  <input
                    type='file'
                    onChange={(e) => setReceiptFile(e.target.files[0])}
                  /> <br/>
                  <button
                    type='submit'
                    className='add-deposit-btn-primary btn btn-primary m-1'
                  >
                    إرسال
                  </button>
                  <button
                    type='button'
                    className='btn btn-secondary m-1'
                    onClick={() => setShowModal(false)}
                  >
                    إلغاء
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )} */}

    </>
  )
}
