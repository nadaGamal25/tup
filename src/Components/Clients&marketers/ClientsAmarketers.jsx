import React, { useEffect, useState ,useRef} from 'react'
import axios from 'axios'
export default function ClientsAmarketers() {
    useEffect(()=>{
      getClientsAdmin()
      getMarketerssAdmin()
      },[])
      const [marketersAdmin,setMarketersAdmin]=useState([])
     
    async function getMarketerssAdmin() {
        try {
          const response = await axios.get('https://dashboard.go-tex.net/api/markter/get-all-markter',
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('userToken')}`,
            },
          });
          const clients = response.data.data;
          console.log(clients)
          setMarketersAdmin(clients)
        } catch (error) {
          console.error(error);
        }
      }
      const [Clients,setClientsAdmin]=useState([])
     
    async function getClientsAdmin() {
        try {
          const response = await axios.get('https://dashboard.go-tex.net/api/admin/get-all-clients',
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('userToken')}`,
            },
          });
          const clients = response.data.data;
          console.log(clients)
          setClientsAdmin(clients)
        } catch (error) {
          console.error(error);
        }
      }
      const [searchClients, setSearchClients]= useState('')

      const [showClientsList, setClientsList] = useState(false);
      const openClientsList = () => {
        setClientsList(true);
      };
    
      const closeClientsList = () => {
        setClientsList(false);
      };
      const clientsListRef = useRef(null);

    useEffect(() => {
      const handleOutsideClick = (e) => {
        if (
          clientsListRef.current &&
          !clientsListRef.current.contains(e.target) &&
          e.target.getAttribute('name') !== 'client'
        ) {
          closeClientsList();
        }
      };
  
      if (showClientsList) {
        window.addEventListener('click', handleOutsideClick);
      }
  
      return () => {
        window.removeEventListener('click', handleOutsideClick);
      };
    }, [showClientsList]);
      const [search, setSearch]= useState('')
      async function connectMarketerWithClient() {
        try {
          const response = await axios.post(
            'https://dashboard.go-tex.net/api/clients/add-client-code',
            {
                clientId: clientid,
                marketerCode: marketerid,
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('userToken')}`,
              },
            }
          );
          window.alert('تم ربط المسوق بالمتجر بنجاح')
          console.log(response.data);
      
          closeModal4();
        } catch (error) {
          console.error(error);
          alert(error.response.data.msg)
        }
      }
      const [clientid, setClientid] = useState('');
      const [marketerid, setMarketerid] = useState('');
      
      const handleMarketeridChange = (event) => {
        setMarketerid(event.target.value);
      };
      const [showModal4, setShowModal4] = useState(false);

const openModal4 = () => {
  setShowModal4(true);
};

const closeModal4 = () => {
  setShowModal4(false);
  setClientid('');
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
        <input className='form-control' name="search" onChange={(e)=> setSearch(e.target.value)} type="search" placeholder='الاسم' />
        </div>
      </div>
    <div className="clients-table p-4 my-4">
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">الاسم </th>
            {/* <th scope="col">الشركة </th> */}
            <th scope="col">الهاتف </th>
            {/* <th scope="col">الايميل </th> */}
            <th scope="col">المدينة </th>
            <th scope="col">العنوان </th>
            <th scope="col">الفروع  </th>
            <th scope="col"> </th>
            
            
          </tr>
        </thead>
        <tbody>
          {Clients && Clients.filter((item)=>{
          return search === ''? item : item.name.includes(search);
          }).map((item,index) =>{
            return(
              <tr key={index}>
                <td>{index+1}</td>
                {item?<td>{item.name}</td>:<td>_</td>}
                {/* {item?<td>{item.company}</td>:<td>_</td>} */}
                {item?<td>{item.mobile}</td>:<td>_</td>}
                {/* {item.email?<td>{item.email}</td>:<td>_</td>} */}
                {item.code?<td>{item.city}</td>:<td>_</td>}
                {item?<td>{item.address}</td>:<td>_</td>}
                {item.branches ? (
          <td>
            {item.branches.map((branche) => (
              <span key={branche._id}>{branche.city}  {branche.address} & </span>
            ))}
          </td>
        ) : (
          <td>_</td>
        )}
              <td>
              <button className="btn btn-dark"
                onClick={() => {
                  setClientid(item._id); 
                  setMarketerid(''); 
                  setShowModal4(true); 
                }}>
                  الربط بالمسوق
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
         {showModal4 && (
  <div className="modal" style={{ display: 'block' }}>
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">ربط المسوّقة بالمتجر</h5>
          <button type="button" className="close" onClick={closeModal4}>
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
          <div className="form-group">
          <div className="search-box p-4 mt-2 ">
           
           <div className="">
           <input type="search" className="form-control ic" name='client' placeholder='اسم المسوقة'
                   onChange={(e)=>{ 
                     const searchValue = e.target.value;
                     setSearchClients(searchValue);
                     const matchingClients = marketersAdmin.filter((item) => {
                       return searchValue === '' ? item : item.name.toLowerCase().includes(searchValue.toLowerCase());
                     });
                 
                     if (matchingClients.length === 0) {
                       closeClientsList();
                     } else {
                       openClientsList();
                     }
                     }}
                     onClick={openClientsList}
                     />
                     {showClientsList && (
                       <ul  className='ul-cities ul-clients' ref={clientsListRef}>
                         
                       {marketersAdmin && marketersAdmin.filter((item)=>{
                       return searchClients === ''? item : item.name.toLowerCase().includes(searchClients.toLowerCase());
                       }).map((item,index) =>{
                        return(
                         <>
                         <li key={item._id} name='' 
                         onClick={(e)=>{ 
                          setMarketerid(item.code)
                           const selectedCity = e.target.innerText;
                       
  
                           document.querySelector('input[name="client"]').value = selectedCity;
                           closeClientsList();
                       }}
                         >
                           {item.name} , {item.code} 
                        </li>
                        </>
                        )
                       }
                       )}
                       <li onClick={(e)=>{ 
                           const selectedCity = e.target.innerText;
                           document.querySelector('input[name="client"]').value = selectedCity;
                           closeClientsList();
                       }}>غير ذلك</li>
                       </ul>
                     )}
                   
                   
           </div>
         </div>
            {/* <label htmlFor="">كود المسوق:</label>
            <input
              type="text"
              className="form-control"
              value={marketerid}
              onChange={handleMarketeridChange}
            /> */}

          </div>
          
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-primary"
            onClick={connectMarketerWithClient}
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
         </>  )
}
