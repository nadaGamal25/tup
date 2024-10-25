import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

export default function GenerateLinkPayment(userData) {
  const [itemClientId, setItemClientId] = useState('');
  const [itemClientName, setItemClientName] = useState('');
  const [itemClientId2, setItemClientId2] = useState('');
  const [userId, setUserId] = useState('');
    const [searchClients, setSearchClients]= useState('');
    // const [isClicked, setIsClicked]= useState(false);
    const [isClient, setIsClient]= useState(false);

    const [firstPartOfLink, setFirstPartOfLink] = useState('');

  useEffect(() => {
    // Get the current URL
    const currentURL = window.location.href;

    // Extract the first part of the link
    const firstPart = extractFirstPart(currentURL);

    // Set the state with the first part of the link
    setFirstPartOfLink(firstPart);
  }, []);

  // Function to extract the first part of the link
  const extractFirstPart = (url) => {
    // Use URL constructor to parse the URL
    const parsedUrl = new URL(url);

    // Get the origin (protocol + hostname) from the parsed URL
    const firstPart = parsedUrl.origin;

    return firstPart;
  };

  const [showClientsList, setClientsList] = useState(false);
  const openClientsList = () => {
    setClientsList(true);
  };

  const closeClientsList = () => {
    setClientsList(false);
  };
  useEffect(()=>{
    getClientsList()
    setUserId(userData.userData.data.user.id)
  },[])
  const[clients,setClients]=useState([])
  async function getClientsList() {
    try {
      const response = await axios.get('https://dashboard.go-tex.net/api/clients/get-all-clients',
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('userToken')}`,
        },
      });
      const List = response.data.data;
      console.log(List)
      setClients(List)
    } catch (error) {
      console.error(error);
    }
  }
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


  return (
    <>
    <div className="p-5" id='content'>
      <div className="bg-light pb-4">
    <div className="search-box px-4 py-5 mt-2 mb-3 ">
        <div className="row g-1">
           <div className="col-md-2">
           <button className="btn"><i class="fa-solid fa-magnifying-glass"></i> اختيار عميل</button>
           </div>
           <div className="col-md-10">
           <input type="search" className="form-control ic" name='client' placeholder='الاسم'
                   onChange={(e)=>{ 
                     const searchValue = e.target.value;
                     setSearchClients(searchValue);
                     const matchingClients = clients.filter((item) => {
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
                         
                       {clients && clients.filter((item)=>{
                       return searchClients === ''? item : item.name.toLowerCase().includes(searchClients.toLowerCase());
                       }).map((item,index) =>{
                        return(
                         <>
                         <li key={index} name='' 
                         onClick={(e)=>{ 
   
                           const selectedCity = e.target.innerText;
                           
                           setItemClientId(item._id);
                           setItemClientName(item.name.replace(/\s/g, ''));
                           setIsClient(true)
                           
                          
                           document.querySelector('input[name="client"]').value = selectedCity;
                           // getOrderData(e)
                           closeClientsList();
                       }}
                         >
                           {item.name} , <br/> {item.mobile} , {item.city}
                           {/* {item.Client.first_name} {item.Client.last_name}, {item.Client.email} , {item.Client.phone1} , {item.Client.city} , {item.Client.address1} */}
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
                   
                   
           {/* <input className='form-control' name="search" onChange={(e)=> setSearch(e.target.value)} type="search" placeholder='الإيميل' /> */}
           </div>
           </div>
           
         </div>
         {/* <div className="text-center py-3 ">
            <button className="btn btn-primary mb-3" onClick={()=> {setIsClicked(true)
            setItemClientId2(itemClientId)}}>
            إنشاء رابط للعميل
            </button>
            
           </div> */}
           <div className="link-box p-3 text-center" >
              {isClient == false ?<p className='text-danger fw-bold'>يجب اختيار عميل ..</p>:
              <p className='text-primary' dir='ltr'>{`${firstPartOfLink}/formPayment/${userId}/${itemClientId}/${itemClientName}`}</p>}
            
            </div>
           </div>
    </div>
    </>
  )
}
