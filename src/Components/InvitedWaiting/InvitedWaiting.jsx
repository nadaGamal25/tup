import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function InvitedWaiting() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchOption, setSearchOption] = useState('clint');
  const [waitingList, setWaitingList] = useState([]);
  const [filteredWaitingList, setFilteredWaitingList] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [openItems, setOpenItems] = useState([]);
  const openShow = (item) => {
    setSelectedItem(item);
    setOpenItems((prevOpenItems) => [...prevOpenItems, item._id]);
  };
  
  const closeShow = () => {
    setSelectedItem(null);
    setOpenItems([]);
  };
  

  // const[show,setShow]=useState(false)
  // const openShow = (item) => {
  //   setSelectedItem(item);
  //   setShow(true);
  // };
  
  // const closeShow = () => {
  //            setShow(false);
  //         };

  useEffect(() => {
    getWaitingListsAdmin();
  }, [searchTerm, searchOption]); 
        async function accept(orderId) {
        try {
          const response = await axios.get(`https://dashboard.go-tex.net/api/invatation/accept-invitation/${orderId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('userToken')}`,
            },
          });
          if (response.status === 200) {
          console.log(response)
          window.alert('تم قبول الدعوة')
          }
        } catch (error) {
          console.error(error.response);
        }
      }

  async function getWaitingListsAdmin() {
    try {
      const response = await axios.get(
        'https://dashboard.go-tex.net/api/invatation/get-invitations-wait',
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('userToken')}`,
          },
        }
      );
      const waitinglist = response.data.data;
      setWaitingList(waitinglist);
      console.log(waitingList)
      console.log(response.data)

      const filteredList = waitinglist.filter((item) => {
        if (searchOption === 'clint') {
          return item.clint.email.includes(searchTerm);
        } else if (searchOption === 'markter') {
          return item.markter.email.includes(searchTerm);
        }
        return true;
      });
      setFilteredWaitingList(filteredList);
    } catch (error) {
      console.error(error.response);
    }
  }

  return (
    <>
    <div className='p-5' id='content'>
      <div className=" p-4 mt-2 row g-1">
      <div className="col-md-3">
          <button
            className={`toggle-button ${searchOption === 'clint' ? 'active' : ''}`}
            onClick={() => setSearchOption('clint')}
          >
            بحث بايميل العميل
          </button>
          <button
            className={`toggle-button ${searchOption === 'markter' ? 'active' : ''}`}
            onClick={() => setSearchOption('markter')}
          >
            بحث بايميل المسوق
          </button>
        </div>
      <div className="col-md-9">
          <input
          className='form-control'
            type='search'
            placeholder='Search'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
       
      </div>
        
        {filteredWaitingList.map((item, index) => {
            const isItemOpen = openItems.includes(item._id);

          return (
            <div className="row my-3">
      <div className="d-flex bg-light p-3 ll">
        <table className="table table-borderless">
        <thead>
          <tr key={item._id}>
            <th scope="col">{index +1}</th>
            <th scope="col">المسوق  </th>
            <th scope="col"> ايميل المسوق </th>
            <th scope="col">العميل </th>
            <th scope="col">ايميل العميل </th>
            <th></th>            
          </tr>
        </thead>
        <tbody>
          <tr>
            <td></td>
          <td>{item.markter.name}</td>
          <td>{item.markter.email}</td>
          <td>{item.clint.name}</td>
          <td>{item.clint.email}</td>
          <td>
          {/* <button onClick={openShow} className="btn btn-dark">قبول الدعوة</button> */}
          {/* <button onClick={() => openShow(item)} className="btn btn-dark">
                  قبول الدعوة
                </button> */}
                <button onClick={() => (isItemOpen ? closeShow() : openShow(item))} className="btn btn-dark">
                  {isItemOpen ? 'اغلاق' : 'قبول الدعوة'}
                </button>
          </td>
          </tr>
        </tbody>
        </table>
        
       
      </div>
      {isItemOpen  && (
        <div className="bg-light my-3 p-3 ll">
        <h4 className='text-center'>قبول الدعوة</h4>
        <table className="table">
          <thead>
            <tr>
            <td scope="col">الشركة</td>
            <td scope="col">الدفع اونلاين</td>
            <td scope="col">الدفع COD</td>
            </tr>
          </thead>
          <tbody>
            <tr>
            <td>gotex</td>
            <td>{selectedItem.companies[0].onlinePayment}</td>
            <td>{selectedItem.companies[0].cod}</td>
            </tr>
            <tr>
            <td>{selectedItem.companies[1].name}</td>
            <td>{selectedItem.companies[1].onlinePayment}</td>
            <td>{selectedItem.companies[1].cod}</td>
            </tr>
            <tr>
            <td>{selectedItem.companies[2].name}</td>
            <td>{selectedItem.companies[2].onlinePayment}</td>
            <td>{selectedItem.companies[2].cod}</td>
            </tr>
            <tr>
            <td>{selectedItem.companies[3].name}</td>
            <td>{selectedItem.companies[3].onlinePayment}</td>
            <td>{selectedItem.companies[3].cod}</td>
            </tr>
            <tr>
            <td>{selectedItem.companies[4].name}</td>
            <td>{selectedItem.companies[4].onlinePayment}</td>
            <td>{selectedItem.companies[4].cod}</td>
            </tr>

          </tbody>
        </table>
        {/* <button className="btn btn-dark " onClick={() => accept(selectedItem._id)}>
          قبول
        </button>
        <button onClick={closeShow} className="btn btn-secondary mx-3"> اغلاق</button> */}
        <button className="btn btn-dark" onClick={() => accept(item._id)}>
            قبول
          </button>
          <button onClick={closeShow} className="btn btn-secondary mx-3">اغلاق</button>
      </div>
      )}
      </div>
          );
        })}
   
      {/* {waitingList2 && waitingList2.map((item,index) =>{
            return(
<div className="row my-3">
      <div className="d-flex bg-light p-3 ll">
        <table className="table table-borderless">
        <thead>
          <tr>
            <th scope="col">{index +1}</th>
            <th scope="col">المسوق  </th>
            <th scope="col"> ايميل المسوق </th>
            <th scope="col">العميل </th>
            <th scope="col">ايميل العميل </th>
            <th></th>            
          </tr>
        </thead>
        <tbody>
          <tr>
            <td></td>
          <td>{item.markter.name}</td>
          <td>{item.markter.email}</td>
          <td>{item.clint.name}</td>
          <td>{item.clint.email}</td>
          <td>
          <button onClick={openShow} className="btn btn-dark">قبول الدعوة</button>
          </td>
          </tr>
        </tbody>
        </table>
        
       
      </div>
      {show && ( 
        <div className="bg-light my-3 p-3 ll">
        <h4 className='text-center'>قبول الدعوة</h4>
        <table className="table">
          <thead>
            <tr>
            <td scope="col">الشركة</td>
            <td scope="col">الدفع اونلاين</td>
            <td scope="col">الدفع COD</td>
            </tr>
          </thead>
          <tbody>
            <tr>
            <td>gotex</td>
            <td>{item.companies[0].onlinePayment}</td>
            <td>{item.companies[0].cod}</td>
            </tr>
            <tr>
            <td>{item.companies[1].name}</td>
            <td>{item.companies[1].onlinePayment}</td>
            <td>{item.companies[1].cod}</td>
            </tr>
            <tr>
            <td>{item.companies[2].name}</td>
            <td>{item.companies[2].onlinePayment}</td>
            <td>{item.companies[2].cod}</td>
            </tr>
            <tr>
            <td>{item.companies[3].name}</td>
            <td>{item.companies[3].onlinePayment}</td>
            <td>{item.companies[3].cod}</td>
            </tr>
            <tr>
            <td>{item.companies[4].name}</td>
            <td>{item.companies[4].onlinePayment}</td>
            <td>{item.companies[4].cod}</td>
            </tr>

          </tbody>
        </table>
        <button className="btn btn-dark " onClick={() => accept(item._id)}>
          قبول
        </button>
        <button onClick={closeShow} className="btn btn-secondary mx-3"> اغلاق</button>
      </div>
      )}
      </div>
            )
          }
          )} */}



 {/* <div className="d-flex p-3">
        <h4>الشركة</h4>
        <h4>الدفع اونلاين</h4>
        <h4>الدفع COD</h4>
        </div>
        <div className="d-flex p-3">
        <h4>{item.companies[0].name}</h4>
        <h4>{item.companies[0].name}</h4>
        <h4>{item.companies[0].onlinePayment}</h4>
        </div> */}       
      
    {/* <div className="clients-table p-4 my-4">
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">اسم المسوق</th>
            <th scope="col">ايميل المسوق</th>
            <th scope="col">اسم العميل </th>
            <th scope="col">ايميل العميل </th>
            <th scope="col"> </th>
            
          </tr>
        </thead>
        <tbody>
          {waitingList2 && waitingList2.map((item,index) =>{
            return(
              <tr key={index}>
                <td>{index+1}</td>
                {item.markter.name?<td>{item.markter.name}</td>:<td>_</td>}
                {item.markter.email?<td>{item.markter.email}</td>:<td>_</td>}
                {item.clint.name? <td>{item.clint.name}</td> : <td>_</td>}
                {item.clint.email?<td>{item.clint.email}</td>:<td>_</td>}
                <td></td>


              </tr>
            )
          }
          )}
        </tbody>
      </table>
     </div> */}
    </div>
    </>
  )
}
