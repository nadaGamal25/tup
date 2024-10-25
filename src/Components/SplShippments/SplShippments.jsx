import React, { useState, useEffect, useRef } from 'react';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css'
import ar from 'react-phone-number-input/locale/ar'
import axios from 'axios';
import Joi from 'joi';
import { Link } from 'react-router-dom';
import SplSticker from '../SplSticker/SplSticker';

export default function SplShippments(userData) {
    const [phoneValue ,setPhoneValue]=useState()
    const [phone2,setPhone2] =useState()
    const [phone3,setPhone3] =useState()
    const [errorList, seterrorList]= useState([]); 
    const [packageCompanies, setPackageCompanies] = useState('');
    const [packageOrders, setPackageOrders] = useState('');
    const [clientWallet, setClientWallet] = useState('');
    const [clientCredit, setClientCredit] = useState('');
    const [clientCreditStatus, setClientCreditStatus] = useState('');
    const [isWallet,setIsWallet]=useState(false);
    const [isClient,setIsClient]=useState(false);
    const [companyKgPrice, setCompanyKgPrice]=useState('');
    const [companyMarketerPrice, setCompanyMarketerPrice]=useState('');
    const [itemName2, setItemName2] = useState('');
  const [itemMobile2, setItemMobile2] = useState('');
  const [itemAddress2, setItemAddress2] = useState('');
  const [itemName0, setItemName0] = useState('');
  const [itemMobile0, setItemMobile0] = useState('');
  const [itemAddress0, setItemAddress0] = useState('');
  const [itemName, setItemName] = useState('');
  const [itemMobile, setItemMobile] = useState('');
  const [itemCity, setItemCity] = useState('');
  const [itemAddress, setItemAddress] = useState('');
  const [itemId, setItemId] = useState('');
  const [itemClientId, setItemClientId] = useState('');
  const [senderCityName, setSenderCityName] =useState('')
  const [senderGovernoretName, setSenderGovernoretName] =useState('')
  const [recieverCityName, setRecieverCityName] =useState('')
  const [recieverCityId, setRecieverCityId] =useState('')
  const [recieverGovernoretName, setRecieverGovernoretName] =useState('')
  const [pieces, setPieces] = useState([
    // {
    //   PieceWeight: '',
    //   PieceDescription: '',
    // },
  ]);


  const [orderData,setOrderData] =useState({
    reciverName: "",
    reciverMobile: "",
    SenderName: "",
    SenderMobileNumber: "",
    cod: false,
    ContentPrice: "",
    ContentDescription: "",
    weight: "",
    BoxLength: "",
    BoxWidth: "",
    BoxHeight: "",
    description: "",
    pickUpDistrictID: "",
    pickUpAddress1: "",
    pickUpAddress2: "",
    deliveryDistrictID: "",
    deliveryAddress1: "",
    deliveryAddress2: "",
    Pieces: pieces, 
    markterCode:"", 
    clintid:'',
    // daftraid:'',
    shipmentValue:"",
    pickUpDistrict:"",
    deliveryDistrict:"",
    pickUpGovernorate:"",
    deliveryGovernorate:"",
  })
  const [error , setError]= useState('')
  const [isLoading, setisLoading] =useState(false)
  const [shipments,setShipments]=useState([])

  async function sendOrderDataToApi() {
    console.log(localStorage.getItem('userToken'))

    try {
      const response = await axios.post(
        "https://dashboard.go-tex.net/api/spl/crete-new-order",
        {
            ...orderData,
            Pieces: pieces
          },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('userToken')}`,
          },
        }
      );
  
      if (response.status === 200) {
        setisLoading(false);
        window.alert("تم تسجيل الشحنة بنجاح");
        getUserBalance()
        getPackageDetails()
        if (response.data.clientData && response.data.clientData.package && response.data.clientData.package.availableOrders) {
          setPackageOrders(response.data.clientData.package.availableOrders);
        } else {
          setPackageOrders('');
        }
        if (response.data.clientData.credit && response.data.clientData.credit.limet && response.data.clientData.credit.status === 'accepted') {
          setClientCredit(response.data.clientData.credit.limet);
          setClientCreditStatus(response.data.clientData.credit.status);
        } else {
          setClientCredit(0);
        }
            setClientWallet(response.data.clientData.wallet)
        
        console.log(response.data.data);
        console.log(response);
        const shipment = response.data.data;
        setShipments(prevShipments => [...prevShipments, shipment]);
        console.log(shipments)      
    }else if (response.status === 400) {
        setisLoading(false);
        const errorMessage = response.data?.data?.Message || "An error occurred.";
        window.alert(`${errorMessage}`);
        console.log(response.data);
      }
    } catch (error) {
      // Handle error
      console.error(error);
      console.log(orderData)
      setisLoading(false);
      const errorMessage = error.response?.data?.data?.Message || "An error occurred.";
      window.alert(`${errorMessage}`);
    }
  }
  
// function submitOrderUserForm(e){
//   e.preventDefault();
//   setisLoading(true)
//   let validation = validateOrderUserForm();
//   console.log(validation);
//   if(validation.error){
//     setisLoading(false)
//     seterrorList(validation.error.details)

//   }else{
//     sendOrderDataToApi();
//   }
// }

function submitOrderUserForm(e) {
  e.preventDefault();
  setisLoading(true);
  // getOrderData({ target: { name: 'deliveryDistrict', value: recieverCityName } });
  let validation = validateOrderUserForm();
  console.log(validation);
  console.log(pieces)
  const weightPrice = orderData.weight <= 15 ? 0 : (orderData.weight - 15) * companyKgPrice;
  const shipPrice =companyMarketerPrice
  console.log(clientCredit);
  console.log(shipPrice);
  console.log(weightPrice)
  if (userData.userData.data.user.rolle === "user") {
    if (validation.error) {
      setisLoading(false);
      seterrorList(validation.error.details);
    } else {
      sendOrderDataToApi();
    }
  } else if (userData.userData.data.user.rolle === "marketer") {
    if (validation.error) {
      setisLoading(false);
      seterrorList(validation.error.details);
    } else if(isClient === false){
      sendOrderDataToApi();
    } else if(isClient === true && (packageCompanies.includes('spl')||packageCompanies.includes('all') && packageOrders > 0)){
      if(window.confirm('سوف يتم عمل الشحنة من باقة العميل')){
        sendOrderDataToApi()
      }else{
        setisLoading(false)
      }
    }else if(isClient === true && orderData.cod !== false){
      sendOrderDataToApi()
    }else if(isClient === true && orderData.cod === false && (clientWallet > (shipPrice + weightPrice)) ){
      if(window.confirm('سوف يتم عمل الشحنة من محفظة العميل')){
        sendOrderDataToApi()
      }else{
        setisLoading(false)
      }
    }else if(isClient === true && orderData.cod === false && (clientCredit > (shipPrice + weightPrice)) ){
      if(window.confirm('سوف يتم عمل الشحنة من كرديت (رصيد الحد الائتمانى) للعميل')){
        sendOrderDataToApi()
      }else{
        setisLoading(false)
      }
    }else{
      if(window.confirm(' رصيد العميل لا يكفى لعمل الشحنة سوف يتم عمل الشحنة من محفظتك')){
        sendOrderDataToApi()
      }else{
        setisLoading(false)
      } 
    }

  }
}


function getOrderData(e) {
  let myOrderData;

    if (userData.userData.data.user.rolle === "marketer") {
      myOrderData = { ...orderData, SenderName: itemName,
        pickUpDistrictID: itemCity,
        SenderMobileNumber: itemMobile,
        pickUpAddress1: itemAddress,
        reciverName: itemName2,
        reciverMobile: itemMobile2,
        deliveryAddress1: itemAddress2,
        clintid: itemClientId,
        // daftraid:itemId,
        deliveryDistrictID:recieverCityId,
        pickUpDistrict:senderCityName,
        pickUpGovernorate:senderGovernoretName,
        deliveryDistrict:recieverCityName,
        deliveryGovernorate:recieverGovernoretName,
      };
    } else {
      myOrderData = { ...orderData };
    }

  if (e.target.type === "number") {
    myOrderData[e.target.name] = Number(e.target.value);
  } else if (e.target.value === "true" || e.target.value === "false") {
    myOrderData[e.target.name] = e.target.value === "true";
  } else {
    myOrderData[e.target.name] = e.target.value || e.target.innerText;
  }
    setOrderData(myOrderData);
    console.log(myOrderData);
  console.log(myOrderData.cod);
}

function validateOrderUserForm(){
    const pieceSchema = Joi.object({
        PieceWeight: Joi.number().allow(null, ''),
        PieceDescription: Joi.string().allow(null, ''),
    });
    let scheme= Joi.object({
        SenderName:Joi.string().required(),
        pickUpDistrictID:Joi.string().required(),
        SenderMobileNumber:Joi.string().required(),
        pickUpAddress1:Joi.string().required(),
        pickUpAddress2:Joi.string().required(),
        weight:Joi.number().required(), 
        BoxLength:Joi.number().required(),
        BoxWidth: Joi.number().required(),
        BoxHeight: Joi.number().required(),
        description:Joi.string().required(), 
        ContentPrice:Joi.number().required(),
        ContentDescription:Joi.string().required(),
        reciverName:Joi.string().required(),
        deliveryDistrictID:Joi.string().required(),
        deliveryAddress1:Joi.string().required(),
        deliveryAddress2:Joi.string().required(),
        reciverMobile:Joi.string().required(),
        cod:Joi.required(),
        Pieces: Joi.array().items(pieceSchema),
        shipmentValue:Joi.number().allow(null, ''),
        markterCode:Joi.string().allow(null, ''),
        clintid:Joi.string().allow(null, ''),
        // daftraid:Joi.string().allow(null, ''),
        pickUpDistrict:Joi.string().required(),
        deliveryDistrict:Joi.string().required(),
        pickUpGovernorate:Joi.string().required(),
        deliveryGovernorate:Joi.string().required(),
        
    });
    return scheme.validate(orderData, {abortEarly:false});
  }
  
  function addPiece() {
    setPieces(prevPieces => [
      ...prevPieces,
      {
        PieceWeight: '',
        PieceDescription: ''
      }
    ]);
  }

  function updatePiece(index, field, value) {
    const updatedPieces = [...pieces];
    updatedPieces[index][field] = value;
    setPieces(updatedPieces);
  }

  
  useEffect(()=>{
    getCities()
    getCompaniesDetailsOrders()
    getClientsList()
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
  const [cities,setCities]=useState()
  async function getCities() {
    console.log(localStorage.getItem('userToken'))
    try {
      const response = await axios.get('https://dashboard.go-tex.net/api/spl/get-cities',
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('userToken')}`,
        },
      });
      setCities(response.data.data.Cities)
      console.log(response.data.data.Cities)
      console.log(response)
    } catch (error) {
      console.error(error);
    }
  }

  const [search, setSearch]= useState('')
  const [search2, setSearch2]= useState('')

  const [showCitiesList, setCitiesList] = useState(false);
  const openCitiesList = () => {
    setCitiesList(true);
  };

  const closeCitiesList = () => {
    setCitiesList(false);
  };
  const [showCitiesList2, setCitiesList2] = useState(false);
  const openCitiesList2 = () => {
    setCitiesList2(true);
  };

  const closeCitiesList2 = () => {
    setCitiesList2(false);
  };

  const [searchClients, setSearchClients]= useState('')

  const [showClientsList, setClientsList] = useState(false);
  const openClientsList = () => {
    setClientsList(true);
  };

  const closeClientsList = () => {
    setClientsList(false);
  };
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

  async function getInvoice(daftraId) {
    try {
      const response = await axios.get(`https://dashboard.go-tex.net/api/daftra/get-invoice/${daftraId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('userToken')}`,
        },
      });
           console.log(response)
      const stickerUrl = `${response.data.data}`;
      const newTab = window.open();
      newTab.location.href = stickerUrl;
    } catch (error) {
      console.error(error);
    }
  }

  const [showsticker,setshowsticker]=useState(false)
  
  const handleShowStickerClick = (item) => {
    const stickerData = encodeURIComponent(JSON.stringify(item));
    window.open(`/splStickerPreview?stickerData=${stickerData}`, '_blank');
  };
  
    const [companiesDetails,setCompaniesDetails]=useState([])
  async function getCompaniesDetailsOrders() {
    try {
      const response = await axios.get('https://dashboard.go-tex.net/api/companies/get-all');
      const companies = response.data.data;
      console.log(companies)
      setCompaniesDetails(companies)
      const filteredCompanies = companies.find(company => company.name === 'spl');

    if (filteredCompanies) {
      const KgPrice = filteredCompanies.kgprice;
      const MarketerPrice = filteredCompanies.marketerprice;
      setCompanyKgPrice(KgPrice);
      setCompanyMarketerPrice(MarketerPrice);
    } else {
      console.error('Company with name not found.');
    }
    } catch (error) {
      console.error(error);
    }
  }


