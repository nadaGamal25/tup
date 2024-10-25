import React, { useEffect, useState,useRef ,createRef } from 'react'
import axios from 'axios'

export default function PackegesMarketers() {
    useEffect(()=>{
        getClientsList()
        getPackeges()
        getUserBalance()
      },[])
      const [userBalance,setUserBalance]=useState('')
      async function getUserBalance() {
        try {
          const response = await axios.get('https://dashboard.go-tex.net/api/user/get-user-balance',
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('userToken')}`,
            },
          });
          const balance = response.data.data;
          console.log(balance)
          setUserBalance(balance)
        } catch (error) {
          console.error(error);
        }
      }
      const [search, setSearch]= useState('')

      const[clients,setClients]=useState([])
      async function getClientsList() {
        try {
          const response = await axios.get('https://dashboard.go-tex.net/api/clients/get-all-clients',
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
      const [packeges,setPackeges]=useState([])
  async function getPackeges() {
    try {
      const response = await axios.get('https://dashboard.go-tex.net/api/package');
      console.log(response)
      setPackeges(response.data.data)
      
    } catch (error) {
      console.error(error);
    }
  }
  const [selectedUserId, setSelectedUserId] = useState(null);
  async function buyPackage(packageId ,selectedId) {
    try {
      const response = await axios.post(`https://dashboard.go-tex.net/api/package/buy-client-package/${packageId}`,
      {
        clientId : selectedId,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('userToken')}`,
        },
      });
      if (response.status === 200) {
        console.log(response)
        getUserBalance()
        window.alert("تم شراء الباقة بنجاح");
      } else {
        console.log(response)
      }
    } catch (error) {
      console.log(error);
      // window.alert('somthing wrong');
      alert(error.response.data.msg)
    }
  }
  const [packageDetails, setPackageDetails] =useState('')
  const [packageName, setPackageName] =useState('')
  async function getPackageDetails(selectedId,name) {
    setPackageName(name)
    try {
      const response = await axios.get(`https://dashboard.go-tex.net/api/package/get-client-package/${selectedId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('userToken')}`,
        },
      });
      if (response.status === 200) {
        console.log(response)
        setPackageDetails(response.data.data)
        openModalDetails(selectedId)
      } else {
        console.log(response)
      }
    } catch (error) {
      console.log(error);
      // window.alert('somthing wrong');
      alert(error.response.data.msg)
    }
  }
  const [showModal, setShowModal] = useState(false);
  function openModal(clientid){
    setShowModal(true)
    setSelectedUserId(clientid)
  }
  function closeModal(){
    setShowModal(false)
  }
  const [showModalDetails, setShowModalDetails] = useState(false);
  function openModalDetails(clientid){
    setShowModalDetails(true)
    setSelectedUserId(clientid)
  }
  function closeModalDetails(){
    setShowModalDetails(false)
  }
  return (
    <>
    <div className='px-4 pt-2 pb-4' id='content'>
    <div className=" px-3 pt-4 pb-2 mb-2" dir='ltr'>
      <span class="wallet-box">الرصيد الحالى
                (<span className='txt-blue'> {userBalance}</span> ر.س)
                </span>
      </div>
      <div className="gray-table p-2">
        <p className="email-note">* لا يمكن شراء اكثر من باقة للعميل فى نفس الوقت</p>
        <p className="email-note">* سوف يتم أخذ قيمة الباقة من محفظة العميل واذا كانت خالية سيتم السحب من محفظة المدخلة</p>
        <p className="email-note">* عند انتهاء الباقة سيتم السحب من رصيد المحفظة </p>
        <p className="email-note">* يمكن الغاء الباقة فى حالة عدم استخدامها فقط</p>
        
      </div>
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
            <th scope="col">العنوان </th>
            <th scope="col">المحفظة </th>
            <th scope="col">الcredit </th>
            {/* <th scope="col">الشحنات </th>
            <th scope="col">ملاحظات </th> */}
            <th scope="col"></th>            
            <th scope="col"></th>            
            <th scope="col"></th>            

           
          </tr>
        </thead>
        <tbody>
          {clients.filter((item)=>{
          return search === ''? item : item.name.includes(search);
          }).map((item,index) =>{
            return(
              <tr key={index}>
                

                <td>{index+1}</td>
                {item.name?<td>{item.name}</td>:<td>_</td>}
                {item.address?<td>{item.address}</td>:<td>_</td>}
                
                {item.wallet?<td>{item.wallet}</td>:<td>0</td>}
                {item.credit?<td>{item.credit.limet} <br/>
                {item.credit.status}</td>:<td>0</td>}
                <td>
                    <button className="btn btn-orange" onClick={()=>{
                        openModal(item._id)}}>
                        شراء باقة 
                    </button>
                </td>
                <td>
                  <button className="btn btn-success" onClick={()=> getPackageDetails(item._id,item.name)}>
                    تفاصيل باقته
                  </button>
                </td>
                <td>
        <button
            className="btn btn-danger"
            onClick={() => {
              if (window.confirm('هل انت بالتأكيد تريد حذف هذه الباقة ؟')) {
                const clientId = item._id;
                axios
                  .get(`https://dashboard.go-tex.net/api/package/cancel-client-package/${clientId}`, 
                   {
                    headers: {
                      Authorization: `Bearer ${localStorage.getItem('userToken')}`,
                    },
                  })
                  .then((response) => {
                    if (response.status === 200) {
                      console.log(response)
                      getUserBalance()
                      alert('تم الغاء الباقة بنجاح وتم استرجاع المال')

                    }
                  })
                  .catch((error) => {
                    console.error(error);
                    alert(error.response.data.msg)
                });
              }
            }}
          >
             إلغاء الباقة
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
                <h5 className='modal-title'>شراء باقة  </h5>
                <button
                  type='button'
                  className='close'
                  onClick={closeModal}
                >
                  <span aria-hidden='true'>&times;</span>
                </button>
              </div>
              <div className='modal-body'>
              <div className="clients-table p-1">
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">الشركات  </th> 
            <th scope="col">سعر الباقة</th>
            <th scope="col">عدد الشحنات </th>
            <th></th>           
            
          </tr>
        </thead>
        <tbody>
          {packeges && packeges.map((item,index) =>(
            item !== null ? (
              <tr key={index}>
                <td>{index+1}</td>
                {item.companies ? (
          <td>
            {item.companies.map((company) => (
                  <span >{company === "anwan" ? "gotex , " :company === "all" ? " جميع الشركات " : company + " , "} </span>
                  ))}
          </td>
        ) : (
          <td>_</td>
        )}
        {item.price?<td>{item.price}</td>:<td>_</td>}
                {item.numberOfOrders?<td>{item.numberOfOrders}</td>:<td>_</td>}
                
                <td>
                    <button type='button' className="btn btn-orange" 
                    onClick={()=> {buyPackage(item._id,selectedUserId)}}
                    >
                        شراء
                    </button>
                </td>
              </tr>
            ): null
          )
          
          
          )}
        </tbody>
      </table>
     </div>
                
              </div>
              <div className='modal-footer'>
                
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
       {showModalDetails && (
        <div className='modal' style={{ display: 'block' }}>
          <div className='modal-dialog'>
            <div className='modal-content'>
              <div className='modal-header'>
                <h5 className='modal-title'> تفاصيل باقة 
                <span className="text-primary px-1">
                {packageName}  
                </span>
                </h5>
                <button
                  type='button'
                  className='close'
                  onClick={closeModalDetails}
                >
                  <span aria-hidden='true'>&times;</span>
                </button>
              </div>
              <div className='modal-body'>
              {packageDetails.companies && packageDetails.companies.length === 0?(
             <div className="package-details">
             <p className="cancelpackage text-danger">                  
             هذا العميل ليس لديه باقة حاليا..</p>
             </div>
          ): <div className="package-details">
          <div className="row">
    <div className="col-md-6 py-1">
      <label htmlFor="">سعر الباقة :</label>
      <span>{packageDetails.price}  ريال</span>
    </div>
    <div className="col-md-6 py-1">
      <label htmlFor="">عدد الشحنات : </label>
      <span>{packageDetails.numberOfOrders}</span>
    </div>
    <div className="col-md-12 py-1">
      <label htmlFor="">شركات الشحن  : </label>
      {packageDetails.companies ? (
    <span>
      {packageDetails.companies.map((company) => (
                  <span >{company === "anwan" ? "gotex , " :company === "all" ? " جميع الشركات " : company + " , "} </span>
                  ))}
    </span>
  ) : (
    <span>_</span>
  )}
    </div>
    <div className="col-md-12 py-1">
      <label htmlFor="">الشحنات المتبقة  : </label>
      <span className='text-danger'>{packageDetails.availableOrders}</span>
    </div>
    
    </div>
          </div>
          }
               
            
                
              </div>
              <div className='modal-footer'>
                
                <button
                  type='button'
                  className='btn btn-secondary'
                  onClick={closeModalDetails}
                >
                  إغلاق
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
       
    </>
      )
}
