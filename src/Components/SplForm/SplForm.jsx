
import React, { useEffect, useState } from 'react'
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css'
import ar from 'react-phone-number-input/locale/ar'
import axios from 'axios';
import Joi from 'joi';
import { Link } from 'react-router-dom';
import SplSticker from '../SplSticker/SplSticker';

export default function SplForm(userData) {
    const [value ,setPhoneValue]=useState()
    const [phone2,setPhone2] =useState()
    const [errorList, seterrorList]= useState([]); 

  const [itemName, setItemName] = useState('');
  const [itemMobile, setItemMobile] = useState('');
  const [itemCity, setItemCity] = useState('');
  const [itemAddress, setItemAddress] = useState('');
  const [itemId, setItemId] = useState('');
//   const [thePieces, setPieces] = useState([]);

//   const [pieceData, setPieceData] = useState({
//       PieceWeight: '',
//       PieceDescription: ''
//   });
const [pieces, setPieces] = useState([]);
  const [pieceWeight, setPieceWeight] = useState('');
  const [pieceDescription, setPieceDescription] = useState('');

//   const handleAddPiece = () => {
//     const newPiece = {
//       PieceWeight: pieceWeight,
//       PieceDescription: pieceDescription,
//     };
//     console.log(pieces)
//     setPieces([...pieces, newPiece]);
//     setPieceWeight('');
//     setPieceDescription('');
//   };

// Inside the handleAddPiece function
const handleAddPiece = () => {
    const newPiece = {
      PieceWeight: pieceWeight,
      PieceDescription: pieceDescription,
    };
  
    setPieces([...pieces, newPiece]);
    setPieceWeight('');
    setPieceDescription('');
  };
  
  const [orderData,setOrderData] =useState({
    reciverName: "",
    reciverMobile: "",
    SenderName: "",
    SenderMobileNumber: "",
    cod: "",
    ContentPrice: "",
    ContentDescription: "",
    Weight: "",
    pickUpDistrictID: "",
    pickUpAddress1: "",
    pickUpAddress2: "",
    deliveryDistrictID: "",
    deliveryAddress1: "",
    deliveryAddress2: "",
    Pieces: pieces,    // Pieces:
    // [{ 
    //     PieceWeight: "",
    //     PieceDescription: ""
    // },
    // {
    //     PieceWeight: "",
    //     PieceDescription: ""
    // }
// ]
  })
  const [error , setError]= useState('')
  const [isLoading, setisLoading] =useState(false)
  const [shipments,setShipments]=useState([])
 
  async function sendOrderDataToApi(updatedOrderData) {
    console.log(localStorage.getItem('userToken'));
    try {
        const url = "https://dashboard.go-tex.net/api/spl/crete-new-order"; // Your API endpoint
    
        const payload = {
          ...orderData,
          Pieces: pieces,
        };
    
        const response = await axios.post(url, payload, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('userToken')}`,
            'Content-Type': 'application/json',
          },
        });
  
      if (response.status === 200) {
        console.log("Request successful!");
        console.log(response.data);
  
        const shipment = response.data;
        setShipments(prevShipments => [...prevShipments, shipment]);
      } else if (response.status === 400) {
        console.log("Request failed.");
        const errorMessage = response.data?.msg || "An error occurred.";
        window.alert(`${errorMessage}`);
        console.log(response.data);
      }
    } catch (error) {
      console.error('Error making request:', error);
      const errorMessage = error.response?.data?.msg || "An error occurred.";
      window.alert(`${errorMessage}`);
    }
  }
  


//   async function sendOrderDataToApi() {
//     console.log(localStorage.getItem('userToken'))
//    try {
//     const url = "https://dashboard.go-tex.net/api/spl/crete-new-order"; // Your API endpoint

//     // Update the orderData with the pieces array
//     const updatedOrderData = { ...orderData, Pieces: pieces };

//     const response = await axios.post(url, updatedOrderData, {
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem('userToken')}`,
//         'Content-Type': 'application/json',
//       },
//     });

//     if (response.status === 200) {
//       console.log("Request successful!");
//       console.log(response.data);

//       // Handle the response data as needed
//       const shipment = response.data;
//       setShipments(prevShipments => [...prevShipments, shipment]);
//     } else if (response.status === 400) {
//       console.log("Request failed.");
//       const errorMessage = response.data?.msg || "An error occurred.";
//       window.alert(`${errorMessage}`);
//       console.log(response.data);
//     }
//   } catch (error) {
//     console.error('Error making request:', error);
//     const errorMessage = error.response?.data?.msg || "An error occurred.";
//     window.alert(`${errorMessage}`);
//   }
//     // try {
//     //   const response = await axios.post(
//     //     "https://dashboard.go-tex.net/api/spl/crete-new-order",
//     //     orderData,
//     //     {
//     //       headers: {
//     //         Authorization: `Bearer ${localStorage.getItem('userToken')}`,
//     //       },
//     //     }
//     //   );
  
//     //   if (response.status === 200) {
//     //     setisLoading(false);
//     //     window.alert("تم تسجيل الشحنة بنجاح");
//     //     console.log(response.data);
//     //     const shipment = response.data;
//     //     setShipments(prevShipments => [...prevShipments, shipment]);
//     //     console.log(shipments)      
//     // }else if (response.status === 400) {
//     //     setisLoading(false);
//     //     const errorMessage = response.data?.msg || "An error occurred.";
//     //     window.alert(`${errorMessage}`);
//     //     console.log(response.data);
//     //   }
//     // } catch (error) {
//     //   // Handle error
//     //   console.error(error);
//     //   setisLoading(false);
//     //   const errorMessage = error.response?.data?.msg || "An error occurred.";
//     //   window.alert(`${errorMessage}`);
//     // }
//   }
  
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

// Inside the submitOrderUserForm function
function submitOrderUserForm(e) {
    e.preventDefault();
    setisLoading(true);
    let validation = validateOrderUserForm();
    console.log(validation);
    if (validation.error) {
      setisLoading(false);
      seterrorList(validation.error.details);
    } else {
      sendOrderDataToApi();
    }
  }
  
  
  

function getOrderData(e) {
  let myOrderData;

    if (userData.userData.data.user.rolle === "marketer") {
      myOrderData = { ...orderData, SenderName: itemName,
        pickUpDistrictID: itemCity,
        SenderMobileNumber: itemMobile,
        pickUpAddress1: itemAddress,
        clintid: itemId};
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
        PieceWeight: Joi.number().required(),
        PieceDescription: Joi.string().required(),
    });
    let scheme= Joi.object({
        SenderName:Joi.string().required(),
        pickUpDistrictID:Joi.string().required(),
        SenderMobileNumber:Joi.string().required(),
        pickUpAddress1:Joi.string().required(),
        pickUpAddress2:Joi.string().allow(null, ''),
        Weight:Joi.number().required(),
        ContentPrice:Joi.number().required(),
        ContentDescription:Joi.string().required(),
        reciverName:Joi.string().required(),
        deliveryDistrictID:Joi.string().required(),
        deliveryAddress1:Joi.string().required(),
        deliveryAddress2:Joi.string().allow(null, ''),
        reciverMobile:Joi.string().required(),
        cod:Joi.required(),
        Pieces: Joi.array().items(pieceSchema),
        // PieceWeight:Joi.number().required(),
        // PieceDescription:Joi.string().required(),
        // shipmentValue:Joi.number().allow(null, ''),
        // markterCode:Joi.string().allow(null, ''),
        clintid:Joi.string().allow(null, ''),

    });
    return scheme.validate(orderData, {abortEarly:false});
  }
  
  useEffect(()=>{
    getCities()
    // getCompaniesDetailsOrders()
    getClientsList()
  },[])
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
    } catch (error) {
      console.error(error);
    }
  }