const citiesListRef = useRef(null);

useEffect(() => {
  const handleOutsideClick = (e) => {
    if (
      citiesListRef.current &&
      !citiesListRef.current.contains(e.target) &&
      e.target.getAttribute('name') !== 'pickUpDistrictID'
    ) {
      closeCitiesList();
    }
  };

  if (showCitiesList) {
    window.addEventListener('click', handleOutsideClick);
  }

  return () => {
    window.removeEventListener('click', handleOutsideClick);
  };
}, [showCitiesList]);

const citiesListRef2 = useRef(null);
useEffect(() => {
  const handleOutsideClick = (e) => {
    if (
      citiesListRef2.current &&
      !citiesListRef2.current.contains(e.target) &&
      e.target.getAttribute('name') !== 'deliveryDistrictID'
    ) {
      closeCitiesList2();
    }
  };

  if (showCitiesList2) {
    window.addEventListener('click', handleOutsideClick);
  }     
  return () => {
    window.removeEventListener('click', handleOutsideClick);
  };
}, [showCitiesList2]);

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

  function addingPiece(){
    setPieces([
      {
        PieceWeight: '',
        PieceDescription: '',
      },
    ])
  }

  const[addMarketer,setMarketer]=useState(false);
  const [Branches,setBranches]=useState('')
  const [isBranches,setIsBranches]=useState(false)
  
  useEffect(() => {
    getOrderData({
      target: { name: 'pickUpDistrictID', value: itemCity },
    });
  }, [itemCity]); 
  
  useEffect(() => {
    getOrderData({
      target: { name: 'pickUpAddress1', value: itemAddress },
    });
  }, [itemAddress]);

  useEffect(()=>{
    getPackageDetails()
  },[])
  const [packegeDetails,setPackegeDetails]=useState([])
