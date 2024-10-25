import React, { useEffect, useState } from 'react'
import {Modal , Button} from 'react-bootstrap';
import axios from 'axios';

export default function ClientOrdersPreview({item}) {
    useEffect(()=>{
        console.log(item)
    },[])

    const getCompanyLength = (company, orders) => {
        const companyOrders = orders.filter(order => order.company === company);
        return companyOrders.length;
    };

    const [orderDetails, setOrderDetails] =useState('')
    const [showModal, setShowModal] = useState(false);
    const openModal = () => {
        setShowModal(true);
      };
    
      const closeModal = () => {
        setShowModal(false);
      };
      async function showOrderDetails(orderId) {
        try {
          const response = await axios.post(
            `http`,
            
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('userToken')}`,
              },
            }

          );
          console.log(response.data);
          setOrderDetails(response.data)
          openModal()
        } catch (error) {
          console.error(error);
          window.alert(error.response.data.msg)
        }
      }
    
  return (
    <>
    <div className="client-orders-cotainer p-5 min-vh-100">
        <div className=" mx-2 p-3 light-box name-box d-flex align-items-center">
            <h5>العميل : </h5>
            <h4> {item.name} </h4>
        </div>
        <div className="light-box orders-box mx-2 mt-3 p-3">
            <h5 className="text-center">عدد الشحنات الكلى : <span>{item.orders.length}</span></h5>
            <div className="row py-3 text-center" dir='ltr'>
            <div className="col-md-4">
            <h5 className="">saee   : <span>{getCompanyLength('saee', item.orders)}</span></h5>
        </div>
        <div className="col-md-4">
            <h5 className="">aramex   : <span>{getCompanyLength('aramex', item.orders)}</span></h5>
        </div>
        <div className="col-md-4">
            <h5 className="">smsa   : <span>{getCompanyLength('smsa', item.orders)}</span></h5>
        </div>
        <div className="col-md-4">
            <h5 className="">imile   : <span>{getCompanyLength('imile', item.orders)}</span></h5>
        </div>
        <div className="col-md-4">
            <h5 className="">jt   : <span>{getCompanyLength('jt', item.orders)}</span></h5>
        </div>
        <div className="col-md-4">
            <h5 className="">gotex   : <span>{getCompanyLength('anwan', item.orders)}</span></h5>
        </div>
        <div className="col-md-4">
            <h5 className="">spl   : <span>{getCompanyLength('spl', item.orders)}</span></h5>
        </div>
            </div>
        </div>
        {/* <div className="clients-table p-4 my-4">
      <table className="table">
        <thead>
          <tr>
          <th scope="col">#</th>
            <th scope="col">الشركة </th>
            <th scope="col">id_الشحنة </th>  
            <th scope="col"> </th>  
          </tr>
        </thead>
        <tbody>
          {item.orders && item.orders.map((item,index) =>{
            return(
              <tr key={index}>
                

                <td>{index+1}</td>
                {item.company ==="anwan"?<td>gotex</td>:<td>{item.company}</td>}
                {item.id?<td>{item.id}</td>:<td>_</td>}
                <td>
                    <button className="btn btn-orange">تفاصيل الشحنة</button>
                </td>
              </tr>
            )
          }
          )}
        </tbody>
      </table>
     </div> */}

     <div className="p-5"></div>
    </div>
    {showModal && (
        <div className='modal' style={{ display: 'block' }}>
          <div className='modal-dialog'>
            <div className='modal-content'>
              <div className='modal-header'>
                <h5 className='modal-title'> بيانات الشحنة </h5>
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
                  

                </div>
              </div>
              <div className='modal-footer'>
                
                <button
                  type='button'
                  className='btn btn-secondary'
                  onClick={closeModal}
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