//   const [companiesDetails,setCompaniesDetails]=useState([])
//   async function getCompaniesDetailsOrders() {
//     try {
//       const response = await axios.get('https://dashboard.go-tex.net/api/companies/get-all');
//       const companiesPrices = response.data.data;
//       console.log(companiesPrices)
//       setCompaniesDetails(companiesPrices)
//     } catch (error) {
//       console.error(error);
//     }
//   }
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
      const response = await axios.get('https://dashboard.go-tex.net/api/user/all-markter-clint',
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
//   const handleInputChange = (event, index) => {
//     const { name, value } = event.target;
//     const piecesCopy = [...orderData.Pieces];
//     piecesCopy[index][name] = value;

//     setOrderData({
//         ...orderData,
//         Pieces: piecesCopy
//     });
// };

// const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setPieceData({
//         ...pieceData,
//         [name]: value
//     });
// };

// const handleAddPiece = () => {
//     const newPiece = { PieceWeight: '', PieceDescription: '' };
//     setPieces([...thePieces, newPiece]);
// };

  const [showsticker,setshowsticker]=useState(false)
  
  const handleShowStickerClick = (item) => {
    const stickerData = encodeURIComponent(JSON.stringify(item));
    window.open(`/splStickerPreview?stickerData=${stickerData}`, '_blank');
  };
  
  return (
    <div className='p-4' id='content'>
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
                     <ul  className='ul-cities ul-clients'>
                       <li onClick={(e)=>{ 
                         const selectedCity = e.target.innerText;
                         document.querySelector('input[name="client"]').value = selectedCity;
                         closeClientsList();
                     }}>غير ذلك</li>
                     {clients && clients.filter((item)=>{
                     return searchClients === ''? item : item.name.toLowerCase().includes(searchClients.toLowerCase());
                     }).map((item,index) =>{
                      return(
                       <>
                       <li key={index} name='' 
                       onClick={(e)=>{ 
 
                         const selectedCity = e.target.innerText;
 
                         setItemName(item.name);
                         setItemMobile(item.mobile);
                         setItemCity(item.city);
                         setItemAddress(item.address);
                         setItemId(item._id);
                         setPhoneValue(item.mobile)
                         // document.querySelector('input[name="p_name"]').value = selectedItem.name;
                         // document.querySelector('input[name="p_mobile"]').value = value;
                         // document.querySelector('input[name="p_city"]').value = selectedItem.city;
                         // document.querySelector('input[name="p_streetaddress"]').value = selectedItem.address;
 
                         document.querySelector('input[name="SenderName"]').value = item.name;
                         document.querySelector('input[name="SenderMobileNumber"]').value = value;
                         document.querySelector('input[name="pickUpDistrictID"]').value = item.city;
                         document.querySelector('input[name="pickUpAddress1"]').value = item.address;
     
                         
                         document.querySelector('input[name="client"]').value = selectedCity;
                         // getOrderData(e)
                         closeClientsList();
                     }}
                       >
                         {item.name} , {item.email} , {item.mobile} , {item.city} , {item.address}
                      </li>
                      </>
                      )
                     }
                     )}
                     </ul>
                   )}
                 
                 
         {/* <input className='form-control' name="search" onChange={(e)=> setSearch(e.target.value)} type="search" placeholder='الإيميل' /> */}
         </div>
       </div>
         ): null}
     
      <div className="shipmenForm">
      {/* { userData.userData.data.user.rolle === "marketer"?(
          <div className="prices-box text-center">
          {companiesDetails.map((item, index) => (
              item === null?(<div></div>):
              item.name === "saee" ? (<p>قيمة الشحن من <span>{item.mincodmarkteer} ر.س</span> الى <span>{item.maxcodmarkteer} ر.س</span></p>):
              null))}
        </div>
        ): null} */}
      <form onSubmit={submitOrderUserForm} className='' action="">
          <div className="row">
          <div className="col-md-6">
          <div className="shipper-details brdr-grey p-4">
              <h3>تفاصيل المرسل</h3>
              
              <div className='pb-3'>
              <label htmlFor=""> الاسم</label>
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
          <div className='pb-3'>
              <label htmlFor="">رقم الهاتف</label>
              {/* <input type="text" className="form-control" /> */}
              <PhoneInput name='SenderMobileNumber' 
  labels={ar} defaultCountry='SA' dir='ltr' className='phoneInput' value={value}
  onChange={(value) => {
    // setItemMobile(e.target.value);
    setPhoneValue(value);
    getOrderData({ target: { name: 'SenderMobileNumber', value } });
  }}/>
  {errorList.map((err,index)=>{
    if(err.context.label ==='SenderMobileNumber'){
      return <div key={index} className="alert alert-danger my-2">يجب ملئ جميع البيانات </div>
    }
    
  })}
    
          </div>
          <div className='pb-3 ul-box'>
              <label htmlFor=""> الموقع</label>
              <input type="text" className="form-control" name='pickUpDistrictID' onChange={getOrderData}/>
              {/* <input type="text" className="form-control" name='pickUpDistrictID'
              onChange={(e)=>{ 
                setItemCity(e.target.value);
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
                  <ul  className='ul-cities'>
                  {cities && cities.filter((item)=>{
                  return search === ''? item : item.Name.toLowerCase().includes(search.toLowerCase());
                  }).map((item,index) =>{
                   return(
                    <li key={index} name='pickUpDistrictID' 
                    onClick={(e)=>{ 
                      const selectedCity = e.target.innerText;
                      getOrderData({ target: { name: 'pickUpDistrictID', value: selectedCity } });
                      document.querySelector('input[name="pickUpDistrictID"]').value = selectedCity;
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
                */}
             
              {errorList.map((err,index)=>{
    if(err.context.label ==='pickUpDistrictID'){
      return <div key={index} className="alert alert-danger my-2">يجب ملىء هذه الخانة </div>
    }
    
  })}
          </div>
          <div className='pb-3'>
              <label htmlFor=""> العنوان </label>
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
                <label htmlFor=""> عنوان اضافى</label>
                <input type="text" className="form-control" name='pickUpAddress2' onChange={getOrderData}/>
                {errorList.map((err,index)=>{
      if(err.context.label ==='pickUpAddress2'){
        return <div key={index} className="alert alert-danger my-2">يجب ملىء هذه الخانة </div>
      }
      
    })}
            </div>
          {/* { userData.userData.data.user.rolle === "marketer"?(
            <div className='pb-3'>
            <label htmlFor=""> كود المسوق </label>
            <input type="text" className="form-control" name='markterCode' onChange={getOrderData} required/>
            {errorList.map((err,index)=>{
  if(err.context.label ==='markterCode'){
    return <div key={index} className="alert alert-danger my-2">يجب ملىء هذه الخانة </div>
  }
  
})}
        </div>
          ):null}    */}
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
              <div className="col-md-6">
              <div className='pb-3'>
              <label htmlFor=""> الوزن</label>
              <input type="number" step="0.001" className="form-control" name='Weight' onChange={getOrderData}/>
              {errorList.map((err,index)=>{
    if(err.context.label ==='Weight'){
      return <div key={index} className="alert alert-danger my-2">يجب ملىء هذه الخانة </div>
    }
    
  })}
          </div>
              </div>
              <div className="col-md-6">
              <div className='pb-3'>
              <label htmlFor=""> السعر</label>
              <input type="number" step="0.001" className="form-control" name='ContentPrice' onChange={getOrderData}/>
              {errorList.map((err,index)=>{
    if(err.context.label ==='ContentPrice'){
      return <div key={index} className="alert alert-danger my-2">يجب ملىء هذه الخانة </div>
    }
    
  })}
          </div>
              </div>
              <div className='pb-3'>
                <label htmlFor=""> الوصف </label>
                <textarea className="form-control" name='ContentDescription' onChange={getOrderData} cols="30" rows="3"></textarea>
                {errorList.map((err,index)=>{
      if(err.context.label ==='ContentDescription'){
        return <div key={index} className="alert alert-danger my-2">يجب ملىء هذه الخانة </div>
      }
      
    })}
            </div>
            <div>
                <label htmlFor="">عدد القطع</label>