async function getPackageDetails() {
    try {
      const response = await axios.get(`https://dashboard.go-tex.net/api/package/user-get-package`,
       
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('userToken')}`,
        },
      });
      if (response.status === 200) {
        console.log(response)
        setPackegeDetails(response.data.data)
      } else {
        console.log(response)
      }
    } catch (error) {
      console.log(error);
      // window.alert('somthing wrong');
    }
  }

  const [isChecked, setIsChecked] = useState(false);
        const handleCheckBoxChange = (event) => {
          const isChecked = event.target.checked;
          setIsChecked(isChecked);
          
          if (isChecked) {
            setPhone3('')
          } else {
            const value = phoneValue
            getOrderData({ target: { name: 'SenderMobileNumber', value } });
          }
        };
  return (
    <div className='px-4 pt-2 pb-4' id='content'>
      <div className=" px-3 pt-4 pb-2 mb-2" dir='ltr'>
      <span class="wallet-box">الرصيد الحالى
                (<span className='txt-blue'> {userBalance}</span> ر.س)
                </span>
      </div>
       { userData.userData.data.user.rolle === "user" && packegeDetails.companies && packegeDetails.companies.length !== 0?(
            <div className="prices-box">
             <h4 className="text-center p-text">الباقة الخاصة بك      </h4>
             {packegeDetails.userAvailableOrders === 0 ?
             <p className="text-danger">
                لقد انتهت الباقة الخاصة بك..قم بشراء باقة أخرى او سيتم استخدام الرصيد بالمحفظة
             </p>
              : <div className="row">
          
              <div className="col-md-6 py-1">
                <label htmlFor="">شركات الشحن  : </label>
                {packegeDetails.companies ? (
              <span>
                {packegeDetails.companies.map((company) => (
                  <span >{company === "anwan" ? "gotex , " :company === "all" ? " جميع الشركات " : company + " , "} </span>
                  ))}
              </span>
            ) : (
              <span>_</span>
            )}
              </div>
              <div className="col-md-6 py-1">
                <label htmlFor="">الشحنات المتبقة  : </label>
                <span>{packegeDetails.userAvailableOrders}</span>
              </div>
              
              </div>
              }
              
          </div>
          ): null}
      { userData.userData.data.user.rolle === "user" && packegeDetails.companies && packegeDetails.companies.length === 0?(
            <div className='text-center package-poster mb-3 mx-2 '>
            <div className='p-4'>
            <p>قم بشراء باقة الأن..
              <Link to="/packeges">اضغط هنا  </Link>
            </p>
            </div>
            
          </div>
          ): null}
    { userData.userData.data.user.rolle === "marketer"?(
         <div className="search-box p-4 mt-2 mb-4 row g-1">
         <div className="col-md-2">
         <button className="btn"><i class="fa-solid fa-magnifying-glass"></i> اختيار عميل</button>
         </div>
         <div className="col-md-10">
         <input type="search" className="form-control ic" name='client' placeholder='الاسم'
                 onChange={(e)=>{ 
                   const searchValue = e.target.value;
                   setSearchClients(searchValue);
                   // getOrderData(e)
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
                        setBranches(item.branches)
                         const selectedCity = e.target.innerText;
 
                         setItemName(item.name);
                         setItemMobile(item.mobile);
                        //  setItemCity(item.city);
                         setItemAddress(item.address);
                         setItemName0(item.name);
                           setItemMobile0(item.mobile);
                           setItemAddress0(item.address);
                        //  setItemId(item.daftraClientId);
                         setItemClientId(item._id);
                         setPhoneValue(item.mobile)
                         setPackageCompanies(item.package.companies)
                         setPackageOrders(item.package.availableOrders)
                         setIsClient(true)
                         setIsWallet(true)
                         setClientWallet(item.wallet)
                            {item.credit && item.credit.status== 'accepted'? (
                             <>
                               {setClientCredit(item.credit.limet)}
                               {setClientCreditStatus(item.credit.status)}
                             </>
                           ):(
                              <>
                              {setClientCredit(0)}
                              </>
                           )}
                      //   setItemName(item.Client.first_name && item.Client.last_name ? `${item.Client.first_name} ${item.Client.last_name}` : '');
                      //  setItemMobile(item.Client.phone1);
                      //  setItemCity(item.Client.city);
                      //  setItemAddress(item.Client.address1);
                      // //  setItemEmail(item.Client.email);
                      //  setItemId(Number(item.Client.id));
                      //  setPhoneValue(item.Client.phone1)
                        
                         document.querySelector('input[name="SenderName"]').value = item.name;
                         document.querySelector('input[name="SenderMobileNumber"]').value = phoneValue;
                        //  document.querySelector('input[name="pickUpDistrictID"]').value = item.city;
                         document.querySelector('input[name="pickUpAddress1"]').value = item.address;
                        
                         document.querySelector('input[name="SenderName"]').readOnly = true;
                         document.querySelector('input[name="SenderMobileNumber"]').readOnly = true;
                         document.querySelector('input[name="pickUpAddress1"]').readOnly = true;
                       
                         // document.querySelector('input[name="SenderName"]').value = item.Client.first_name && item.Client.last_name ? `${item.Client.first_name} ${item.Client.last_name}` : '';

                        // document.querySelector('input[name="SenderMobileNumber"]').value = value;
                        // document.querySelector('input[name="pickUpDistrictID"]').value = item.Client.city;
                        // document.querySelector('input[name="pickUpAddress1"]').value = item.Client.address1;
    
                         
                         document.querySelector('input[name="client"]').value = selectedCity;
                         // getOrderData(e)
                         closeClientsList();
                     }}
                       >
                         {item.name} , {item.company} , {item.mobile} , {item.city} , {item.address}
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
         ): null}
         { userData.userData.data.user.rolle === "marketer" &&  isWallet  ?(
                    <div className="gray-box p-2 mb-3">
                      <div className="row">
                        <div className="col-md-6">
                          <label htmlFor="">محفظة العميل : </label>
                          <span className='fw-bold text-primary px-1'>{clientWallet}</span>
                        </div>
                        <div className="col-md-6">
                          <label htmlFor="">credit_العميل : </label>
                          {clientCreditStatus && clientCreditStatus == 'accepted'?
                          <span className='fw-bold text-primary px-1'>{clientCredit}</span>:
                          <span className='fw-bold text-primary px-1'>0</span>}
                        </div>
                      </div>
                    </div>
                    ):
                    null}
     { userData.userData.data.user.rolle === "marketer" && packageCompanies && packageCompanies.length !== 0?(
            <div className="gray-box p-1 mb-3">
             <label className="pe-2">الباقة الخاصة بهذا العميل   :   </label>
             {packageOrders === 0 ?
             <p className="text-danger">
                لقد انتهت الباقة الخاصة به..قم بشراء باقة أخرى او سيتم استخدام الرصيد بالمحفظة
             </p>
              : <div className="row">
          
              <div className="col-md-6 py-1">
                <label htmlFor="">شركات الشحن  : </label>
                {packageCompanies ? (
              <span className='fw-bold text-primary'>
                {packageCompanies.map((company) => (
                  <span >{company === "anwan" ? "gotex , " :company === "all" ? " جميع الشركات " : company + " , "} </span>
                  ))}
              </span>
            ) : (
              <span>_</span>
            )}
              </div>
              <div className="col-md-6 py-1">
                <label htmlFor="">الشحنات المتبقة  : </label>
                <span className='text-danger fw-bold px-2'>{packageOrders}</span>
              </div>
              
              </div>}
          </div>
          ): null}
          { userData.userData.data.user.rolle === "marketer" && packageCompanies && packageCompanies.length === 0?(
           <div className="gray-box text-center p-1 mb-2">
           <p className="cancelpackage text-danger fw-bold">                  
           هذا العميل ليس لديه باقة حاليا..</p>
           </div>
          ): null}
      <div className="shipmenForm">
      { userData.userData.data.user.rolle === "marketer"?(
        <>
          <div className="prices-box text-center">
          {companiesDetails.map((item, index) => (
              item === null?(<div></div>):
              item.name === "spl" ? (<p>قيمة الشحن من <span>{item.mincodmarkteer} ر.س</span> الى <span>{item.maxcodmarkteer} ر.س</span></p>):
              null))}
        </div>
        <div className="text-center">
          <button className="btn btn-secondary mb-3 text-white"
          onClick={(e)=>{ 
            // setClients("")
            setBranches('')
            setItemName("");
            setItemMobile("");
            setItemAddress("");
            setPhoneValue("")
            setItemName2(itemName0);
            setItemMobile2(itemMobile0);
            setItemAddress2(itemAddress0);
            setItemId("");
            setItemClientId("");
            setPhone2(itemMobile0)
            setPackageCompanies('')
            setPackageOrders('')
            setIsClient(false)
         setIsWallet(false)
         setClientWallet("")
         setClientCredit("")
          //   {item.credit && item.credit.status== 'accepted'? (
          //    <>
          //      {setClientCredit(item.credit.limet)}
          //      {setClientCreditStatus(item.credit.status)}
          //    </>
          //  ):(
          //     <>
          //     {setClientCredit(0)}
          //     </>
          //  )}

          document.querySelector('input[name="reciverName"]').value = itemName0;
            document.querySelector('input[name="reciverMobile"]').value = itemMobile0;
            document.querySelector('input[name="deliveryAddress1"]').value =itemAddress0;
           
            document.querySelector('input[name="SenderName"]').value = '';
            document.querySelector('input[name="SenderMobileNumber"]').value = '';
           //  document.querySelector('input[name="p_city"]').value = item.city;
            document.querySelector('input[name="pickUpAddress1"]').value = '';

            document.querySelector('input[name="SenderName"]').readOnly = false;
            document.querySelector('input[name="SenderMobileNumber"]').readOnly = false;
            document.querySelector('input[name="pickUpAddress1"]').readOnly = false;
           
        }}
          >تبديل العميل لمستلم</button>
          </div>
        </>
        ): null}
      <form onSubmit={submitOrderUserForm} className='' action="">
          <div className="row">
          <div className="col-md-6">
          <div className="shipper-details brdr-grey p-3">
              <h3>تفاصيل المرسل</h3>
              
              <div className='pb-3'>
              <label htmlFor=""> الاسم<span className="star-requered">*</span></label>
              <input type="text" className="form-control" name='SenderName'  onChange={(e) => {
  setItemName(e.target.value);
  getOrderData(e);
}}/>
              {errorList.map((err,index)=>{
    if(err.context.label ==='SenderName'){
      return <div key={index} className="alert alert-danger my-2">يجب ملىء هذه الخانة </div>
    }
    
  })}
          </div>
          { userData.userData.data.user.rolle === "marketer"?(
            <>
          <div className={`pb-3 main-box ${isChecked ? 'opacity-50' : ''}`}>
              <label htmlFor="">رقم الهاتف<span className="star-requered">*</span></label>
              {/* <input type="text" className="form-control" /> */}
              <PhoneInput name='SenderMobileNumber' 
  labels={ar} defaultCountry='SA' dir='ltr' className='phoneInput' value={phoneValue}
  onChange={(phoneValue) => {
    setItemMobile(phoneValue);
    setPhoneValue(phoneValue);
    getOrderData({ target: { name: 'SenderMobileNumber', value: phoneValue } });
  }}/>
  {errorList.map((err,index)=>{
    if(err.context.label ==='SenderMobileNumber'){
      return <div key={index} className="alert alert-danger my-2">يجب ملئ جميع البيانات </div>
    }
    
  })}
    
          </div>
          <div className="pb-3">
            <input type="checkbox" name="" id="checkBoxPhone" checked={isChecked}
          onChange={handleCheckBoxChange} />
            <label htmlFor="" className='txt-blue'>إضافة رقم هاتف آخر </label>
            <div className={`phone-checkBox ${isChecked ? '' : 'd-none'}`}>
            
    <PhoneInput name='SenderMobileNumber' 
    labels={ar} defaultCountry='SA' dir='ltr' className='phoneInput' value={phone3}
    onChange={(phone3) => {
      setPhone3(phone3);
      getOrderData({ target: { name: 'SenderMobileNumber', value: phone3} });
    }}/>
    {errorList.map((err,index)=>{
      if(err.context.label ==='SenderMobileNumber'){
        return <div key={index} className="alert alert-danger my-2">يجب ملئ جميع البيانات </div>
      }
    })}
            </div>
            </div>
          </>):(
            <div className='pb-3'>
              <label htmlFor="">رقم الهاتف<span className="star-requered">*</span></label>
              {/* <input className="form-control" name='SenderMobileNumber' placeholder='Ex: 0565011313' onChange={getOrderData}/> */}
              <PhoneInput name='SenderMobileNumber' 
  labels={ar}
   defaultCountry='SA' 
   dir='ltr' className='phoneInput' value={phoneValue}
  onChange={(phoneValue) => {
    setItemMobile(phoneValue);
    setPhoneValue(phoneValue);
    getOrderData({ target: { name: 'SenderMobileNumber', value: phoneValue } });
  }}/>
  {errorList.map((err,index)=>{
    if(err.context.label ==='SenderMobileNumber'){
      return <div key={index} className="alert alert-danger my-2">يجب ملئ جميع البيانات </div>
    }
    
  })}
    
          </div>
          )}
          <div className='pb-3 ul-box'>
          <label htmlFor="">  الموقع(الفرع الرئيسى)<span className="star-requered">*</span></label>
              {/* <input type="text" className="form-control" name='pickUpDistrictID' onChange={getOrderData}/> */}
              <input type="text" className="form-control" name='pickUpDistrictID'
              onChange={(e)=>{ 
                // setItemCity(e.target.value);
                const searchValue = e.target.value;
                setSearch(searchValue);
                getOrderData(e)
                const matchingCities = cities.filter((item) => {
                  return searchValue === '' ? item : item.Name.toLowerCase().includes(searchValue.toLowerCase());
                });
            
                if (matchingCities.length === 0) {
                  closeCitiesList();
                } else {
                  openCitiesList();
                }
                }}
                onClick={openCitiesList}
                />
                {showCitiesList && (
                  <ul  className='ul-cities'ref={citiesListRef}>
                  {cities && cities.filter((item)=>{
                  return search === ''? item : item.Name.toLowerCase().includes(search.toLowerCase());
                  }).map((item,index) =>{
                   return(
                    <li key={index} name='pickUpDistrictID' 
                    onClick={(e)=>{ 
                      // const selectedCity = e.target.innerText;
                      const selectedCity = item.Id;
                      const cityName=item.Name;
                      const governorate =item.GovernorateName;
                      setItemCity(selectedCity)
                      setSenderCityName(cityName)
                      setSenderGovernoretName(governorate)
                      getOrderData({ target: { name: 'pickUpDistrictID', value: selectedCity } });
                      // getOrderData({ target: { name: 'pickUpGovernorate', value: governorate } });
                      // getOrderData({ target: { name: 'pickUpDistrict', value: cityName } });
                      
                      document.querySelector('input[name="pickUpDistrictID"]').value = item.Name;
                      closeCitiesList();
                  }}
                    >
                      {item.Name}
                   </li>
                   )
                  }
                  )}
                  </ul>
                )}
               
             
              {errorList.map((err,index)=>{
    if(err.context.label ==='pickUpDistrictID'){
      return <div key={index} className="alert alert-danger my-2">يجب ملىء هذه الخانة </div>
    }
    
  })}
          </div>
          <div className='pb-3'>
              <label htmlFor=""> العنوان <span className="star-requered">*</span></label>
              <input type="text" className="form-control" name='pickUpAddress1' onChange={(e) => {
  setItemAddress(e.target.value);
  getOrderData(e);
}}/>
              {errorList.map((err,index)=>{
    if(err.context.label ==='pickUpAddress1'){
      return <div key={index} className="alert alert-danger my-2">يجب ملىء هذه الخانة </div>
    }
    
  })}
          </div>
          <div className='pb-3'>
                <label htmlFor=""> عنوان اضافى <span className="star-requered">*</span></label>
                <input type="text" className="form-control" name='pickUpAddress2' onChange={getOrderData}/>
                {errorList.map((err,index)=>{
      if(err.context.label ==='pickUpAddress2'){
        return <div key={index} className="alert alert-danger my-2">يجب ملىء هذه الخانة </div>
      }
      
    })}
            </div>
            { userData.userData.data.user.rolle === "marketer"?(
            <div className='pb-3'>
              <label onClick={()=>{setIsBranches(true)}}>اختيار فرع اخر  <i class="fa-solid fa-sort-down"></i></label>
            </div>):null}
              {isBranches && (
                <>
                {Branches?(
                  <>
<select
  name="branch"
  className="form-control mb-1"
  id=""
  onChange={(e) => {
    const selectedBranchIndex = e.target.selectedIndex;
    if (selectedBranchIndex > 0 && Branches.length > 0) {
      const selectedBranch = Branches[selectedBranchIndex - 1];
      setItemAddress(selectedBranch.address);
      setItemCity(selectedBranch.city);
    }
  }}
>
  <option>اختر الفرع</option>
  {Branches &&
    Branches.map((branch, index) => (
      <option key={index}>
        {branch.city}, {branch.address}
      </option>
    ))}
</select>
                  </>
                ):<span>لا يوجد فروع أخرى</span>}
                
                </>
                )
              }
            { userData.userData.data.user.rolle === "marketer"?(
            <div className='pb-3'>
              <button type='button' className="btn btn-red" onClick={()=> {setMarketer(true)}}>
              إذا العميل لم يتم إضافته من قبل,اضغط هنا لإضافة كود المسوق
              </button>
              {addMarketer && (<div>
                <label htmlFor=""> كود المسوق 
             <span className="star-requered">*</span></label>
              <input type="text" className="form-control" name='markterCode' onChange={getOrderData} />
             
              </div>) }
             
         </div>
            ):null}   
          {/* { userData.userData.data.user.rolle === "marketer"?(
            <div className='pb-3'>
            <label htmlFor=""> id_العميل  </label>
            <input type="text" className="form-control" name='clintid' onChange={getOrderData}/>
            {errorList.map((err,index)=>{
  if(err.context.label ==='clintid'){
    return <div key={index} className="alert alert-danger my-2">يجب ملىء هذه الخانة </div>
  }
  
})}
        </div>
          ):null}            */}
          </div>
          <div className="package-info brdr-grey p-3 my-3 ">
              <h3>بيانات الشحنة</h3>
              <div className="row">
              
              
            {userData.userData.data.user.rolle === "user"?(
            <>
            <div className="pb-3">
            <label htmlFor="" className='d-block'>طريقة الدفع:<span className="star-requered">*</span></label>
                    {/* <div className='pe-2'>
                    <input  type="radio" value={true} name='cod' onChange={getOrderData}/>
                    <label className='label-cod' htmlFor="cod"  >الدفع عند الاستلام(COD)</label>
                    </div> */}
                    <div className='pe-2'>
                    <input type="radio" value={false}  name='cod' onChange={getOrderData}/>
                    <label className='label-cod' htmlFor="cod">الدفع اونلاين </label>
                    </div>
                    {errorList.map((err,index)=>{
      if(err.context.label ==='cod'){
        return <div key={index} className="alert alert-danger my-2">يجب اختيار طريقة الدفع </div>
      }
      
    })}
            </div>
            {orderData.cod === true && (
  <div className='pb-3'>
    <label htmlFor=""> قيمة الشحنة</label>
    <input
    //  type="number" step="0.001"
     className="form-control" name='shipmentValue' onChange={getOrderData} required />
    {errorList.map((err, index) => {
      if (err.context.label === 'shipmentValue') {
        return <div key={index} className="alert alert-danger my-2">يجب ملىء هذه الخانة</div>
      }
    })}
  </div>
            )}
            {orderData.cod === false && (
              <div></div>
            )}
             
            </>
 
          ):userData.userData.data.user.rolle === "marketer"?(
            <>
            <div className="pb-3">
            <label htmlFor="" className='d-block'>طريقة الدفع:<span className="star-requered">*</span></label>
                    {/* <div className='pe-2'>
                    <input  type="radio" value={true} name='cod' onChange={getOrderData}/>
                    <label className='label-cod' htmlFor="cod"  >الدفع عند الاستلام(COD)</label>
                    </div> */}
                    <div className='pe-2'>
                    <input type="radio" value={false}  name='cod' onChange={getOrderData}/>
                    <label className='label-cod' htmlFor="cod">الدفع اونلاين </label>
                    </div>
                    {errorList.map((err,index)=>{
      if(err.context.label ==='cod'){
        return <div key={index} className="alert alert-danger my-2">يجب اختيار طريقة الدفع </div>
      }
      
    })}
            </div>
            {orderData.cod !== false && (
              <>
              <div className='pb-3'>
              <label htmlFor=""> قيمة الشحن (cod)</label>
              <input 
              // type="number" step="0.001" 
              className="form-control" name='cod' 
              onChange={(e)=>{getOrderData({target:{name:'cod',value:Number(e.target.value)}});
            }}               required/>
              {errorList.map((err,index)=>{
    if(err.context.label ==='cod'){
      return <div key={index} className="alert alert-danger my-2">يجب ملىء هذه الخانة </div>
    }
    
  })}
          </div>
  <div className='pb-3'>
  <label htmlFor="">قيمة الشحنة  </label>
      <input 
      // type="number" step="0.001" 
      className="form-control" name='shipmentValue' 
      onChange={getOrderData}
      // onChange={(e)=>{
      //   const shipvalue = e.target.value
      //   getOrderData({ target: { name: 'shipmentValue', value: shipvalue - orderData.cod } })
      // }} 
      required />
    {errorList.map((err, index) => {
      if (err.context.label === 'shipmentValue') {
        return <div key={index} className="alert alert-danger my-2">يجب ملىء هذه الخانة</div>
      }
    })}
  </div>
  </>
            )}
            
             
            </>
                    ):
                 <h4></h4>}
                 

<div className='d-flex align-items-center pb-1'>
                <div className="checkbox" onClick={()=>{alert('سوف يكون متاح قريباً ')}}></div>
                <label className='label-cod' htmlFor="">طلب المندوب</label>
                </div>
                <div className="row">
              <div className='pb-1'>
              <label htmlFor=""> السعر<span className="star-requered">*</span></label>
              <input 
              // type="number" step="0.001" 
              className="form-control" name='ContentPrice' 
              onChange={(e)=>{getOrderData({target:{name:'ContentPrice',value:Number(e.target.value)}})}}/>
              {errorList.map((err,index)=>{
    if(err.context.label ==='ContentPrice'){
      return <div key={index} className="alert alert-danger my-2">يجب ملىء هذه الخانة </div>
    }
    
  })}
          </div>
          <div className='pb-1'>
                <label htmlFor=""> الوصف <span className="star-requered">*</span></label>
                <textarea className="form-control" name='description' placeholder=" " onChange={getOrderData} cols="30" rows="2"></textarea>
                {errorList.map((err,index)=>{
      if(err.context.label ==='description'){
        return <div key={index} className="alert alert-danger my-2">يجب ملىء هذه الخانة </div>
      }
      
    })}
            </div>
               <h6 className='text-blue text-center pt-2'>{'<<'}  القطعة الرئيسية   {'>>'}</h6>
              <div className='pb-1 col-md-6'>
              {/* <label htmlFor=""> الوزن<span className="star-requered">*</span></label> */}
              <input 
              // type="number" step="0.001" 
              className="form-control" name='weight' placeholder="وزن القطعة " 
              onChange={(e)=>{getOrderData({target:{name:'weight',value:Number(e.target.value)}})}}/>
              {errorList.map((err,index)=>{
    if(err.context.label ==='weight'){
      return <div key={index} className="alert alert-danger my-2">يجب ملىء هذه الخانة </div>
    }
    
  })}
          </div>
              <div className='pb-1 col-md-6'>
              {/* <label htmlFor=""> ارتفاع الصندوق<span className="star-requered">*</span></label> */}
              <input 
              // type="number" step="0.001" 
              className="form-control" name='BoxLength' placeholder=" ارتفاع الصندوق " 
              onChange={(e)=>{getOrderData({target:{name:'BoxLength',value:Number(e.target.value)}})}}/>
              {errorList.map((err,index)=>{
    if(err.context.label ==='BoxLength'){
      return <div key={index} className="alert alert-danger my-2">يجب ملىء هذه الخانة </div>
    }
    
  })}
          </div>
              
              <div className='pb-1 col-md-6'>
              {/* <label htmlFor=""> عرض الصندوق<span className="star-requered">*</span></label> */}
              <input 
              // type="number" step="0.001" 
              className="form-control" name='BoxWidth' placeholder=" عرض الصندوق " 
              onChange={(e)=>{getOrderData({target:{name:'BoxWidth',value:Number(e.target.value)}})}}/>
              {errorList.map((err,index)=>{
    if(err.context.label ==='BoxWidth'){
      return <div key={index} className="alert alert-danger my-2">يجب ملىء هذه الخانة </div>
    }
    
  })}
          </div>
              <div className='pb-1 col-md-6'>
              {/* <label htmlFor=""> امتداد الصندوق<span className="star-requered">*</span></label> */}
              <input 
              // type="number" step="0.001" 
              className="form-control" name='BoxHeight' placeholder=" امتداد الصندوق " 
              onChange={(e)=>{getOrderData({target:{name:'BoxHeight',value:Number(e.target.value)}})}}/>
              {errorList.map((err,index)=>{
    if(err.context.label ==='BoxHeight'){
      return <div key={index} className="alert alert-danger my-2">يجب ملىء هذه الخانة </div>
    }
    
  })}
          </div>
              </div>
              <div className='pb-1'>
                {/* <label htmlFor=""> وصف القطعة <span className="star-requered">*</span></label> */}
                <textarea className="form-control" name='ContentDescription' placeholder="وصف القطعة" onChange={getOrderData} cols="30" rows="1"></textarea>
                {errorList.map((err,index)=>{
      if(err.context.label ==='ContentDescription'){
        return <div key={index} className="alert alert-danger my-2">يجب ملىء هذه الخانة </div>
      }
      
    })}
            </div>
           
            <div className="text-center">
              <button type='button' className="m-2 btn-gray" onClick={addingPiece}>  إضافة قطع اخرى </button>
            </div>
            {/* <h6 className='text-blue text-center pt-2'>{'<<'}  إضافة قطع اخرى    {'>>'}</h6> */}
                 
      {pieces.map((piece, index) => (
      <div className='my-1' key={index}>
        <input
          // type="number"
          name="PieceWeight"
          placeholder="وزن القطعة "
          value={piece.PieceWeight}
          onChange={e => updatePiece(index, 'PieceWeight', Number(e.target.value))}
        /> <br/>
        <input
          type="text"
          name="PieceDescription"
          placeholder="وصف القطعة"
          value={piece.PieceDescription}
          onChange={e => updatePiece(index, 'PieceDescription', e.target.value)}
        />
         <button className=' btn-addPiece' type="button" onClick={addPiece}>
         إضافة اخرى
      </button>
      </div>
      
    ))}
           
            {/* <div className="pb-3">
            <label htmlFor="" className='d-block'>طريقة الدفع:</label>
                    <div className='pe-2'>
                    <input  type="radio" value={true} name='cod' onChange={getOrderData}/>
                    <label className='label-cod' htmlFor="cod"  >الدفع عند الاستلام(COD)</label>
                    </div>
                    <div className='pe-2'>
                    <input type="radio" value={false}  name='cod' onChange={getOrderData}/>
                    <label className='label-cod' htmlFor="cod">الدفع اونلاين </label>
                    </div>
                    {errorList.map((err,index)=>{
      if(err.context.label ==='cod'){
        return <div key={index} className="alert alert-danger my-2">يجب اختيار طريقة الدفع </div>
      }
      
    })}
            </div> */}
              
              
              </div>
          </div>
          </div>
          <div className="col-md-6">
          <div className="reciever-details brdr-grey p-3">
              <h3>تفاصيل المستلم</h3>
              
      <div className='pb-3'>
              <label htmlFor=""> الاسم<span className="star-requered">*</span></label>
              <input type="text" className="form-control" name='reciverName' onChange={(e)=>{
                  setItemName2(e.target.value)
                  getOrderData(e)
                }}/>
              {errorList.map((err,index)=>{
    if(err.context.label ==='reciverName'){
      return <div key={index} className="alert alert-danger my-2">يجب ملىء هذه الخانة </div>
    }
    
  })}
          </div>
          <div className='pb-3'>
              <label htmlFor=""> رقم الهاتف<span className="star-requered">*</span></label>
              {/* <input name='reciverMobile'  className='form-control' placeholder='Ex: 0565011313'
              onChange={getOrderData}/> */}
              <PhoneInput name='reciverMobile' 
  labels={ar} defaultCountry='SA' dir='ltr' className='phoneInput' value={phone2}
  onChange={(phone2) => {
    setItemMobile2(phone2)
    setPhone2(phone2);
    getOrderData({ target: { name: 'reciverMobile', value: phone2 } });
  }}/>
  {errorList.map((err,index)=>{
    if(err.context.label ==='reciverMobile'){
      return <div key={index} className="alert alert-danger my-2"> يجب ملئ جميع البيانات</div>
    }
    
  })}
    
          </div>
          <div className='pb-3 ul-box'>
              <label htmlFor=""> الموقع<span className="star-requered">*</span></label>
              {/* <input type="text" className="form-control" name='deliveryDistrictID' onChange={getOrderData}/> */}

              <input type="text" className="form-control" name='deliveryDistrictID'
              onChange={(e)=>{ 
                const searchValue = e.target.value;
                setSearch2(searchValue);
                getOrderData(e)
                const matchingCities = cities.filter((item) => {
                  return searchValue === '' ? item : item.Name.toLowerCase().includes(searchValue.toLowerCase());
                });
            
                if (matchingCities.length === 0) {
                  closeCitiesList2();
                } else {
                  openCitiesList2();
                }
                }}
                onClick={openCitiesList2}
                />
                {showCitiesList2 && (
                  <ul  className='ul-cities' ref={citiesListRef2}>
                  {cities && cities.filter((item)=>{
                  return search2 === ''? item : item.Name.toLowerCase().includes(search2.toLowerCase());
                  }).map((item,index) =>{
                   return(
                    <li key={index} name='deliveryDistrictID'  
                    onClick={(e)=>{ 
                      // const selectedCity = e.target.innerText;
                      const cityName=item.Name;
                      const governorate =item.GovernorateName;
                      const selectedCity =item.Id
                      setRecieverCityName(cityName)
                      setRecieverGovernoretName(governorate)
                      setRecieverCityId(selectedCity)
                      getOrderData({ target: { name: 'deliveryDistrictID', value: selectedCity } });
                      // getOrderData({ target: { name: 'deliveryDistrict', value: cityName } });
                      // getOrderData({ target: { name: 'deliveryGovernorate', value: governorate } });
                      document.querySelector('input[name="deliveryDistrictID"]').value = item.Name;
                      closeCitiesList2();
                  }}
                    >
                      {item.Name}
                   </li>
                   )
                  }
                  )}
                  </ul>
                )}
              
              {errorList.map((err,index)=>{
    if(err.context.label ==='deliveryDistrictID'){
      return <div key={index} className="alert alert-danger my-2">يجب ملىء هذه الخانة </div>
    }
    
  })}
          </div>
          
          <div className='pb-3'>
              <label htmlFor=""> العنوان<span className="star-requered">*</span></label>
              <input type="text" className="form-control" name='deliveryAddress1' onChange={(e)=>{
                  setItemAddress2(e.target.value)
                  getOrderData(e)
                }}/>
              {errorList.map((err,index)=>{
    if(err.context.label ==='deliveryAddress1'){
      return <div key={index} className="alert alert-danger my-2">يجب ملىء هذه الخانة </div>
    }
    
  })}
          </div>
          <div className='pb-3'>
                <label htmlFor=""> عنوان اضافى <span className="star-requered">*</span></label>
                <input type="text" className="form-control" name='deliveryAddress2' onChange={getOrderData}/>
                {errorList.map((err,index)=>{
      if(err.context.label ==='deliveryAddress2'){
        return <div key={index} className="alert alert-danger my-2">يجب ملىء هذه الخانة </div>
      }
      
    })}
            </div>
          {/* <h6 className='text-center py-2'>{'<<'}  معلومات اضافية  {'>>'}</h6> */}
          <button type='submit' className="btn btn-orange" disabled={isLoading}>
            {isLoading == true?<i class="fa-solid fa-spinner fa-spin"></i>:'إضافة شحنة'}

               </button>
          {/* <button type="submit" className="btn btn-orange"> <i className='fa-solid fa-plus'></i> إضافة مستلم</button> */}
          </div>
          </div>
          </div>
      </form>
      
      </div>
      <div className="clients-table p-4 mt-4">
        <table className="table">
          <thead>
            <tr>
             <th scope="col">#</th>
             <th scope="col"> الشركة</th>
             {/* <th scope="col">رقم التتبع</th>
             <th scope="col">طريقة الدفع</th>
             <th scope="col">السعر </th> */}
            <th scope="col">id_الشحنة</th>
              <th scope="col">message</th>
              <th scope="col">id_الفاتورة</th>                
              <th scope="col"></th>
              <th scope="col"></th>
              
            </tr>
          </thead>
          <tbody>
{Array.isArray(shipments) && shipments.map((item, index) => {
  return (
    <tr key={index}>
      <td>{index + 1}</td>
      <td>Spl</td>
      {/* <td>{item.data.waybill}</td>
      <td>{item.paytype}</td>
      <td>{item.price}</td> */}
      <td>{item.data.Items[0].Barcode}</td>
      <td>{item.data.Message}</td>
      {item.inovicedaftra?.id?(<td>{item.inovicedaftra.id}</td>):(<td>_</td>)}

      <td>
      <button
  onClick={() => handleShowStickerClick(item)}
  className="btn btn-success"
>
  عرض الاستيكر
</button>

              {/* <button
              onClick={()=> setshowsticker(true)}
    
    className="btn btn-success"
    to="/splSticker"
  >
    عرض الاستيكر
  </button> */}
              </td>
              {/* {item.inovicedaftra?.id?(<td><button
      
      className="btn btn-orange"
      onClick={() => getInvoice(item.inovicedaftra.id)}
    >
      عرض الفاتورة
    </button></td>):(<td>_</td>)} */}
             
    </tr>
  );
})}
</tbody>


       </table>
      </div>
      
  </div>  )
}