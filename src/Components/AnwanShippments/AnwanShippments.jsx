import React, { useState, useEffect, useRef } from 'react';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css'
import ar from 'react-phone-number-input/locale/ar'
import axios from 'axios';
import Joi from 'joi';
import { Link } from 'react-router-dom';

export default function AnwanShippments(userData) {
    const [companiesDetails,setCompaniesDetails]=useState([])
    async function getCompaniesDetailsOrders() {
      try {
        const response = await axios.get('https://dashboard.go-tex.net/api/companies/get-all');
        const companies = response.data.data;
        console.log(companies)
        setCompaniesDetails(companies)
        const filteredCompanies = companies.find(company => company.name === 'anwan');

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
      useEffect(()=>{
          getCompaniesDetailsOrders()
          getClientsList()
          console.log(cities)
          getUserBalance()
          // getCities()
      },[])
      const [phoneValue ,setPhoneValue]=useState()
      const [phone2,setPhone2] =useState()
      const [phone3,setPhone3] =useState()
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
      const [errorList, seterrorList]= useState([]); 
      const [itemName, setItemName] = useState('');
  const [itemMobile, setItemMobile] = useState('');
  const [itemCity, setItemCity] = useState('');
  const [itemAddress, setItemAddress] = useState('');
  const [itemEmail, setItemEmail] = useState('');
  const [itemId, setItemId] = useState('');
  const [itemClientId, setItemClientId] = useState('');

    const [orderData,setOrderData] =useState({
      pieces: '',
      description: '',
      // s_email:'',
      // c_email:'',
      weight: '',
      s_address: '',
      s_city: '',
      s_phone: '',
      s_name: '',
      c_name: "",
      c_address: "",
      c_city: '',
      c_phone: '',
      cod: false,
      shipmentValue:'',
      markterCode:'',
      clintid:'',
      // daftraid:'',
  
    })
    const [error , setError]= useState('')
    const [isLoading, setisLoading] =useState(false)
    const [shipments,setShipments]=useState([])

    async function sendOrderDataToApi() {
      console.log(localStorage.getItem('userToken'))
      try {
        const response = await axios.post(
          "https://dashboard.go-tex.net/api/anwan/create-user-order",
          orderData,
          // {...orderData, shipmentValue: orderData.shipmentValue - orderData.cod},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('userToken')}`,
            },
          }
        );
    
        if (response.status === 200) {
          console.log(orderData.shipmentValue)
          setisLoading(false);
          window.alert("تم تسجيل الشحنة بنجاح");
          getUserBalance()
          getPackageDetails()
          // getClientsList()
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
          const shipment = response.data.data;
          setShipments(prevShipments => [...prevShipments, shipment]);
          console.log(shipments)
          }else if (response.status === 400) {
          setisLoading(false);
          const errorMessage = response.data.msg || "An error occurred.";
          window.alert(`${errorMessage}`);
          console.log(response.data);
        }
      } catch (error) {
        // Handle error
        console.error(error);
        setisLoading(false);
        const errorMessage = error.response.data?.error?.msg || error.response.data?.msg ||   "An error occurred.";
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
    let validation = validateOrderUserForm();
    console.log(validation);
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
      } else if(isClient === true && (packageCompanies.includes('anwan')||packageCompanies.includes('all') && packageOrders > 0)){
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
    myOrderData = {
      ...orderData,
      s_name: itemName,
      s_city: itemCity,
      s_phone: itemMobile,
      s_address: itemAddress,
      c_name: itemName2,
      c_phone: itemMobile2,
      c_address: itemAddress2,
      clintid: itemClientId,
      // daftraid: itemId,
      // s_email: itemEmail,
    };
  } else {
    myOrderData = { ...orderData };
  }
      
        if (e.target.type === "number") { // Check if the value is a number
        myOrderData[e.target.name] = Number(e.target.value);
      } else if (e.target.value === "true" || e.target.value === "false") {
        myOrderData[e.target.name] = e.target.value === "true";
      } else {
        myOrderData[e.target.name] = e.target.value;
      }
    
      setOrderData(myOrderData);
      console.log(myOrderData);
      console.log(myOrderData.cod);
    }
    
      // function getOrderData(e){
      //   let myOrderData={...orderData};
      //   myOrderData[e.target.name]= e.target.value;
      //   setOrderData(myOrderData);
      //   console.log(myOrderData);
      //   console.log(myOrderData.cod);
        
      // }
    
      function validateOrderUserForm(){
        let scheme= Joi.object({
            s_name:Joi.string().required(),
            s_city:Joi.string().required(),
            s_phone:Joi.string().required(),
            s_address:Joi.string().required(),
            weight:Joi.number().required(),
            pieces:Joi.number().required(),
            c_name:Joi.string().required(),
            c_city:Joi.string().required(),
            c_address:Joi.string().required(),
            c_phone:Joi.string().required(),
            description:Joi.string().required(),
            // s_email:Joi.string().email({ tlds: { allow: ['com', 'net','lol'] }}).required(),
            // c_email:Joi.string().email({ tlds: { allow: ['com', 'net','lol'] }}).required(),
            // value:Joi.string().required(),
            cod:Joi.required(),
            shipmentValue:Joi.number().allow(null, ''),  
            markterCode:Joi.string().allow(null, ''),
            clintid:Joi.string().allow(null, ''),
            // daftraid:Joi.string().allow(null, ''),
        });
        return scheme.validate(orderData, {abortEarly:false});
      }
      // const [cities,setCities]=useState()
      async function getCities() {
        console.log(localStorage.getItem('userToken'))
        try {
          const response = await axios.get('https://dashboard.go-tex.net/api/anwan/cities',
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('userToken')}`,
            },
          });
          // setCities(response.data.data.data)
          console.log(response.data.data)
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
    
      const cities=['Buraydah','Al Badayea','Al Bukayriyah','Al Fuwaileq','Al Hilaliyah','Al Mithnab',
        'Alnabhanya','Alrass','Ayn Fuhayd','Badaya','Bukeiriah','Midinhab','Muzneb','Onaiza','Oyoon Al Jawa',
        'Riyadh Al Khabra','Unayzah','Uyun Al Jawa','Al Asyah','Al Batra','Uqlat Al Suqur',
        'Al Amar in qasim','Al Dalemya','Al Khishaybi','AlDalemya','Dulay Rashid','Qusayba',
        'Ar Rishawiyah','Al Wasayta','An Nuqrah','Hail','Qufar','Sadyan','Baqa Ash Sharqiyah','Baqaa',
        'Ghazalah','Mawqaq','Moqaq','Munifat Al Qaid','Al Ajfar','Al hait','Ash Shamli','Ash Shananah',
        'Shinanh','Simira','Al Jawf','Qurayat','Sakaka','Al Laqayit','Ar Radifah','At Tuwayr','Domat Al Jandal',
        'Hadeethah','Qara','Tabrjal','Zallum','Abu Ajram','Al Adari','An Nabk Abu Qasr',
        'Jouf','Arar','Hazm Al Jalamid','Rafha','Turaif',
        'Abha','Ahad Rufaidah','Al Wadeen','Asir','Balahmar','Balasmar','Harajah',
'Khamis Mushait','Sarat Abidah','Sarat Obeida','Tendaha','Wadeien','Wadi Bin Hasbal','Samakh',
'Khaiber Al Janoub','Mohayel Aseer','Muhayil','Al Namas','Almajaridah',`Rejal Alma'A`,'Tanomah',
'Tanuma','turaib','Al Birk',`Kara'a`,'Subheka','Tatleeth','Al Baha','Bisha','Biljurashi','Majarda',
'Namas','Adham','Bareq','Bariq','Al Mada','Sabt El Alaya','Aqiq','Atawleh','Gilwa','Mandak','Nimra',
'Almuzaylif','Al Qunfudhah','Al Salamah','Birk','Amaq','Muthaleif','Rania','Qunfudah','Al Jifah',
'Bani Hamim','Al Majma','Al Khaniq','Haddadah','Hubuna','Lahumah','Al Husayniyah','Al Mishaliah',
'Najran','Khbash','Dhahran Al Janoob','Badr Al Janoub','Bir Askar','Khabash','Al Harajah','Al Hijf',
'Thar','Sharourah','Al Wadiah','Yadamah','Jazan','Sabkah','Al Husayni','Alarjeen','Sunbah',
'Al Gamri','Al Rayyan','Al Ataya','Either','Alabadilah','Al-Batna','Al Haqu','Harub','El Edabi',
'Al Henayah','Al khoba','Al Fatiha','Fayfa','Alaliya','Alshuqayri','Al-MNSALA','Samrat Al Jed',
'Al kadami','Al Sahalil','Alshqayri','Ad Darb','Al Reeth','Al Araq','Al Kadarah','Al Aridhah',
'Al Edabi','Al Idabi','Khasawyah','Abu Areish','Abu Arish','Ahad Al Masarihah','Ahad Masarha',
'Al Jaradiyah','Al Madaya','Al-Matan','Algayed','Alsilaa','Bish','Darb','Gizan','Jazan Economic City',
'Mahalah','Sabya','Samtah','Thabya','Addayer','Al Ardah','Al Harth','Al Mubarakah','Al Shuqaiq','Al Tuwal',
'Damad','Karboos','Shoaiba','Al Shuqaiq Hofuf','Al Hassa','Al Hofuf','Hofuf','Mubaraz','Al Qarah' ,
'Uyun',
'Juatha',
'Abqaiq',
'Baqayq - Hofuf',
'Baqiq',
'Othmanyah',
'Ain Dar',
'Salwa',
'Udhailiyah',
'Harad',
'Al Oyun Hofuf',
'Qarah',
'Al Khobar',
'Dammam',
'Dhahran',
'Khobar',
'Rahima',
'Thuqba',
'Al Jsh',
'Al Qatif',
'Anak',
'Awamiah',
'Nabiya',
'Al Awjam',
'Qatif',
'Ras Tanura',
'Safwa',
'Seihat',
'Tarout',
'Tarut',
'AlQaisumah',
'Hafer Al Batin',
'Nisab',
'As Sufayri',
'Qaisumah',
'As Sadawi',
'An Nazim',
'Rafha',
'King Khalid Military City',
'Ath Thybiyah',
'Rawdat Habbas',
'Al Jubail',
'Jubail',
'Satorp tank farm',
'Tanjeeb',
'Ras Al Kheir',
'As sarar' ,
'Satorp',
'Nayriyah',
'Khafji',
'Mulaija',
'Qariya Al Olaya',
'Safanyah',
'Jeddah',
'Taiba',
'Asfan',
'Bahara',
'Bahrat Al Moujoud',
'Dhahban',
'Khulais',
'King Abdullah Economic City',
'Mastorah',
'Mastura',
'Thuwal',
'Zahban',
'Laith',
'Rabigh',
'An Nawwariyyah',
`Ja'araneh`,
'Jumum',
'Makkah',
'Mecca',
'Nwariah',
`Shraie'E`,
'Shumeisi',
'Al Jumum',
'Al Huwaya',
'Alhada',
`Ash-Sharaʼi`,
'Taif',
`Hawea/Taif`,
'Khurma',
'Turba',
'Al Ais',
'Wadi farah',
'Madinah',
'Hinakeya',
'Khaibar',
'Umluj',
'Oula',
'Yanbu',
'Bader',
'Mahad Al Dahab',
'Yanbu Al Baher',
'Yanbu Al Sinaiyah',
'Yanbu Nakhil',
'Tabuk',
'Al Bada',
'Duba',
'Halat Ammar',
'Haqil',
'Sharmaa',
'Tayma',
`Wajeh (Al Wajh)`,
'Ad Diriyah',
'Dhurma',
'Huraymila',
'Muzahmiyah',
'Uyaynah',
'Remah',
'Salbookh',
'Thadek',
'Hawtat Bani Tamim',
'Ad Dilam',
'Al Kharj',
'Al Hariq',
'Al Jubaylah',
'Ar Ruwaydah',
'Quweiyah',
'Malham',
'Mrat',
'Tebrak',
'Qasab',
'Ar Rayn',
'Al Furuthi',
'Jalajil',
'Al Dahinah',
'Al Jurayfah',
'Al Muashibah',
'As Suh',
'Umm Tulayhah',
'Al Ghurabah',
'Shaqra',
'Ushaiqer',
'Hautat Sudair',
'Al Hurayyiq',
'Raudat Sudair',
'Audat Sudair',
'Ushairat Sudair',
'Al Hasi',
'Al Tuwaim',
'Tumair',
'Sudair Industry and Business City',
'Mabayid',
'Al Sheib',
'Al Shahmah',
'Al Ghat',
'Al Wusayyiah',
'Mulayh',
'Al Zulfi',
'Al Zulfi -North  Albutain',
'Imarat Almistawi',
'Mushrifa',
'Mishash Awad',
'Al Uqlah',
'Al Artawiyah',
'Al Qaiyah',
'An Nughayq',
'Masada Artawiyah',
'Umm Al Jamajm',
'Afif',
'Sajir',
'Bejadiyah',
'Nifi',
'Al Artawi',
'Arja',
'AL Qaiyah',
'Alsalhiya',
'Wabrah',
'Hadri',
'Al Qurayn',
'Afqara',
'Musaddah',
'Al Ulu',
'As sumayrah',
'Ash Shuara',
'Jefin',
'Abu sidayrah',
'Sulaiyl',
'Khamaseen',
'Khairan',
'Wadi', 
'Kumdah',
        ]

        async function getGotexSticker(orderId) {
          try {
            const response = await axios.get(`https://dashboard.go-tex.net/api/anwan/print-sticker/${orderId}`, {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('userToken')}`,
              },
            });
                 console.log(response.data.data)
            const stickerUrl = `${response.data.data}`;
            const newTab = window.open();
            newTab.location.href = stickerUrl;
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

        const citiesListRef = useRef(null);

        useEffect(() => {
          const handleOutsideClick = (e) => {
            if (
              citiesListRef.current &&
              !citiesListRef.current.contains(e.target) &&
              e.target.getAttribute('name') !== 's_city'
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
              e.target.getAttribute('name') !== 'c_city'
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
        const[addMarketer,setMarketer]=useState(false);
        const [Branches,setBranches]=useState('')
        const [isBranches,setIsBranches]=useState(false)
        
        useEffect(() => {
          getOrderData({
            target: { name: 's_city', value: itemCity },
          });
        }, [itemCity]); 
        
        useEffect(() => {
          getOrderData({
            target: { name: 's_address', value: itemAddress },
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
            getOrderData({ target: { name: 's_phone', value } });
          }
        };
  return (
<div className='px-4 pt-2 pb-4' id='content'>
<div className=" px-3 pt-4 pb-2 mb-2" dir='ltr'>
      <span class="wallet-box">الرصيد الحالى
                (<span className='txt-blue'> {userBalance}</span> ر.س)
                </span>
      </div>
{/*       
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
              
              </div>}
          
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
          ): null} */}
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
                       setItemCity(item.city);
                       setItemAddress(item.address);
                       setItemName0(item.name);
                           setItemMobile0(item.mobile);
                           setItemAddress0(item.address);
                      //  setItemEmail(item.email);
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
                      // setItemName(item.Client.first_name && item.Client.last_name);
                      // setItemName(item.Client.first_name && item.Client.last_name ? `${item.Client.first_name} ${item.Client.last_name}` : '');
                      //  setItemMobile(item.Client.phone1);
                      //  setItemCity(item.Client.city);
                      //  setItemAddress(item.Client.address1);
                      //  setItemEmail(item.Client.email);
                      //  setItemId(Number(item.Client.id));
                      //  setPhoneValue(item.Client.phone1)
                         
                       document.querySelector('input[name="s_name"]').value = item.name;
                       document.querySelector('input[name="s_phone"]').value = phoneValue;
                      //  document.querySelector('input[name="s_city"]').value = item.city;
                       document.querySelector('input[name="s_address"]').value = item.address;

                       document.querySelector('input[name="s_name"]').readOnly = true;
                       document.querySelector('input[name="s_phone"]').readOnly = true;
                       document.querySelector('input[name="s_address"]').readOnly = true;
                     
                      //  document.querySelector('input[name="s_email"]').value = item.email; 
                      // document.querySelector('input[name="s_name"]').value = item.Client.first_name && item.Client.last_name;
                      // document.querySelector('input[name="s_name"]').value = item.Client.first_name && item.Client.last_name ? `${item.Client.first_name} ${item.Client.last_name}` : '';

                      // document.querySelector('input[name="s_phone"]').value = value;
                      //  document.querySelector('input[name="s_city"]').value = item.Client.city;
                      //  document.querySelector('input[name="s_address"]').value = item.Client.address1;
                      //  document.querySelector('input[name="s_email"]').value = item.Client.email;                    
   
                           document.querySelector('input[name="client"]').value = selectedCity;
                           // getOrderData(e)
                           closeClientsList();
                       }}
                         >
                           {item.name} , {item.company} , {item.email} , {item.mobile} , {item.city} , {item.address}
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
                item.name === "anwan" ? (<p>قيمة الشحن من <span>{item.mincodmarkteer} ر.س</span> الى <span>{item.maxcodmarkteer} ر.س</span></p>):
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

          document.querySelector('input[name="c_name"]').value = itemName0;
            document.querySelector('input[name="c_phone"]').value = itemMobile0;
            document.querySelector('input[name="c_address"]').value =itemAddress0;
           
            document.querySelector('input[name="s_name"]').value = '';
            document.querySelector('input[name="s_phone"]').value = '';
           //  document.querySelector('input[name="p_city"]').value = item.city;
            document.querySelector('input[name="s_address"]').value = '';

            document.querySelector('input[name="s_name"]').readOnly = false;
            document.querySelector('input[name="s_phone"]').readOnly = false;
            document.querySelector('input[name="s_address"]').readOnly = false;
           
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
                {/* <p>{cities[0].name}</p> */}
                <div className='pb-3'>
                <label htmlFor=""> الاسم<span className="star-requered">*</span></label>
                <input type="text" className="form-control" name='s_name' onChange={(e) => {
    setItemName(e.target.value);
    getOrderData(e);
  }}/>
                {errorList.map((err,index)=>{
      if(err.context.label ==='s_name'){
        return <div key={index} className="alert alert-danger my-2">يجب ملىء هذه الخانة </div>
      }
      
    })}
            </div>
            {/* <div className='pb-3'>
                <label htmlFor=""> الايميل<span className="star-requered">*</span></label>
                <input type="email" className="form-control" name='s_email' onChange={(e) => {
    setItemEmail(e.target.value);
    getOrderData(e);
  }}/>
                {errorList.map((err,index)=>{
      if(err.context.label ==='s_email'){
        return <div key={index} className="alert alert-danger my-2">يجب ملىء هذه الخانة </div>
      }
      
    })}
            </div> */}
            { userData.userData.data.user.rolle === "marketer"?(
              <>
            <div className={`pb-3 main-box ${isChecked ? 'opacity-50' : ''}`}>
                <label htmlFor="">رقم الهاتف<span className="star-requered">*</span></label>
                {/* <input type="text" className="form-control" /> */}
                <PhoneInput name='s_phone' 
    labels={ar} defaultCountry='SA' dir='ltr' className='phoneInput' value={phoneValue}
    onChange={(phoneValue) => {
      setItemMobile(phoneValue);
      setPhoneValue(phoneValue);
      getOrderData({ target: { name: 's_phone', value: phoneValue } });
    }}/>
    {errorList.map((err,index)=>{
      if(err.context.label ==='s_phone'){
        return <div key={index} className="alert alert-danger my-2">يجب ملئ جميع البيانات </div>
      }
      
    })}
            </div>
            <div className="pb-3">
            <input type="checkbox" name="" id="checkBoxPhone" checked={isChecked}
          onChange={handleCheckBoxChange} />
            <label htmlFor="" className='txt-blue'>إضافة رقم هاتف آخر </label>
            <div className={`phone-checkBox ${isChecked ? '' : 'd-none'}`}>
            
    <PhoneInput name='s_phone' 
    labels={ar} defaultCountry='SA' dir='ltr' className='phoneInput' value={phone3}
    onChange={(phone3) => {
      setPhone3(phone3);
      getOrderData({ target: { name: 's_phone', value: phone3} });
    }}/>
    {errorList.map((err,index)=>{
      if(err.context.label ==='s_phone'){
        return <div key={index} className="alert alert-danger my-2">يجب ملئ جميع البيانات </div>
      }
    })}
            </div>
            </div>
            </>
            ):
            <div className='pb-3'>
            <label htmlFor="">رقم الهاتف<span className="star-requered">*</span></label>
            {/* <input type="text" className="form-control" /> */}
            <PhoneInput name='s_phone' 
labels={ar} defaultCountry='SA' dir='ltr' className='phoneInput' value={phoneValue}
onChange={(phoneValue) => {
  setItemMobile(phoneValue);
  setPhoneValue(phoneValue);
  getOrderData({ target: { name: 's_phone', value: phoneValue } });
}}/>
{errorList.map((err,index)=>{
  if(err.context.label ==='s_phone'){
    return <div key={index} className="alert alert-danger my-2">يجب ملئ جميع البيانات </div>
  }
  
})}
  
        </div>}
            <div className='pb-3 ul-box'>
            <label htmlFor="">  الموقع(الفرع الرئيسى)<span className="star-requered">*</span></label>
                <input type="text" className="form-control" name='s_city'
                onChange={(e)=>{ 
                  setItemCity(e.target.value);

                  const searchValue = e.target.value;
                  setSearch(searchValue);
                  getOrderData(e)
                  const matchingCities = cities.filter((item) => {
                    return searchValue === '' ? item : item.toLowerCase().includes(searchValue.toLowerCase());
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
                    <ul  className='ul-cities' ref={citiesListRef}>  
                    {cities && cities.filter((item)=>{
                    return search === ''? item : item.toLowerCase().includes(search.toLowerCase());
                    }).map((item,index) =>{
                     return(
                      <li key={index} name='s_city' 
                      onClick={(e)=>{ 
                        const selectedCity = e.target.innerText;
                        setItemCity(selectedCity)
                        getOrderData({ target: { name: 's_city', value: selectedCity } });
                        document.querySelector('input[name="s_city"]').value = selectedCity;
                        closeCitiesList();
                    }}
                      >
                        {item}
                     </li>
                     )
                    }
                    )}
                    </ul>
                  )}
                 
                {/* <select className="form-control" name='s_city' onChange={getOrderData}>
                <option></option>
                {cities && cities.map((item, index) => (
                  <option key={index}>{item.name}</option>
                  ))}
                </select> */}
                {errorList.map((err,index)=>{
      if(err.context.label ==='s_city'){
        return <div key={index} className="alert alert-danger my-2">يجب ملىء هذه الخانة </div>
      }
      
    })}
            </div>
            {/* <div className='pb-3'>
                <label htmlFor=""> الموقع</label>
                <select className="form-control" name='s_city' onChange={getOrderData}>
                <option></option>
                {cities && cities.map((item, index) => (
                  <option key={index}>{item.name}</option>
                  ))}
                </select>
                {errorList.map((err,index)=>{
      if(err.context.label ==='s_city'){
        return <div key={index} className="alert alert-danger my-2">يجب ملىء هذه الخانة </div>
      }
      
    })}
            </div> */}
            <div className='pb-3'>
                <label htmlFor=""> العنوان <span className="star-requered">*</span></label>
                <input type="text" className="form-control" name='s_address' onChange={(e) => {
    setItemAddress(e.target.value);
    getOrderData(e);
  }}/>
                {errorList.map((err,index)=>{
      if(err.context.label ==='s_address'){
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

   {/* onChange={(e) => {
    const selectedBranchIndex = e.target.selectedIndex;
    if (selectedBranchIndex > 0 && Branches.length > 0) {
      const selectedBranch = Branches[selectedBranchIndex - 1];
      setItemAddress(selectedBranch.address);
  
      // Use the callback function of setItemCity
      setItemCity(selectedBranch.city, () => {
        // This code will be executed after setItemCity updates the state
        getOrderData({
          target: { name: 's_city', value: selectedBranch.city },
        });
        getOrderData({
          target: { name: 's_address', value: selectedBranch.address },
        });
      });
    }
  }} */}
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
            
            

           {/* <div className='pb-3'>
                <label htmlFor=""> قيمة الشحنة</label>
                <input type="number" className="form-control" name='shipmentValue' onChange={getOrderData}/>
                {errorList.map((err,index)=>{
      if(err.context.label ==='shipmentValue'){
        return <div key={index} className="alert alert-danger my-2">يجب ملىء هذه الخانة </div>
      }
      
    })}
            </div> */}
    
            
            </div>
            <div className="package-info brdr-grey p-3 my-3 ">
                <h3>بيانات الشحنة</h3>
                <div className="row">
                <div className="col-md-6">
                <div className='pb-3'>
                <label htmlFor=""> الوزن<span className="star-requered">*</span></label>
                <input 
                // type="number" step="0.001" 
                className="form-control" name='weight' onChange={getOrderData}/>
                {errorList.map((err,index)=>{
      if(err.context.label ==='weight'){
        return <div key={index} className="alert alert-danger my-2">يجب ملىء هذه الخانة </div>
      }
      
    })}
            </div>
                </div>
                {/* <div className="col-md-6">
                <div className='pb-3'>
                <label htmlFor=""> القيمة</label>
                <input type="text" className="form-control" name='value' onChange={getOrderData}/>
                {errorList.map((err,index)=>{
      if(err.context.label ==='value'){
        return <div key={index} className="alert alert-danger my-2">يجب ملىء هذه الخانة </div>
      }
      
    })}
            </div>
                </div>
                 */}
                <div className="col-md-6">
                <div className='pb-3'>
                <label htmlFor=""> عدد القطع<span className="star-requered">*</span></label>
                <input
                //  type="number" 
                 className="form-control" name='pieces' onChange={getOrderData}/>
                {errorList.map((err,index)=>{
      if(err.context.label ==='pieces'){
        return <div key={index} className="alert alert-danger my-2">يجب ملىء هذه الخانة </div>
      }
      
    })}
            </div>
                </div>
                <div className="">
                {userData.userData.data.user.rolle === "user"?(
              <>
              <div className="pb-3">
              <label htmlFor="" className='d-block'>طريقة الدفع:<span className="star-requered">*</span></label>
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
      <input 
      // type="number" step="0.001" 
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
                <input 
                // type="number" step="0.001" 
                className="form-control" name='cod' 
                onChange={(e)=>{getOrderData({target:{name:'cod',value:Number(e.target.value)}});
              }}                required/>
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
              {/* {orderData.cod === false && (
                <div></div>
              )} */}
               
              </>
   
                   
                   ):
                   <h4></h4>}

{/* <>
                    <div className='pb-3'>
                <label htmlFor=""> قيمة الشحن (cod)</label>
                <input type="number" className="form-control" name='cod' onChange={getOrderData}/>
                {errorList.map((err,index)=>{
      if(err.context.label ==='cod'){
        return <div key={index} className="alert alert-danger my-2">يجب ملىء هذه الخانة </div>
      }
      
    })}
            </div>
            <div className='pb-3'>
                <label htmlFor=""> قيمة الشحنة</label>
                <input type="number" className="form-control" name='shipmentValue' onChange={getOrderData}/>
                {errorList.map((err,index)=>{
      if(err.context.label ==='shipmentValue'){
        return <div key={index} className="alert alert-danger my-2">يجب ملىء هذه الخانة </div>
      }
      
    })}
            </div>
                    </> */}
                
                </div>
                <div className='d-flex align-items-center pb-3'>
                <div className="checkbox" onClick={()=>{alert('سوف يكون متاح قريباً ')}}></div>
                <label className='label-cod' htmlFor="">طلب المندوب</label>
                </div>

                <div className='pb-3'>
                <label htmlFor=""> الوصف <span className="star-requered">*</span></label>
                <textarea className="form-control" name='description' onChange={getOrderData} cols="30" rows="4"></textarea>
                {errorList.map((err,index)=>{
      if(err.context.label ==='description'){
        return <div key={index} className="alert alert-danger my-2">يجب ملىء هذه الخانة </div>
      }
      
    })}
            </div>
                </div>
            </div>
            </div>
            <div className="col-md-6">
            <div className="reciever-details brdr-grey p-3">
                <h3>تفاصيل المستلم</h3>
                
        <div className='pb-3'>
                <label htmlFor=""> الاسم<span className="star-requered">*</span></label>
                <input type="text" className="form-control" name='c_name' onChange={(e)=>{
                  setItemName2(e.target.value)
                  getOrderData(e)
                }}/>
                {errorList.map((err,index)=>{
      if(err.context.label ==='c_name'){
        return <div key={index} className="alert alert-danger my-2">يجب ملىء هذه الخانة </div>
      }
      
    })}
            </div>
            {/* <div className='pb-3'>
                <label htmlFor=""> الايميل<span className="star-requered">*</span></label>
                <input type="email" className="form-control" name='c_email' onChange={getOrderData}/>
                {errorList.map((err,index)=>{
      if(err.context.label ==='c_email'){
        return <div key={index} className="alert alert-danger my-2">يجب ملىء هذه الخانة </div>
      }
      
    })}
            </div> */}
            <div className='pb-3'>
                <label htmlFor=""> رقم الهاتف<span className="star-requered">*</span></label>
                {/* <input type="text" className="form-control"/> */}
                <PhoneInput name='c_phone' 
    labels={ar} defaultCountry='SA' dir='ltr' className='phoneInput' value={phone2}
    onChange={(phone2) => {
      setItemMobile2(phone2)
      setPhone2(phone2);
      getOrderData({ target: { name: 'c_phone', value: phone2 } });
    }}/>
    {errorList.map((err,index)=>{
      if(err.context.label ==='c_phone'){
        return <div key={index} className="alert alert-danger my-2"> يجب ملئ جميع البيانات</div>
      }
      
    })}
      
            </div>
            <div className='pb-3 ul-box'>
                <label htmlFor=""> الموقع<span className="star-requered">*</span></label>
                <input type="text" className="form-control" name='c_city'
                onChange={(e)=>{ 
                  const searchValue = e.target.value;
                  setSearch2(searchValue);
                  getOrderData(e)
                  const matchingCities = cities.filter((item) => {
                    return searchValue === '' ? item : item.toLowerCase().includes(searchValue.toLowerCase());
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
                    return search2 === ''? item : item.toLowerCase().includes(search2.toLowerCase());
                    }).map((item,index) =>{
                     return(
                      <li key={index} name='c_city' 
                      onClick={(e)=>{ 
                        const selectedCity = e.target.innerText;
                        getOrderData({ target: { name: 'c_city', value: selectedCity } });
                        document.querySelector('input[name="c_city"]').value = selectedCity;
                        closeCitiesList2();
                    }}
                      >
                        {item}
                     </li>
                     )
                    }
                    )}
                    </ul>
                  )}
                {/* <select className="form-control" name='c_city' onChange={getOrderData}>
                  <option></option>
                {cities && cities.map((item, index) => (
                  <option key={index}>{item.name}</option>
                  ))}                
                </select> */}
                {errorList.map((err,index)=>{
      if(err.context.label ==='c_city'){
        return <div key={index} className="alert alert-danger my-2">يجب ملىء هذه الخانة </div>
      }
      
    })}
            </div>
            {/* <div className='pb-3'>
                <label htmlFor=""> الموقع</label>
                <select className="form-control" name='c_city' onChange={getOrderData}>
                <option></option>
                {cities && cities.map((item, index) => (
                  <option key={index}>{item.name}</option>
                  ))}
                </select>
                {errorList.map((err,index)=>{
      if(err.context.label ==='c_city'){
        return <div key={index} className="alert alert-danger my-2">يجب ملىء هذه الخانة </div>
      }
      
    })}
            </div> */}
            <div className='pb-3'>
                <label htmlFor=""> العنوان<span className="star-requered">*</span></label>
                <input type="text" className="form-control" name='c_address' onChange={(e)=>{
                  setItemAddress2(e.target.value)
                  getOrderData(e)
                }}/>
                {errorList.map((err,index)=>{
      if(err.context.label ==='c_address'){
        return <div key={index} className="alert alert-danger my-2">يجب ملىء هذه الخانة </div>
      }
      
    })}
            </div>
            
                
            
            <button className="btn btn-orange" disabled={isLoading}>
            {isLoading == true?<i class="fa-solid fa-spinner fa-spin"></i>:'إضافة شحنة'}

               </button>
            {/* <button className="btn btn-orange"> <i className='fa-solid fa-plus'></i> إضافة مستلم</button> */}
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
               <th scope="col">رقم الشحنة</th>
               <th scope="col">رقم التتبع </th>
               <th scope="col">طريقة الدفع</th>
               <th scope="col">السعر </th>
               <th scope="col">id_الفاتورة</th>                
                <th scope="col"></th>
                <th scope="col"></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
  {Array.isArray(shipments) && shipments.map((item, index) => {
    return (
      <tr key={index}>
        <td>{index + 1}</td>
        <td>{item.company}</td>
        <td>{item.ordernumber}</td>
        <td>{item.data.awb_no}</td>
        <td>{item.paytype}</td>
        <td>{item.price}</td>
        {item.inovicedaftra?.id?(<td>{item.inovicedaftra.id}</td>):(<td>_</td>)}
        <td>
                <button
      
      className="btn btn-success"
      onClick={() => getGotexSticker(item._id)}
    >
      عرض الاستيكر
    </button>
                </td>
        {/* {item.inovicedaftra?.id?(<td></td>):(<td>_</td>)} */}
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