<input
  type="number"
  placeholder="Piece Weight"
  name="PieceWeight" // Set the name attribute to match the property in orderData.Pieces
  value={pieceWeight} // Use the pieceWeight state
  onChange={(e) => {
    const weightValue= e.target.value
    setPieceWeight(weightValue);
    getOrderData(e)
    // getOrderData({ target: { name: 'PieceWeight', value: weightValue } });
  }}
/>
<label>وصف القطع</label>
<input
  type="text"
  placeholder="Piece Description"
  name="PieceDescription" // Set the name attribute to match the property in orderData.Pieces
  value={pieceDescription} // Use the pieceDescription state
  onChange={(e) => {
    setPieceDescription(e.target.value);
    getOrderData(e); // Call getOrderData to update orderData.Pieces
  }}
/>
        <button type='button' onClick={handleAddPiece}>Add Piece</button>
      </div>
            {/* {thePieces.map((piece, index) => (
                    <div className="col-md-6" key={index}>
                        <div className="pb-3">
                            <label htmlFor=""> عدد القطع</label>
                            <input
                                type="number"
                                className="form-control"
                                name={`PieceWeight_${index}`}
                                value={piece.PieceWeight}
                                onChange={(event) => {
                                    const newValue = event.target.value;
                                    setPieces(prevPieces => {
                                        const updatedPieces = [...prevPieces];
                                        updatedPieces[index] = {
                                            ...updatedPieces[index],
                                            PieceWeight: newValue
                                        };
                                        return updatedPieces;
                                    });
                                }}
                            />
                        </div>
                        <div className="pb-3">
                            <label htmlFor=""> وصف القطع </label>
                            <textarea
                                className="form-control"
                                name={`PieceDescription_${index}`}
                                value={piece.PieceDescription}
                                onChange={(event) => {
                                    const newValue = event.target.value;
                                    setPieces(prevPieces => {
                                        const updatedPieces = [...prevPieces];
                                        updatedPieces[index] = {
                                            ...updatedPieces[index],
                                            PieceDescription: newValue
                                        };
                                        return updatedPieces;
                                    });
                                }}
                                cols="50"
                                rows="2"
                            ></textarea>
                        </div>
                    </div>
                ))}
                <div className="col-md-6 d-flex align-items-center">
                    <button type="button" className="btn btn-primary" onClick={handleAddPiece}>
                        أخرى
                    </button>
                </div> */}

         {/* {orderData.Pieces.map((piece, index) => (
                <>
                <div className="col-md-6" key={index}>
                    <div className="pb-3">
                        <label htmlFor=""> عدد القطع</label>
                        <input
                            type="number"
                            className="form-control"
                            name="PieceWeight"
                            value={piece.PieceWeight}
                            onChange={(event) => handleInputChange(event, index)}
                        />
                    </div>
                    </div>
                    
                    <div className="pb-3">
                        <label htmlFor=""> وصف القطع </label>
                        <textarea
                            className="form-control"
                            name="PieceDescription"
                            value={piece.PieceDescription}
                            onChange={(event) => handleInputChange(event, index)}
                            cols="50"
                            rows="2"
                        ></textarea>
                        
                    </div>
                    </>
            ))} */}

              {/* <div className="col-md-6"> */}
              {/* <div className='pb-3'>
              <label htmlFor=""> عدد القطع</label>
              <input type="number" className="form-control" name='PieceWeight' onChange={getOrderData}/>
              {errorList.map((err,index)=>{
    if(err.context.label ==='PieceWeight'){
      return <div key={index} className="alert alert-danger my-2">يجب ملىء هذه الخانة </div>
    }
    
  })}
          </div>
              </div>
              <div className='pb-3'>
                <label htmlFor=""> وصف القطع </label>
                <textarea className="form-control" name='PieceDescription' onChange={getOrderData} cols="30" rows="4"></textarea>
                {errorList.map((err,index)=>{
      if(err.context.label ==='PieceDescription'){
        return <div key={index} className="alert alert-danger my-2">يجب ملىء هذه الخانة </div>
      }
      
    })}
            </div> 
            <div className="pb-3">
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
            </div>
              {/* {userData.userData.data.user.rolle === "user"?(
            <>
            <div className="pb-3">
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
            </div>
            {orderData.cod === true && (
  <div className='pb-3'>
    <label htmlFor=""> قيمة الشحنة</label>
    <input type="number" step="0.001" className="form-control" name='shipmentValue' onChange={getOrderData} required />
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
            </div>
            {orderData.cod !== false && (
              <>
              <div className='pb-3'>
              <label htmlFor=""> قيمة الشحن (cod)</label>
              <input type="number" step="0.001" className="form-control" name='cod' onChange={getOrderData} required/>
              {errorList.map((err,index)=>{
    if(err.context.label ==='cod'){
      return <div key={index} className="alert alert-danger my-2">يجب ملىء هذه الخانة </div>
    }
    
  })}
          </div>
  <div className='pb-3'>
    <label htmlFor=""> قيمة الشحنة</label>
    <input type="number" step="0.001" className="form-control" name='shipmentValue' onChange={getOrderData} required />
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
                 <h4></h4>} */}
              
              </div>
          </div>
          </div>
          <div className="col-md-6">
          <div className="reciever-details brdr-grey p-3">
              <h3>تفاصيل المستلم</h3>
              
      <div className='pb-3'>
              <label htmlFor=""> الاسم</label>
              <input type="text" className="form-control" name='reciverName' onChange={getOrderData}/>
              {errorList.map((err,index)=>{
    if(err.context.label ==='reciverName'){
      return <div key={index} className="alert alert-danger my-2">يجب ملىء هذه الخانة </div>
    }
    
  })}
          </div>
          <div className='pb-3'>
              <label htmlFor=""> رقم الهاتف</label>
              <PhoneInput name='reciverMobile' 
  labels={ar} defaultCountry='SA' dir='ltr' className='phoneInput' value={phone2}
  onChange={(phone2) => {
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
              <label htmlFor=""> الموقع</label>
              <input type="text" className="form-control" name='deliveryDistrictID' onChange={getOrderData}/>

              {/* <input type="text" className="form-control" name='deliveryDistrictID'
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
                  <ul  className='ul-cities'>
                  {cities && cities.filter((item)=>{
                  return search2 === ''? item : item.Name.toLowerCase().includes(search2.toLowerCase());
                  }).map((item,index) =>{
                   return(
                    <li key={index} name='deliveryDistrictID' 
                    onClick={(e)=>{ 
                      const selectedCity = e.target.innerText;
                      getOrderData({ target: { name: 'deliveryDistrictID', value: selectedCity } });
                      document.querySelector('input[name="deliveryDistrictID"]').value = selectedCity;
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
               */}
              {errorList.map((err,index)=>{
    if(err.context.label ==='deliveryDistrictID'){
      return <div key={index} className="alert alert-danger my-2">يجب ملىء هذه الخانة </div>
    }
    
  })}
          </div>
          
          <div className='pb-3'>
              <label htmlFor=""> العنوان</label>
              <input type="text" className="form-control" name='deliveryAddress1' onChange={getOrderData}/>
              {errorList.map((err,index)=>{
    if(err.context.label ==='deliveryAddress1'){
      return <div key={index} className="alert alert-danger my-2">يجب ملىء هذه الخانة </div>
    }
    
  })}
          </div>
          <div className='pb-3'>
                <label htmlFor=""> عنوان اضافى</label>
                <input type="text" className="form-control" name='deliveryAddress2' onChange={getOrderData}/>
                {errorList.map((err,index)=>{
      if(err.context.label ==='deliveryAddress2'){
        return <div key={index} className="alert alert-danger my-2">يجب ملىء هذه الخانة </div>
      }
      
    })}
            </div>
          {/* <h6 className='text-center py-2'>{'<<'}  معلومات اضافية  {'>>'}</h6> */}
          
          <button type="submit" className="btn btn-orange"> <i className='fa-solid fa-plus'></i> إضافة مستلم</button>
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
              <th scope="col">message</th>
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
      <td>{item.data.Message}</td>
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
    </tr>
  );
})}
</tbody>


       </table>
      </div>
      {/* {showsticker&& Array.isArray(shipments) && shipments.map((item, index) =>
    <SplSticker key={index} item={item}/>)} */}
  </div>  )
}


