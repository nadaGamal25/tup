import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function UsersListAdmin() {
    useEffect(()=>{
        getUsersListsAdmin()
      },[])
      const [usersListAdmin,setUsersListsAdmin]=useState([])
      const [showModal, setShowModal] = useState(false);
      const [depositAmount, setDepositAmount] = useState('');
      const [selectedUserId, setSelectedUserId] = useState(null);
      const [showModal2, setShowModal2] = useState(false);
      const [emailCR, setEmailCR] = useState('');
      const [emailCR2, setEmailCR2] = useState('');
      const [showModal3, setShowModal3] = useState(false);
      const [emailCR3, setEmailCR3] = useState('');
      const [emailCR33, setEmailCR33] = useState('');
      const [daftraid, setDaftraid] = useState('');
const [marketerid, setMarketerid] = useState('');

      
    
      async function getUsersListsAdmin() {
        try {
          const response = await axios.get('https://dashboard.go-tex.net/api/admin/get-all-users',
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('userToken')}`,
            },
          });
          const usersList = response.data.data;
          console.log(usersList)
          setUsersListsAdmin(usersList)
        } catch (error) {
          console.error(error);
        }
      }

      async function addDepositToUser() {
        try {
          const response = await axios.post(
            'https://dashboard.go-tex.net/api/admin/add-deposit-to-user',
            {
              id: selectedUserId,
              deposit: depositAmount,
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('userToken')}`,
              },
            }

          );
          // Handle the response as per your requirement
          console.log(response.data);
          if (response.data.msg === 'ok') {
            closeModal();
            getUsersListsAdmin();
          }
        } catch (error) {
          console.error(error);
        }
      }
      async function proofCR() {
        try {
          const response = await axios.post(
            'https://dashboard.go-tex.net/api/admin/proof-user-cr',
            {
              email: emailCR,
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('userToken')}`,
              },
            }

          );
          
          // Handle the response as per your requirement
          console.log(response.data);
          if (response.data.msg === 'ok') {
            closeModal2();
            getUsersListsAdmin();
          }
        } catch (error) {
          console.error(error);
        }
      }
      async function proofCR3() {
        try {
          const response = await axios.post(
            'https://dashboard.go-tex.net/api/admin/un-proof-user-cr',
            {
              email: emailCR3,
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('userToken')}`,
              },
            }

          );
          
          // Handle the response as per your requirement
          console.log(response.data);
          if (response.data.msg === 'ok') {
            closeModal3();
            getUsersListsAdmin();
          }
        } catch (error) {
          console.error(error);
        }
      }
      async function connectMarketerWithDaftra() {
        try {
          const response = await axios.post(
            'https://dashboard.go-tex.net/api/daftra/connect-markter-with-daftra',
            {
              daftraid: daftraid,
              marketerid: marketerid,
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('userToken')}`,
              },
            }
          );
          window.alert('تم ربط المسوق بدفترة بنجاح')
          console.log(response.data);
      
          closeModal4();
        } catch (error) {
          console.error(error);
        }
      }
      

      const openModal2 = (email2) => {
        setShowModal2(true);
        setEmailCR2(email2)
      };
    
      const closeModal2 = () => {
        setShowModal2(false);
        setEmailCR('');
      };
    
      const handleCRChange = (event) => {
        setEmailCR(event.target.value);
      };
      ///

      const openModal = (userId) => {
        setSelectedUserId(userId);
        setShowModal(true);
      };
    
      const closeModal = () => {
        setSelectedUserId(null);
        setShowModal(false);
        setDepositAmount('');
      };
      ///
      const openModal3 = (email33) => {
        setShowModal3(true);
        setEmailCR33(email33)
      };
    
      const closeModal3 = () => {
        setShowModal3(false);
        setEmailCR3('');
      };
    
      const handleCRChange3 = (event) => {
        setEmailCR3(event.target.value);
      };
    
      const handleDepositChange = (event) => {
        setDepositAmount(Number(event.target.value));
      };

      const [search, setSearch]= useState('')

      const handleDaftraidChange = (event) => {
        setDaftraid(event.target.value);
      };
      
      const handleMarketeridChange = (event) => {
        setMarketerid(event.target.value);
      };
      const [showModal4, setShowModal4] = useState(false);

const openModal4 = () => {
  setShowModal4(true);
};

const closeModal4 = () => {
  setShowModal4(false);
  setDaftraid('');
  setMarketerid('');
};

      
  
  return (
    <>
    <div className='p-5' id='content'>
    <div className="search-box p-4 mt-2 row g-1">
        <div className="col-md-2">
        <button className="btn"><i class="fa-solid fa-magnifying-glass"></i> بحث</button>
        </div>
        <div className="col-md-10">
        <input className='form-control' name="search" onChange={(e)=> setSearch(e.target.value)} type="search" placeholder='الإيميل' />
        </div>
      </div>
    <div className="clients-table p-4 my-4">
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col"> المستخدم</th>
            {/* <th scope="col">id_المسخدم</th> */}
            <th scope="col"> المحفظة </th>
            <th scope="col">الهاتف </th>
            <th scope="col">الإيميل </th>
            <th scope="col">العنوان </th>
            <th scope="col">cr </th>
            <th></th>
            <th></th>
            <th></th>
            
          </tr>
        </thead>
        <tbody>
          {usersListAdmin.filter((item)=>{
          return search === ''? item : item.email.includes(search);
          }).map((item,index) =>{
            return(
              <tr key={index}>
                <td>{index+1}</td>
                
                {/* {item._id?<td>{item._id}</td>:<td>_</td>} */}
                {item.name? <td>{item.name}</td> :<td>_</td>}
                {item.wallet?<td>{item.wallet}</td>:<td>0</td>}
                {item.mobile?<td>{item.mobile}</td>:<td>_</td>}
                {item.email?<td>{item.email}</td>:<td>_</td>}
                {item.address?<td>{item.address}</td>:<td>_</td>}
                {item.cr && item.cr[0] ? (
        <td><a className='text-danger' href={item.cr[0].replace('public', 'https://dashboard.go-tex.net/api')} target='_blank'>ملف التوثيق</a>
          </td>
      ) : (
        <td>_</td>
      )}                {/* {item.cr?<td>{item.cr[0]}</td>:<td>_</td>} */}
                <td>
                <button
                        className='sdd-deposite btn btn-success mt-2'
                        onClick={() => openModal(item._id,item.name)}
                      >
                        إضافة رصيد
                      </button>
              </td>
              <td>
                {item.iscrproofed === false?<button
                        className='btn btn-orange mt-2'
                        onClick={() =>  openModal2(item.email)}>
                        توثيق النشاط  
                      </button>:<button
                        className='btn btn-danger mt-2'
                        onClick={() =>  openModal3(item.email)}>
                        الغاء التوثيق   
                      </button> }
                
              </td>
              {item.rolle=== "marketer"?(<td>
                <button className="btn btn-dark mt-2"
                onClick={() => {
                  setDaftraid(''); // Reset the input values
                  setMarketerid(item._id); // Set marketerid based on item._id
                  setShowModal4(true); // Open the new modal
                }}>
                  الربط بدفترة
                </button>
              </td>):<td></td>}
                
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
                <h5 className='modal-title'>إضافة رصيد</h5>
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
                  <label htmlFor='deposit'>الرصيد :</label>
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
      {showModal2 && (
        <div className='modal' style={{ display: 'block' }}>
          <div className='modal-dialog'>
            <div className='modal-content'>
              <div className='modal-header'>
                <h5 className='modal-title'>توثيق النشاط التجارى </h5>
                <button
                  type='button'
                  className='close'
                  onClick={closeModal2}
                >
                  <span aria-hidden='true'>&times;</span>
                </button>
              </div>
              <div className='modal-body'>
                <div className='form-group'>
                  <label htmlFor='email'>هل تريد بالفعل توثيق النشاط التجارى لهذا الايميل :</label>
                  <p className='text-danger'>{emailCR2}</p>
                  <label>للتوثيق يرجى ادخاله هنا</label>
                  <input
                    type='email'
                    className='form-control'
                    id='emailcr'
                    value={emailCR}
                    onChange={handleCRChange}
                   
                  />
                </div>
              </div>
              <div className='modal-footer'>
                <button
                  type='button'
                  className='btn btn-primary'
                  onClick={proofCR}
                >
                  توثيق
                </button>
                <button
                  type='button'
                  className='btn btn-secondary'
                  onClick={closeModal2}
                >
                  إلغاء
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

{showModal3 && (
        <div className='modal' style={{ display: 'block' }}>
          <div className='modal-dialog'>
            <div className='modal-content'>
              <div className='modal-header'>
                <h5 className='modal-title'>الغاء توثيق النشاط التجارى </h5>
                <button
                  type='button'
                  className='close'
                  onClick={closeModal3}
                >
                  <span aria-hidden='true'>&times;</span>
                </button>
              </div>
              <div className='modal-body'>
                <div className='form-group'>
                  <label htmlFor='email'>هل تريد بالفعل  الغاء توثيق النشاط التجارى لهذا الايميل :</label>
                  <p className='text-danger'>{emailCR33}</p>
                  <label>لالغاء التوثيق يرجى ادخاله هنا</label>
                  <input
                    type='email'
                    className='form-control'
                    id='emailcr'
                    value={emailCR3}
                    onChange={handleCRChange3}
                   
                  />
                </div>
              </div>
              <div className='modal-footer'>
                <button
                  type='button'
                  className='btn btn-primary'
                  onClick={proofCR3}
                >
                  الغاء التوثيق
                </button>
                <button
                  type='button'
                  className='btn btn-secondary'
                  onClick={closeModal3}
                >
                  إغلاق
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

{showModal4 && (
  <div className="modal" style={{ display: 'block' }}>
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">ربط المسوّق بدفترة</h5>
          <button type="button" className="close" onClick={closeModal4}>
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
          <div className="form-group">
            <label htmlFor="daftraid">id_الدفترة:</label>
            <input
              type="text"
              className="form-control"
              id="daftraid"
              value={daftraid}
              onChange={handleDaftraidChange}
            />
          </div>
          {/* <div className="form-group">
            <label htmlFor="marketerid">معرّف المسوّق:</label>
            <input
              type="text"
              className="form-control"
              id="marketerid"
              value={marketerid}
              readOnly
            />
          </div> */}
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-primary"
            onClick={connectMarketerWithDaftra}
          >
            ربط
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={closeModal4}
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
