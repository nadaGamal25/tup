import React, { useState, useEffect, useRef } from 'react';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css'
import ar from 'react-phone-number-input/locale/ar'
import axios from 'axios';
import Joi from 'joi';
import PdfViewer from '../PdfViewer/PdfViewer';
import base64js from 'base64-js';
import { saveAs } from 'file-saver';
import { Link } from 'react-router-dom';

export default function JtShippments(userData) {
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

  const [theSkuDetailList, setSkuDetailList] = useState([
    {
        englishName: "",
        number: "",
        itemType: "",
        itemName: "",
        priceCurrency: "",
        itemValue: "",
        itemUrl: "",
        desc: ""
    },
  ]);


  const [orderData,setOrderData] =useState({
    weight: "",
    description: "",
    re_address: "",
    re_city: "",
    re_mobile: "",
    re_name: "",
    re_prov: "",
    goodsType: "", //ITN1  = Clothes ,ITN2 Document, ITN3 = Food ,ITN4 = others ,ITN5 = Digital product ,ITN6 = Daily necessities ,ITN7 = Fragile Items
    s_address: "",
    s_city: "",
    s_mobile: "",
    s_name: "",
    s_prov: "",
    goodsValue: "",
    items: theSkuDetailList, 
    markterCode:"", 
    clintid:'',
    cod: false,
    // daftraid:'',
    shipmentValue:"",
  })
  const [error , setError]= useState('')
  const [isLoading, setisLoading] =useState(false)
  const [shipments,setShipments]=useState([])

  async function sendOrderDataToApi() {
    console.log(localStorage.getItem('userToken'))

    try {
      const response = await axios.post(
        "https://dashboard.go-tex.net/api/jt/create-user-order",
        {
            ...orderData,
            items: theSkuDetailList
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
        const errorMessage = response.data?.data?.Message ||response.data?.msg || "An error occurred.";
        window.alert(`${errorMessage}`);
        console.log(response.data);
      }
    } catch (error) {
      console.error(error);
      setisLoading(false);
      const errorMessage = error.response?.data?.data?.Message || "An error occurred.";
      window.alert(`${errorMessage}`);
    }
  }
  
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
      } else if(isClient === true && (packageCompanies.includes('jt')||packageCompanies.includes('all') && packageOrders > 0)){
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
  
// } else if(isClient == "false"){
//   sendOrderDataToApi();
// } else if(isClient == "true" && (packageCompanies.contains('jt')||packageCompanies.contains('all') && packageOrders > 0)){
//   sendOrderDataToApi()
// }

function getOrderData(e) {
  let myOrderData;

    if (userData.userData.data.user.rolle === "marketer") {
      myOrderData = { ...orderData, s_name: itemName,
        s_city: itemCity,
        s_mobile: itemMobile,
        s_address: itemAddress,
        re_name: itemName2,
        re_mobile: itemMobile2,
        re_address: itemAddress2,
        clintid: itemClientId,
        // daftraid:itemId,
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
        itemName: Joi.string().allow(null, ''),
        priceCurrency: Joi.string().allow(null, ''),
        itemUrl: Joi.string().allow(null, ''),
        englishName:Joi.string().required(),
        itemType:Joi.string().required(),
        desc:Joi.string().required(),
        number:Joi.number().required(),
        itemValue:Joi.number().required(),

    });
    let scheme= Joi.object({
        description:Joi.string().required(),
        re_address:Joi.string().required(),
        re_city:Joi.string().required(),
        re_mobile:Joi.string().required(),
        re_name:Joi.string().required(),
        re_prov:Joi.string().required(),
        s_address:Joi.string().required(),
        s_city:Joi.string().required(),
        s_mobile:Joi.string().required(),
        s_name:Joi.string().required(),
        s_prov:Joi.string().required(),
        goodsType:Joi.string().required(),
        weight:Joi.number().required(), 
        goodsValue:Joi.number().required(), 
        cod:Joi.required(),
        items: Joi.array().items(pieceSchema),
        shipmentValue:Joi.number().allow(null, ''),
        markterCode:Joi.string().allow(null, ''),
        clintid:Joi.string().allow(null, ''),
        // daftraid:Joi.string().allow(null, ''),

    });
    return scheme.validate(orderData, {abortEarly:false});
  }
  
  function addSku() {
    setSkuDetailList(prevSku => [
      ...prevSku,
      {
        englishName: "",
        number: "",
        itemType: "",
        itemName: "",
        priceCurrency: "",
        itemValue: "",
        itemUrl: "",
        desc: ""
      }
    ]);
  }

  function updateSku(index, field, value) {
    const updatedSku = [...theSkuDetailList];
    updatedSku[index][field] = value;
    setSkuDetailList(updatedSku);
  }

  
  useEffect(()=>{
    // getCities()
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
  // const [cities,setCities]=useState()
  // async function getCities() {
  //   console.log(localStorage.getItem('userToken'))
  //   try {
  //     const response = await axios.get('',
  //     {
  //       headers: {
  //         Authorization: `Bearer ${localStorage.getItem('userToken')}`,
  //       },
  //     });
  //     setCities(response.data.data.Cities)
  //     console.log(response.data.data.Cities)
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

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
  
    const [companiesDetails,setCompaniesDetails]=useState([])
  async function getCompaniesDetailsOrders() {
    try {
      const response = await axios.get('https://dashboard.go-tex.net/api/companies/get-all');
      const companies = response.data.data;
      console.log(companies)
      setCompaniesDetails(companies)
      const filteredCompanies = companies.find(company => company.name === 'jt');

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
 
// async function getSticker(orderId) {
//     try {
//       const response = await axios.get(`https://dashboard.go-tex.net/api/jt/print-sticker/${orderId}`, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem('userToken')}`,
//         },
//       });
//            console.log(response.data.data)
//       const stickerUrl = `${response.data.data}`;
//       const newTab = window.open();
//       newTab.document.open();
//     //   newTab.document.write(stickerUrl);
//       newTab.document.close();
//     //   newTab.location.href = stickerUrl;
//     } catch (error) {
//       console.error(error);
//     }
//   }

  async function getSticker(orderId) {
    try {
      const response = await axios.get(`https://dashboard.go-tex.net/api/jt/print-sticker/${orderId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('userToken')}`,
        },
      });
           console.log(response)
      const stickerUrl = `https://dashboard.go-tex.net/api${response.data.data}`;
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

  const cities=[' ابا الورود',
  'الضلفعه',
  'العيثمة',
  'العمار',
  'الاسياح',
  'البدائع',
  'البكيرية',
  'البطين',
  'الظاهرية',
  'الدليمية',
  'الفواره',
  'الحديدية',
  'الحيسونية',
  'الجعلة',
  'الخبراء',
 ' الخرماء الشمالية',
  'الخصيبة',
  'الخفية',
  'الخشيبي',
  'المذنب',
  'المكيلي',
  'البتراء',
  'القرعاء',
  'القوارة',
 ' الطرفية الشرقية',
  'الطراق',
  'الفويلق',
  'النبهانية',
  'الرس',
  'الصمعورية',
  'الصلبيه',
  'الشيحية',
  'الشماسية',
  'الشبيكية',
  'الطوالة',
  'الثامرية',
 ' عين ابن فهيد',
  'بريدة',
  'ضرية',
  'ضيدة',
 ' ضليع رشيد',
  'دريميحة',
  'دخنة',
 ' روض الجواء',
  'كحلة',
  'مرغان',
 ' مشاش جرود',
  'مبهل',
  'المدرج',
  'نبيها',
 ' قصر بن عقيل',
  'قبة',
  'قصيباء',
 ' روضة الحسو',
'  رياض الخبراء',
  'ساق',
  'شاري',
  'صبيح',
  'التنومه',
  'الذيبية',
 ' عقلة الصقور',
 ' ام حزم',
  'عنيزة',
  'اوثال',
 ' عيون الجواء',
  'الأجفر',
  'العرادية',
  'العوشزية',
  'البركة',
  'الفرحانية',
  'الفتخاء',
  'الغزالة',
  'الحائط',
  'الحطي',
  'الحيانية',
  'الحفير',
 ' الحليفة السفلى',
  'الحميمة',
  'الحويض',
  'الجابرية',
  'الجديدة',
  'الجرعاء',
  'الجحفة',
  'الكهيفيه',
  'الخبة',
  'الخطة',
  'الكيحية',
  'المطرفية',
  'المياه',
  'المضيح',
  'المشيطية',
  'المستجدة',
  'القاعد',
  'الرفايع',
  'السليمي',
  'العظيم',
  'الوسعة',
  'الوسيطاء',
  'الزبيرة',
 ' عمائر بن صنعاء',
  'النقرة',
  'الروضة',
  'الرشاوية',
  'السبعان',
  'الصفراء',
  'الشويمس',
 ' كما سيئيره',
  'السليل',
  'السفن',
  'الصنيناء',
  'اسبطر',
  'الشعلانية',
  'الشملي',
  'الشرقية',
  'الشنان',
  'الشقيق',
 ' بدائع الصداعية',
  'بقعاء',
 ' بيضاء نثيل',
 ' بدع بن خلف',
  'ضبيعة',
  'دليهان',
  'فيد',
 ' فيضة اثقب',
 ' فيضة ابن سويلم',
  'غزلانة',
  'هدبة',
  'حائل',
  'حبران',
  'الحليفه',
  'جبة',
  'موقق',
  'نايلات',
  'قناء',
  'قفار',
 ' روضة ابن هادي',
 ' ريع البكر',
  'سقف',
  'سعيدان',
  'سميراء',
  'طابة',
  'تخاييل',
  'تربه',
  'أبيرة',
 ' عقلة بن داني',
 ' عقلة ابن طوالة',
  'عريجاء',
 ' ابو عجرم',
  'الأضارع',
  'الحديثه',
  'اللقائط',
  'الناصفة',
  'القريات',
 ' النبك أبو قصر',
  'الرفيعة',
 ' السليمانية',
  'اصفان',
  'الطوير',
 ' دومة الجندل',
 ' فياض طبرجل',
  'غطي',
  'هدبان',
  'هديب',
  'إثرة',
  'جماجم',
  'ميقوع',
  'منوى',
  'قارا',
 ' قليّب خضر',
  'الرديفة',
  'سكاكا',
  'صديع',
  'صوير',
  'طبرجل',
  'زلوم',
  'الحماد',
  'الجديدة',
  'العويقيلة',
  'الدويد',
  'عرعر',
  'الشعبة',
 ' حازم الجلاميد',
  'لينه',
  'نصاب',
  'رفحاء',
 ' روضة هباس',
  'طريف',
 ' وعد الشمال',
  'أبها',
 ' أبها الجديدة',
  'عفراء',
 ' أحد رفيدة',
  'الامواه',
  'الننيسة',
  'العرين',
 ' قرى ال عاصم',
 ' ال عزة',
  'البهيم',
  'البشائر',
  'البشاير',
  'البتيلة',
  'البرك',
  'الفرعاء',
  'الفرشة',
  'الغفرات',
  'الحبيل',
  'الحراجه',
  'الحريضة',
  'الجرف',
  'المديد',
  'المضة',
  'المسقي',
  'النماص',
  'العوص',
  'القحمة',
  'القيرة',
  'الرونة',
 ' آل سرحان',
  'الشعف',
  'الشعبين',
  'الصبيخة',
  'الواديين',
  'الفرعين',
  'الجنادرية',
  'المحالة',
  'المجاردة',
  'عمق',
 ' بحر أبو سكينة',
 ' محافظة بلقرن',
 ' بني عمرو',
 ' بني مازن',
  'بارق',
  'باشوت',
  'بلحمر',
  'بللسمر',
  'بيشة',
 ' ظهران الجنوب',
  'عضاضة',
  'حلبا',
  'جاش',
 ' خيبر الجنوب',
 ' خميس مشيط',
 ' خميس مطير',
  'خثعم',
  'مربة',
  'مريغان',
  'محايل',
  'العسران',
  'قانا',
  'رغوة',
 ' رجال ألمع',
 ' سبت العلايه',
  'صمخ',
 ' سراة عبيدة',
  'شمران',
 ' قرى آل غليظ',
  'طبب',
  'تبالة',
  'تباشعة',
  'تمنية',
  'تنومة',
  'طريب',
  'تثليث',
  'تندحة',
 ' ثلوث المنظر',
  'واعر',
 ' وادي الحياة',
 ' وادي ابن هشبل',
  'يعرى',
  'الزفير',
 ' بني حريرة',
  'الكراء',
 ' بني حسن',
  'الأطاوله',
  'اللغاميس',
  'بلجرشي',
 ' بني محمد',
 ' بني كبير',
'  وادي بيده',
  'موسيله',
  'العقيق',
  'العطاولة',
  'الحميد',
  'عويره',
  'الباحة',
  'السلامة',
  'البارك',
  'المندق',
  'الأزاهرة',
  'المخواة',
 ' وادي شرى',
  'دوس',
  'قلوة',
  'جرب',
  'الحجرة',
  'الحجف',
  'الحصينية',
  'الجوشن',
  'الجفة',
  'الخانق',
  'الخرخير',
  'المشعلية',
  'الصفاح',
  'الوديعة',
 ' بدر الجنوب',
 ' بني هميم',
 ' بئر عسكر',
  'هدادة',
  'حبونا',
  'خباش',
  'لاهومة',
  'معفيجة',
  'نجران',
  'شرورة',
  'ثار',
  'يدمة',
 ' أبو العرج',
 ' أبو عريش',
 ' أبو الرديف',
 ' ابو حجر',
  'الدرب',
  'الدائر',
 ' أحد المسارحة',
  'العبادلة',
  'عتود',
  'العارضة',
  'العروس',
  'العسيلة',
  'البدوي',
 ' البديع والقرفي',
  'البختة',
  'الدغارير',
  'الدريعية',
  'العيدابي',
  'الفطيحة',
  'القمري',
  'القوامشة',
  'القفل',
  'الحضرور',
  'الحقو',
  'الحرث',
  'الحصامة',
  'الحثيرة',
  'الحناية',
  'الحسيني',
  'الجرادية',
  'الجوة',
  'الجوف',
  'الجديين',
  'الكدمي',
  'الكدره',
 ' الكدره الشمالية',
  'الكربوس',
  'الكدرة',
 ' الكدره الجنوبية',
  'الخشابية',
  'الخشعة',
  'الخزنة',
  'المضايا',
  'المجامة',
  'المجنة',
  'المقرقم',
  'المقالي',
  'المباركة',
  'الموسم',
  'النجامية',
  'القنبور',
  'الردحة',
  'الريان',
  'الريث',
  'الركوبه',
  'السلامه',
  'الصوارمة',
  'السر',
  'الشعفوليه',
  'الشابطة',
  'الشقيق',
  'الطوال',
  'الوحلة',
  'العالية',
  'العرجين',
 ' الأساملة الكبرى',
  'البطنة',
  'الظبية',
 ' ابو القعائد',
  'الخضراء',
  'المجديرة',
  'المنصورية',
  'المطعن',
  'المنزالة',
  'العقدة',
  'السادلية',
  'الشقيري',
 ' أبو السلع',
  'العرضة',
  'السر',
  'بيش',
 ' بيش العليا',
  'دبير',
  'ضمد',
  'ديحمة',
  'عثر',
  'فرسان',
  'فيفا',
  'جازان',
 ' مدينة جازان الإقتصادية',
  'حبس',
  'الهجنبة',
 ' حاكمة أبو عريش',
 ' حاكمة الدغارير',
  'هروب',
 ' حلة الأحوس',
  'الجمالة',
  'جريبة',
 ' خبت سعيد',
  'خضيرة',
  'الخواره',
 ' سكن الملك عبدالله',
  'المدرك',
  'مغشية',
  'المحلة',
  'الملحاء',
  'منشبة',
  'مسلية',
  'مزهرة',
 ' قائم الدش',
  'صبيا',
 ' سلامه الدراج',
 ' سمرة الجد',
  'صامطة',
  'الصيابة',
  'صديقة',
  'صنبة',
  'طلان',
 ' أم سعد',
 ' وادي عمود',
  'زمزم',
  'بقيق',
 ' عين النخل',
  'عرج',
  'العاذرية',
  'الأوجام',
  'البطحاء',
  'الدغيمية',
  'الفريدة',
  'الحفاير',
  'الأحساء',
  'الحناة',
  'الحني',
  'الحسي',
  'الجش',
  'الخبر',
  'اللهابة',
  'المبرز',
 ' حي النزهة',
  'العيون',
  'القيصومة',
  'القارة',
  'القطيف',
  'القليب',
  'القرية',
  'الشقيق',
  'الطرف',
  'الثقبة',
  'العمران',
  'الونان',
  'الوزية',
  'الكهفة',
  'الكويفرية',
  'المحدار',
  'النابية',
  'ناظم',
  'عنك',
  'الرفيعة',
  'الرقعي',
  'الصداوي',
  'السفانية',
  'الصرّار',
  'الصحاف',
  'السعيرة',
  'الصفيري',
  'الشامية',
  'الشملول',
  'الشيحية',
  'الذيبية',
  'العوامية',
  'الزغين',
  'الدمام',
  'الظهران',
  'غنوى',
  'غزلان',
 ' حفر الباطن',
  'حنيذ',
  'حرض',
  'الحوية',
 ' هجرة الحارة',
 ' هجرة فضيلة',
'الهفوف',
'جواثا',
'الجبيل',
'جودة',
'جليجلة',
'الخفجي',
'خريص',
'الخرسانية',
'مدينة الملك خالد العسكرية',
'معرج السوبان',
'مشلة',
'مليجة',
'منيفة',
'النعيرية',
'نباك',
'عين دار الجديدة',
'نطاع',
'عين دار القديمة',
'قرية العليا',
'رحيمة',
'رأس الخير',
'رأس تنورة',
'صفوى',
'سيهات',
'صلاصل',
'سلوى',
'ساتورب',
'الشيبة',
'شدقم',
'شفية',
'تناجيب',
'تاروت',
'ثاج',
'العضيلية',
'ام العراد',
'ام الشفلح',
'عريرة',
'عتيق',
'العثمانية',
'يبرين',
'ابو حليفاء',
'أبو ملوح',
'ابو راكة',
'أضم',
'احد بني زيد',
'العبار',
'الأبواء',
'الأبيار',
'الأملح',
'العوامر',
'البرزة',
'البرابر',
'الغلة',
'الهدا',
'حي سلطانة',
'الجيزه',
'الجموم',
'الجعرانة',
'الكديس',
'الكامل',
'الخلاص',
'الخرمة',
'الليث',
'المحاني',
'المدام',
'المقرح',
'المسماة',
'المبارك',
'المظيلف',
'الموية',
'النويبع',
'القاع',
'القضيمة',
'القوز',
'القوامة',
'القنفذة',
'السر',
'العفيرية',
'العمرة الجديدة',
'الوهيط',
'الفريق',
'الحراتيم',
'الحميمة',
'المناضح',
'المرشدية',
'الغالة',
'القريع',
'القعبة',
'السعدية',
'الشواق',
'الوسقة',
'النوارية',
'بقران',
'السدين',
'السدين بالحارث',
'السيل الكبير',
'السيل الصغير',
'السديرة',
'عسفان',
'الشفا',
'الشامية',
'الشرائع',
'الشميسي',
'عشيرة',
'عطيف',
'الزَّلال',
'الزيمه',
'بحره',
'بني سعد',
'بلاد بني سحيم',
'بني يزيد',
'ذهبان',
'ظلم',
'الضبية و الجمعة',
'دوقه',
'عنيكر',
'غزايل',
'غميقة',
'غران',
'الحبيل',
'حداد بني مالك',
'حدة',
'هدى الشام',
'حفر كشب',
'هجر',
'الهجرة',
'حفار',
'حصنه',
'جدة',
'كياد',
'خميس حرب',
'خليص',
'مدينة الملك عبد الله الاقتصادية',
'مدركة',
'مكة المكرمة',
'مخشوش',
'ملكان',
'مستورة',
'ميسان',
'نمرة',
'المويه الجديد',
'نمران',
'قيا',
'قديد',
'رابغ',
'رضوان',
'رهاط',
'رنية',
'صعبر',
'سبت شمران',
'سبت الجارة',
'سلم الزواهر',
'الصمد',
'سعيا',
'صيادة',
'الشعيبة',
'شقصان',
'طيبة',
'الطائف',
'ثول',
'ترعة',
'تربة',
'ام الجرم',
'أم الدوم',
'يلملم',
'العالية',
'العشاش',
'المثلث',
'ينبع',
'ينبع البحر',
'بدر',
'العلا',
'خيبر',
'مدائن صالح',
'الأكحل',
'المدينة المنورة',
'ابو ضباع',
'أبو حرامل',
'أبو شكير',
'الضميرية',
'الاحمر',
'العيص',
'العذيب',
'البركة',
'الدحيلة',
'الفقعلي',
'الفقير',
'الفارعه',
'الفقرة',
'الفريش',
'الغزلاني',
'الحمراء',
'الهرارة',
'الحناكية',
'الهندية',
'الحنو',
'الجفدور',
'الجفر',
'الجريسية',
'الجرنافه',
'الخرماء',
'اللحن',
'المرامية',
'المندسة',
'المويلح',
'المفرحات',
'المليليح',
'المربع',
'المسيجيد',
'النباه',
'النجف',
'النخيل',
'العمق',
'القراصة',
'الرمضه',
'الرذايا',
'الرحاب',
'الصلحانية',
'السدر',
'الصلصلة',
'الشرجة',
'الشقرة',
'الشفية',
'الثمد',
'الشلايل',
'الطرقية',
'الفرع',
'المعتدل',
'المواريد',
'الواسطة',
'اليتمة',
'الرايس',
'الصويدرة',
'السويرقيه',
'السٌويق',
'أبيار الماشي',
'ضاعا',
'فضلا',
'غمرة',
'الحسينية',
'عشرة',
'خيف حسين',
'مهد الذهب',
'مقرة',
'مصادر',
'مغيراء',
'نبط',
'صفينة',
'سمحة',
'سليلة جهينة',
'تلعة نزا',
'ترعة',
'وادي الفرع',
'وادي ببيضان',
'وادي ريم',
'ينبع النخل',
'ينبع الصناعية',
'ابيط',
'ابو سلامة',
'البدع',
'الديسة',
'الفارعة',
'الفقير',
'الحميظة',
'الجديد',
'المقنا',
'المويلح',
'القليبة',
'الشبحة',
'الشدخ',
'الوجه',
'الخريبة',
'الشرف',
'الصورة',
'بئر ابن هرماس',
'ضبا',
'قيال',
'حالة عمار',
'حنك',
'حقل',
'خف',
'مقنا',
'مديسيس',
'شغب',
'شرما',
'شقري',
'شواق',
'تبوك',
'الطوالة',
'تيماء',
'املج',
'أبو سديرة',
'الرياض',
'الدلم',
'الدرعية',
'الضبيعة',
'عفيف',
'الافلاج',
'أفقراء',
'الاحمر',
'العمارية',
'الأرطاوي',
'الأرطاوية',
'البديع الجنوبي',
'البديع الشمالي',
'البجادية',
'البير',
'الدوادمي',
'الفروثي',
'الغاط',
'الغيل',
'الغرابه',
'الهدار',
'الحريق',
'الهياثم',
'الحزم',
'الحفنة',
'الحلوة',
'الحوميات',
'الحريق',
'العجلية',
'الجبيلة',
'الجريفه',
'الخرج',
'الخاصرة',
'المجمعة',
'المعشبة',
'المزاحمية',
'القاعية',
'القصب',
'القرينة',
'القرين',
'القويعية',
'الولا',
'العقلة',
'العويند',
'العيينة',
'الوسيعة',
'الجفارة',
'المزيرع',
'الصالحية',
'الــنــايــفــيــة',
'النقيق',
'الرين',
'الرويضة',
'عرجاء',
'الصوح',
'السليل',
'السميرة',
'الشحمة',
'الشعراء',
'التوضيحية',
'التويم',
'الزلفي',
'بنبان',
'برودان',
'ضرما',
'عين الصوينع',
'حدري',
'حفيرة نساح',
'حفر العتش',
'حلبان',
'حوطة سدير',
'حزوى',
'حوطة بني تميم',
'حريملاء',
'جلاجل',
'جفن',
'الجله',
'الخيران',
'الخماسين',
'كومدة',
'ليلى',
'ملهم',
'مرات',
'مبيض',
'محيرقة',
'مليح',
'مصدة',
'نعجان',
'نفي',
'نخيلان',
'رفائع الجمش',
'روضة سدير',
'رماح',
'رويغب',
'سعّد',
'ساجر',
'صلبوخ',
'شقراء',
'شوية',
'ستارة',
'مدينة سدير للصناعة والأعمال',
'سحيلة',
'تبراك',
'ثادق',
'ثرمداء',
'طحي',
'تمير',
'ام الجماجم',
'أم رجوم',
'أشيقر',
'عشيرة سدير',
'وابرة',
'وادي الدواسر',
'واسط',
'وشي',

  ]

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
            getOrderData({ target: { name: 's_mobile', value } });
          }
        };
  return (
    <>
    <div className='px-4 pt-2 pb-4' id='content'>
    <div className=" px-3 pt-4 pb-2 mb-2" dir='ltr'>
      <span class="wallet-box">الرصيد الحالى
                (<span className='txt-blue'> {userBalance}</span> ر.س)
                </span>
      </div>
    {/* { userData.userData.data.user.rolle === "user" && packegeDetails.companies && packegeDetails.companies.length !== 0?(
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
                        // setItemCity(item.city);
                        setItemAddress(item.address);
                        setItemName0(item.name);
                           setItemMobile0(item.mobile);
                           setItemAddress0(item.address);
                        // setItemId(item.daftraClientId);
                        setItemClientId(item._id)
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

                    //    setItemName(item.Client.first_name && item.Client.last_name ? `${item.Client.first_name} ${item.Client.last_name}` : '');
                    //   setItemMobile(item.Client.phone1);
                    //   setItemCity(item.Client.city);
                    //   setItemAddress(item.Client.address1);
                    //  //  setItemEmail(item.Client.email);
                    //   setItemId(Number(item.Client.id));
                    //   setPhoneValue(item.Client.phone1)
                       
                        document.querySelector('input[name="s_name"]').value = item.name;
                        document.querySelector('input[name="s_mobile"]').value = phoneValue;
                        // document.querySelector('input[name="s_city"]').value = item.city;
                        document.querySelector('input[name="s_address"]').value = item.address;

                        document.querySelector('input[name="s_name"]').readOnly = true;
                        document.querySelector('input[name="s_mobile"]').readOnly = true;
                        document.querySelector('input[name="s_address"]').readOnly = true;
                     
                      //  document.querySelector('input[name="s_name"]').value = item.Client.first_name && item.Client.last_name ? `${item.Client.first_name} ${item.Client.last_name}` : '';

                      //  document.querySelector('input[name="s_mobile"]').value = value;
                      //  document.querySelector('input[name="s_city"]').value = item.Client.city;
                      //  document.querySelector('input[name="s_address"]').value = item.Client.address1;
   
                        
                        document.querySelector('input[name="client"]').value = selectedCity;
                        // getOrderData(e)
                        closeClientsList();
                    }}
                      >
                        {item.name} , {item.company}  , {item.mobile} , {item.city} , {item.address}
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
             item.name === "jt" ? (<p>قيمة الشحن من <span>{item.mincodmarkteer} ر.س</span> الى <span>{item.maxcodmarkteer} ر.س</span></p>):
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

          document.querySelector('input[name="re_name"]').value = itemName0;
            document.querySelector('input[name="re_mobile"]').value = itemMobile0;
            document.querySelector('input[name="re_address"]').value =itemAddress0;
           
            document.querySelector('input[name="s_name"]').value = '';
            document.querySelector('input[name="s_mobile"]').value = '';
           //  document.querySelector('input[name="p_city"]').value = item.city;
            document.querySelector('input[name="s_address"]').value = '';

            document.querySelector('input[name="s_name"]').readOnly = false;
            document.querySelector('input[name="s_mobile"]').readOnly = false;
            document.querySelector('input[name="s_address"]').readOnly = false;
           
        }}
          >تبديل العميل لمستلم</button>
          </div>
       </>
       ): null}
     <form onSubmit={submitOrderUserForm} className='' action="">
         <div className="row">
         <div className="col-md-6">
         <div className="shipper-details brdr-grey my-2 p-3">
              <h3>بيانات المرسل</h3>
              
              <div className='pb-1'>
              <label htmlFor=""> الاسم<span className="star-requered">*</span></label>
              <input type="text" className="form-control" name='s_name'  onChange={(e) => {
  setItemName(e.target.value);
  getOrderData(e);
}}/>
              {errorList.map((err,index)=>{
    if(err.context.label ==='s_name'){
      return <div key={index} className="alert alert-danger my-2">يجب ملىء هذه الخانة </div>
    }
    
  })}
          </div>
          { userData.userData.data.user.rolle === "marketer"?(
            <>
          <div className={`pb-1 main-box ${isChecked ? 'opacity-50' : ''}`}>
              <label htmlFor="">رقم الهاتف<span className="star-requered">*</span></label>
              {/* <input type="text" className="form-control" /> */}
              <PhoneInput name='s_mobile' 
  labels={ar} defaultCountry='SA' dir='ltr' className='phoneInput' value={phoneValue}
  onChange={(phoneValue) => {
    setItemMobile(phoneValue);
    setPhoneValue(phoneValue);
    getOrderData({ target: { name: 's_mobile', value : phoneValue } });
  }}/>
  {errorList.map((err,index)=>{
    if(err.context.label ==='s_mobile'){
      return <div key={index} className="alert alert-danger my-2">يجب ملئ جميع البيانات </div>
    }
    
  })}
    
          </div>
          <div className="pb-1">
            <input type="checkbox" name="" id="checkBoxPhone" checked={isChecked}
          onChange={handleCheckBoxChange} />
            <label htmlFor="" className='txt-blue'>إضافة رقم هاتف آخر </label>
            <div className={`phone-checkBox ${isChecked ? '' : 'd-none'}`}>
            
    <PhoneInput name='s_mobile' 
    labels={ar} defaultCountry='SA' dir='ltr' className='phoneInput' value={phone3}
    onChange={(phone3) => {
      setPhone3(phone3);
      getOrderData({ target: { name: 's_mobile', value: phone3} });
    }}/>
    {errorList.map((err,index)=>{
      if(err.context.label ==='s_mobile'){
        return <div key={index} className="alert alert-danger my-2">يجب ملئ جميع البيانات </div>
      }
    })}
            </div>
            </div> 
          </>):(
            <div className='pb-1'>
            <label htmlFor="">رقم الهاتف<span className="star-requered">*</span></label>
            {/* <input type="text" className="form-control" /> */}
            <PhoneInput name='s_mobile' 
labels={ar} defaultCountry='SA' dir='ltr' className='phoneInput' value={phoneValue}
onChange={(phoneValue) => {
  setItemMobile(phoneValue);
  setPhoneValue(phoneValue);
  getOrderData({ target: { name: 's_mobile', value : phoneValue } });
}}/>
{errorList.map((err,index)=>{
  if(err.context.label ==='s_mobile'){
    return <div key={index} className="alert alert-danger my-2">يجب ملئ جميع البيانات </div>
  }
  
})}
  
        </div>
          )}
          <div className='pb-1 ul-box'>
          <label htmlFor="">  الموقع(الفرع الرئيسى)<span className="star-requered">*</span></label>
              {/* <input type="text" className="form-control" name='s_city' onChange={getOrderData}/> */}
              <input type="text" className="form-control" name='s_city' onClick={openCitiesList}

                onChange={(e)=>{
                  // setItemCity(e.target.value);
                  openCitiesList();
                  const searchValue = e.target.value;
                  setSearch(searchValue);
                  getOrderData(e)
                  const matchingCities = cities.filter((item) => {
                    return searchValue === '' ? item : item.toLowerCase().includes(searchValue.toLowerCase());
                  });
              
                  // if (matchingCities.length === 0) {
                  //   closeCitiesList();
                  // } else {
                    openCitiesList();
                  // }
                  }}
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
             
              {errorList.map((err,index)=>{
    if(err.context.label ==='s_city'){
      return <div key={index} className="alert alert-danger my-2">يجب ملىء هذه الخانة </div>
    }
    
  })}
          </div>
          <div className='pb-1'>
                <label htmlFor=""> المنطقة  <span className="star-requered">*</span></label>
                <input type="text" className="form-control" name='s_prov' onChange={getOrderData}/>
                {errorList.map((err,index)=>{
      if(err.context.label ==='s_prov'){
        return <div key={index} className="alert alert-danger my-2">يجب ملىء هذه الخانة </div>
      }
      
    })}
            </div>
          <div className='pb-1'>
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
          { userData.userData.data.user.rolle === "marketer"?(
            <div className='py-1'>
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
          
          </div>
          <div className="package-info brdr-grey p-3 my-3 ">
             <h3>بيانات الشحنة</h3>
             <div className="row">
             <div className="col-md-6">
             <div className='pb-1'>
             <label htmlFor=""> الوزن<span className="star-requered">*</span></label>
             <input 
            //  type="number" step="0.001" 
             className="form-control" name='weight' onChange={getOrderData}/>
             {errorList.map((err,index)=>{
   if(err.context.label ==='weight'){
     return <div key={index} className="alert alert-danger my-2">يجب ملىء هذه الخانة </div>
   }
   
 })}
         </div>
             </div>
             <div className="col-md-6">
             <div className='pb-1'>
             <label htmlFor=""> القيمة<span className="star-requered">*</span></label>
             <input 
            //  type="number" step="0.001" 
             className="form-control" name='goodsValue' onChange={getOrderData}/>
             {errorList.map((err,index)=>{
   if(err.context.label ==='goodsValue'){
     return <div key={index} className="alert alert-danger my-2">يجب ملىء هذه الخانة </div>
   }
   
 })}
         </div>
             </div>
             <div className="pb-1">
             <label htmlFor=""> نوع الشحنة <span className="star-requered">*</span></label>
             <select name="goodsType" id=""  className="form-control" onChange={getOrderData}>
                <option value=""></option>
                <option value="ITN1">ملابس</option>
                <option value="ITN2">مستندات /وثائق</option>
                <option value="ITN3">أطعمة</option>
                <option value="ITN5">منتجات رقمية</option>
                <option value="ITN6">منتجات يومية</option>
                <option value="ITN7">منتجات قابلة للكسر</option>
                <option value="ITN4">أخرى</option>
             </select>

             </div>

             <div className="">
             
             </div>
             <div className='pb-1'>
               <label htmlFor=""> الوصف <span className="star-requered">*</span></label>
               <textarea className="form-control" name='description' onChange={getOrderData} cols="30" rows="2"></textarea>
               {errorList.map((err,index)=>{
     if(err.context.label ==='description'){
       return <div key={index} className="alert alert-danger my-2">يجب ملىء هذه الخانة </div>
     }
     
   })}
           </div>
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
            //  type="number" step="0.001" 
             className="form-control" name='cod' 
             onChange={(e)=>{getOrderData({target:{name:'cod',value:Number(e.target.value)}});
            }}             required/>
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

<div className='d-flex align-items-center pb-3'>
               <div className="checkbox" onClick={()=>{alert('سوف يكون متاح قريباً ')}}></div>
               <label className='label-cod' htmlFor="">طلب المندوب</label>
               </div>
                
     
          
          
             
             </div>
         </div>
         
         </div>
         <div className="col-md-6">
         <div className="shipper-details brdr-grey my-2 p-3">
             <h3>بيانات المستلم </h3>
             
             
         <div className='pb-1'>
             <label htmlFor=""> الاسم <span className="star-requered">*</span></label>
             <input type="text" className="form-control" name='re_name'  onChange={(e)=>{
                  setItemName2(e.target.value)
                  getOrderData(e)
                }}/>
             {errorList.map((err,index)=>{
   if(err.context.label ==='re_name'){
     return <div key={index} className="alert alert-danger my-2">يجب ملىء هذه الخانة </div>
   }
   
 })}
         </div>
        
         <div className='pb-1'>
             <label htmlFor="">رقم الهاتف<span className="star-requered">*</span></label>
             {/* <input type="text" className="form-control" /> */}
             <PhoneInput name='re_mobile' 
  labels={ar} defaultCountry='SA' dir='ltr' className='phoneInput' value={phone2}
  onChange={(phone2) => {
    setItemMobile2(phone2)
    setPhone2(phone2);
    getOrderData({ target: { name: 're_mobile', value: phone2 } });
  }}/>
            
 {errorList.map((err,index)=>{
   if(err.context.label ==='re_mobile'){
     return <div key={index} className="alert alert-danger my-2">يجب ملئ جميع البيانات </div>
   }
   
 })}
   
         </div>
         
         <div className='pb-1 ul-box'>
               <label htmlFor=""> الموقع<span className="star-requered">*</span></label>
               {/* <input type="text" className="form-control" name='re_city' onChange={getOrderData}/> */}
               <input type="text" className="form-control" name='re_city'
               onChange={(e)=>{ 
                 const searchValue = e.target.value;
                 setSearch2(searchValue);
                 getOrderData(e)
                 const matchingCities = cities.filter((item) => {
                   return searchValue === '' ? item : item.toLowerCase().includes(searchValue.toLowerCase());
                 });
             
                //  if (matchingCities.length === 0) {
                //    closeCitiesList2();
                //  } else {
                   openCitiesList2();
                //  }
                 }}
                 onClick={openCitiesList2}
                 />
                 {showCitiesList2 && (
                   <ul  className='ul-cities' ref={citiesListRef2}>
                   {cities && cities.filter((item)=>{
                   return search2 === ''? item : item.toLowerCase().includes(search2.toLowerCase());
                   }).map((item,index) =>{
                    return(
                     <li key={index} name='re_city' 
                     onClick={(e)=>{ 
                       const selectedCity = e.target.innerText;
                       getOrderData({ target: { name: 're_city', value: selectedCity } });
                       document.querySelector('input[name="re_city"]').value = selectedCity;
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
               {errorList.map((err,index)=>{
     if(err.context.label ==='re_city'){
       return <div key={index} className="alert alert-danger my-2">يجب ملىء هذه الخانة </div>
     }
     
   })}
           </div>
          {/* <div className='pb-1'>
             <label htmlFor=""> المدينة <span className="star-requered">*</span></label>
             <input type="text" className="form-control" name='c_city'  onChange={(e) => {
//   setItemName(e.target.value);
 getOrderData(e);
}}/>
             {errorList.map((err,index)=>{
   if(err.context.label ==='c_city'){
     return <div key={index} className="alert alert-danger my-2">يجب ملىء هذه الخانة </div>
   }
   
 })}
         </div> */}
         <div className='pb-1'>
             <label htmlFor=""> المنطقة <span className="star-requered">*</span></label>
             <input type="text" className="form-control" name='re_prov'  onChange={(e) => {
//   setItemName(e.target.value);
 getOrderData(e);
}}/>
             {errorList.map((err,index)=>{
   if(err.context.label ==='re_prov'){
     return <div key={index} className="alert alert-danger my-2">يجب ملىء هذه الخانة </div>
   }
   
 })}
         </div>
         <div className='pb-1'>
             <label htmlFor=""> العنوان<span className="star-requered">*</span></label>
             <input type="text" className="form-control" name='re_address'  onChange={(e)=>{
                  setItemAddress2(e.target.value)
                  getOrderData(e)
                }}/>
             {errorList.map((err,index)=>{
   if(err.context.label ==='re_address'){
     return <div key={index} className="alert alert-danger my-2">يجب ملىء هذه الخانة </div>
   }
   
 })}
         </div>
         
         
            
        
         </div>
         
         <div className="reciever-details brdr-grey mt-3 p-3">
             <h3>تفاصيل المنتج :</h3>
             {theSkuDetailList.map((piece, index) => (
     <div className='my-1' key={index}>
       <input
         type="text"
         name="englishName"
         className='form-control mb-2'
         placeholder="اسم المنتج  "
         value={piece.englishName}
         onChange={e => updateSku(index, 'englishName', e.target.value)}
       /> 
       <select name="itemType" id=""  className="form-control mb-2" 
       value={piece.itemType}
       onChange={e => updateSku(index, 'itemType', e.target.value)}>
                <option value="" >نوع المنتج</option>
                <option value="ITN1">ملابس</option>
                <option value="ITN2">مستندات /وثائق</option>
                <option value="ITN3">أطعمة</option>
                <option value="ITN5">منتجات رقمية</option>
                <option value="ITN6">منتجات يومية</option>
                <option value="ITN7">منتجات قابلة للكسر</option>
                <option value="ITN4">أخرى</option>
             </select>
       <input
         type="text"
         name="number"
         className='form-control mb-2'
         placeholder=" رقم المنتج"
         value={piece.number}
         onChange={e => updateSku(index, 'number', e.target.value)}
       />
       
       <input
        //  type="number"
         name="itemValue"
         className='form-control mb-2'
         placeholder="قيمة المنتج " 
        //  step="0.001"
         value={piece.itemValue}
         onChange={e => updateSku(index, 'itemValue', e.target.value)}
       />
       <input
         type="text"
         name="desc"
         className='form-control mb-2'
         placeholder="الوصف "
         value={piece.desc}
         onChange={e => updateSku(index, 'desc', e.target.value)}
       />
        <button className=' btn-addPiece m-2' type="button" onClick={addSku}>
        إضافة منتج اخر
     </button>
     <hr/>
     </div>
     
   ))}
         </div>
         {errorList && <div className="text-muted mx-3 my-1">يجب ملئ جميع البيانات</div> }
         <button type="submit" className="btn btn-orange mx-3 my-1" disabled={isLoading}>
            {isLoading == true?<i class="fa-solid fa-spinner fa-spin"></i>:'إضافة شحنة'}

               </button>
         {/* <button type="submit" className="btn btn-orange mx-3 my-1"> <i className='fa-solid fa-plus'></i> عمل شحنة</button> */}

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
           <th scope="col">رقم التتبع</th>
           <th scope="col">السعر</th>
             <th scope="col">id_الفاتورة</th>                
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
     <td>{item.data.data.billCode}</td>
     <td>{item.price}</td>
     {item.inovicedaftra?.id?(<td>{item.inovicedaftra.id}</td>):(<td>_</td>)} 
     <td>
       <button className="btn btn-success"  onClick={()=>{getSticker(item._id)}}>عرض الاستيكر</button>
     </td>
     {/* {item.inovicedaftra?.id?(<td><button
      
      className="btn btn-orange"
      onClick={() => getInvoice(item.inovicedaftra.id)}
    >
      عرض الفاتورة
    </button></td>):(<td>_</td>)} */}
     {/* <td>
     <div>
      <button className="btn btn-success" onClick={() => fetchPdfData(item._id)}>عرض الاستيكر</button>
      {pdfData && <PdfViewer pdfData={pdfData} />}
    </div>
</td> */}

     {/* <td>{item.data.Items[0].Barcode}</td>
     <td>{item.data.Message}</td>*/}

   </tr>
   
 );
})} 
</tbody>


      </table>
     </div>
     
 </div>
   </>
  )
}