// {
//   "name": "proj",
//   "version": "0.1.0",
//   "private": true,
//   "dependencies": {
//     "@fortawesome/fontawesome-free": "^6.4.0",
//     "@testing-library/jest-dom": "^5.16.5",
//     "@testing-library/react": "^13.4.0",
//     "@testing-library/user-event": "^13.5.0",
//     "axios": "^1.3.4",
//     "bootstrap": "^5.2.3",
//     "joi": "^17.9.1",
//     "jwt-decode": "^3.1.2",
//     "react": "^18.2.0",
//     "react-barcode": "^1.4.6",
//     "react-dom": "^18.2.0",
//     "react-phone-number-input": "^3.2.19",
//     "react-router-dom": "^6.9.0",
//     "react-scripts": "^2.1.3",
//     "web-vitals": "^2.1.4"
//   },
//   "scripts": {
//     "start": "react-scripts start",
//     "build": "react-scripts build",
//     "test": "react-scripts test",
//     "eject": "react-scripts eject"
//   },
//   "eslintConfig": {
//     "extends": [
//       "react-app",
//       "react-app/jest"
//     ]
//   },
//   "browserslist": {
//     "production": [
//       ">0.2%",
//       "not dead",
//       "not op_mini all"
//     ],
//     "development": [
//       "last 1 chrome version",
//       "last 1 firefox version",
//       "last 1 safari version"
//     ]
//   },
//   "devDependencies": {
//     "http-proxy-middleware": "^2.0.6"
//   }
// }
