import React, { useEffect, useState ,useRef ,createRef} from 'react'
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css'
import ar from 'react-phone-number-input/locale/ar'
import axios from 'axios';
import Joi from 'joi';

export default function AddClientAll() {
    const [value ,setPhoneValue]=useState()

    const [errorList, seterrorList]= useState([]); 
    const [Branches, setBranches]= useState([
      {
        city:'',
        address:''
      }
    ]); 
  const [clientData,setClientData] =useState({
    company: "",
    first_name: "",
    // last_name: "",
    // email: "",
    address: "",
    city: "",
    state: "",
    street:"",
    mobile: "",
    notes: "",
    category: "",
    birth_date: "",
    branches:Branches,
  })
  const [error , setError]= useState('')
  const [isLoading, setisLoading] =useState(false)

  async function sendDataToApi() {
    console.log(localStorage.getItem('userToken'))
    try {
      const filteredBranches = Branches.filter(branch => branch.city.trim() !== '' && branch.address.trim() !== '');
      const response = await axios.post(
        "https://dashboard.go-tex.net/api/clients/add-new-client",
        {
          ...clientData,
          branches:filteredBranches
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('userToken')}`,
          },
        }
      );
  
      if (response.status === 200) {
        setisLoading(false);
        window.alert("تمت اضافة العميل بنجاح");
        console.log(response.data.data);
        const clients = response.data.data;
        console.log(clients)      
    }
        else if (response.status === 400) {
        setisLoading(false);
        const errorMessage = response.data?.msg || "An error occurred.";
        const errorMessage2 = response.data?.err?.message || " error .";
        window.alert(`${errorMessage} <br/> ${errorMessage2}`);
        console.log(response.data);
      }
    } catch (error) {
      // Handle error
      console.error(error);
      setisLoading(false);
      const errorMessage = error.response?.data?.msg || "An error occurred.";
      const errorMessage2 = error.response.data?.err?.message || "  error occcured";
      window.alert(`${errorMessage} && ${errorMessage2}`);    }
  }

function submitForm(e){
  e.preventDefault();
  setisLoading(true)
  let validation = validateForm();
  console.log(validation);
  if(validation.error){
    setisLoading(false)
    seterrorList(validation.error.details)

  }else{
    sendDataToApi();
  }

}

function getData(e) {
  let myData = { ...clientData };
  if (e.target.type === "number") { // Check if the value is a number
    myData[e.target.name] = Number(e.target.value);
  } else if (e.target.value === "true" || e.target.value === "false") {
    myData[e.target.name] = e.target.value === "true";
  } else {
    if (e.target.name === "mobile") {
        const phoneNumber = e.target.value ? e.target.value.replace(/\+/g, '') : '';
        myData[e.target.name] = phoneNumber;
      } else {
        myData[e.target.name] = e.target.value;
      }  }

  setClientData(myData);
  console.log(myData);
}

  
  function validateForm(){
    const branchesSchema = Joi.object({
      city: Joi.string().allow(null, ''),
      address: Joi.string().allow(null, ''),
  });
    let scheme= Joi.object({
        first_name:Joi.string().required(),
        // last_name:Joi.string().required(),
        company:Joi.string().required(),
        // email:Joi.string().email({ tlds: { allow: ['com', 'net','lol'] }}).allow(null, ''),
        mobile:Joi.string().required(),
        city:Joi.string().required(),
        address:Joi.string().required(),
        state:Joi.string().allow(null, ''),
        street:Joi.string().required(),
        category:Joi.string().allow(null, ''),
        notes:Joi.string().allow(null, ''),
        birth_date:Joi.date().allow(null, ''),  
        branches: Joi.array().items(branchesSchema),
     
    });
    return scheme.validate(clientData, {abortEarly:false});
  } 

  function addBranche() {
    setBranches(prevBranches => [
      ...prevBranches,
      {
        city: '',
        address: ''
      }
    ]);
  }

  function updateBranche(index, field, value) {
    const updatedBranches = [...Branches];
    updatedBranches[index][field] = value;
    setBranches(updatedBranches);
  }

  function handleCityInputChange(e, index) {
    const searchValue = e.target.value;
    setSearch2(searchValue);
    getData(e);
    const matchingCities = cities.filter((item) => {
      return searchValue === '' ? item : item.toLowerCase().includes(searchValue.toLowerCase());
    });
  
    if (matchingCities.length === 0) {
      closeCitiesList2();
    } else {
      openCitiesList2();
    }
  
    // Update the 'city' field in the 'branche' object
    updateBranche(index, 'city', e.target.value);
  }
  
  const cities =[ "Ad Dilam",
      "Ad Diriyah",
      "Afif",
      "Afifh",
      "Al Aarid",
      "Al Aflag",
      "Al Aflaj",
      "Al Ahmar",
      "Al Amaaria",
      "Al Badayea",
      "Al Bijadyah",
      "Al Bir",
      "Al Bukayriyah",
      "Al Dhahreyah",
      "Al Dheelah",
      "Al Dulaymiyah",
      "Al Duwadimi",
      "Al Fawwarah",
      "Al Ghnamiah",
      "Al Hariq",
      "Al Hayathem",
      "Al Janadriyyah",
      "Al Jubaylah",
      "Al Khabra",
      "Al Kharma Al Shimaliah",
      "Al Mansourah",
      "Al Mashael",
      "Al Muzahimiyah",
      "Al Petra",
      "Al Qarinah",
      "Al Qasab",
      "Al Qirawan",
      "Al Qurainah",
      "Al Quwaiiyah",
      "Al Quwarah",
      "Al Umjiah",
      "Al Uyaynah",
      "Al-Badie Al-Shamali",
      "Al-Fuwayliq",
      "Al-Kharj",
      "AlMu'tadil",
      "Almuzayri",
      "Ammaria",
      "An Nabhaniyah",
      "Ar Rass",
      "Ar Rayn",
      "Ar Ruwaidah",
      "arja",
      "As Sulayyil","As Suwaidi",
      "Ash Shifa",
      "Ash Shu'ara",
      "At Tuwalah",
      "Ath Thumamah Village",
      "Banban",
      "Da'a",
      "Dariyah",
      "Dhurma",
      "Duhknah",
      "Dulay Rasheed",
      "Hareeq",
      "Howtat Bani Tamim",
      "Huraymila",
      "Jubaila",
      "Kalakh Dam",
      "Khairan",
      "Malham",
      "Maraghan",
      "Marat",
      "Mubhel",
      "Naajan",
      "Nifi",
      "Nubayha",
      "Qusaiba",
      "Rafaya Al Jemsh",
      "Riyadh",
      "Riyadh Al Khabra",
      "Rumah",
      "Sajir",
      "Salbookh",
      "Salbukh",
      "Shaqra",
      "Subaih",
      "Thadiq",
      "Tharamda",
      "Thebea",
      "Tumair",
      "Uglat Asugour",
      "Umm al Jamajim",
      "Ushaiqer",
      "Wadi al Dawasir",
      "Abu Hadriyah",
      "Airj",
      "Al Awamiyah",
      "Al Aziziyah",
      "Al Badiyah",
      "Al Batha",
      "Al Fadiliyah",
      "Al Hassa",  "Al Hinnah",
        "Al Hofuf",  "Al Husayy",  "Al Jubail", 
         "Al Khobar",  "Al Khushaybi",  "Al Markuz",  
         "Al Mubarraz",  "Al Nuzha",  "Al Oyun",  "Al Oyun Hofuf",
           "Al Qatif",  "Al Qulayyib",  "Al Taraf",  "Al Tarf",  "Al Thawn",
             "Al Umran",  "Al Wannan",  "Al Wozeyh",  "AlKhhafah",  
             "Almazrooa 2nd",  "Anak",  "As Sadawi",  "As Salmanyah",
               "As Sarrar",  "As Sihaf",  "Ash Shu'bah",  "At Timyat",
                 "Ath Thybiyah",  "Az Zahrah",  "Az Zughayn",  "Buqayq", 
                  "Dammam",  "Dhahran",  "Ghanwa",  "Hanidh",  "Harad",  
                  "Haradh",  "Hawiyah",  "Ibn Shuraym",  "Juatha",  "Judah",  "Julayjilah",
        "Khafji",  "Manifah",  "Mighati",  "Mulayjah",  "Nairyah",  "Nisab", 
         "Nita","Qaryat Al Ulya",
         "Rahima",
         "Ras Al Khair",
         "Ras Tanura",
         "Rawdat Habbas",
         "Safwa",
         "Saihat",
         "Salasil",
         "Salwa",
         "Satorp",
         "Shedgum Gas Plant",
         "Shifiyah",
         "Tanajib",
         "Tarout",
         "Thaj",
         "Udhailiyah",
         "Udhailiyah Hofuf",
         "Utayiq",
         "Uthmaniyah",
         "Zibala",
         "Abu Ajram",
         "Al Ajfar",
         "Al Amar",
         "Al Ammar",
         "Al Artawiyah",
         "Al Asyah",
         "Al Atheeb",
         "Al Bad",
         "Al Butayn",
         "Al Gayal",
         "Al Ghat",
         "Al Ghazalah",
         "Al Hadithah",
         "Al Hait",
         "Al Hufayr",
         "Al Hulayfah As Sufla",
         "Al JABRIYAH",
         "Al Jihfah",
         "Al Jouf",
         "Al Jumaymah",
         "Al Khitah",
         "Al Khuffiyah",
         "Al Khuraytah",
         "Al Khuzama",
         "Al Laqayit",
         "Al Lsawiyah",
         "Al Majmaah",
         "Al Majma'ah",
         "Al Mayyah",
         "Al Mithnab","Al Mudayyih",
         "Al Muhammadiyah D",
         "Al Mukaily",
         "Al Muwaileh",
         "Al Qaid",
         "Al Qaisumah",
         "Al Qalibah",
         "Al Qarah",
         "Al Qurayyat",
         "Al Rafaeya'a",
         "Al Ula",
         "Al Uwayqilah",
         "Al Wajh",
         "Al-Nasfah",
         "Al-Nasifa",
         "Alsharaf",
         "Amaaer Ben Sana'a",
         "An Nabk Abu Qasr",
         "An Nazayim",
         "Ar Rafi'ah",
         "Ar Rawdah",
         "Arar",
         "Artawiah",
         "As Sam'uriyah",
         "As Sulubiayh",
         "Asbtar",
         "Ash Shamli",
         "Ash Sharaf",
         "Ash Shimasiyah",
         "Ash Shinan",
         "Ash Shuqayq",
         "Ath Thamiriyah",
         "Ayn Ibn Fuhayd",
         "Az Zulfi",
         "Bada",
         "Baqaa",
         "Barzan",
         "Bir ibn Harmas",
         "Bir Ibn Hirmas",
         "Buraydah",
         "Duba",
         "DUBAY'AH",
         "Dulayhan",
         "Dumah Al Jandal",
         "Feyadh Tabrjal",
         "Ghaf Al Jawa",
         "Hadban",
         "HADCO-Almarai",
         "Hafar Al Batin",
         "Hail","Halat Ammar",
         "Haql",
         "Hautat Sudair",
         "Hazem Aljalamid",
         "Hedeb",
         "Ithrah",
         "Jalajil",
         "Jibal Khuraibah",
         "Jubbah",
         "King Khalid Military City",
         "Magna",
         "Mawqaq",
         "Meegowa",
         "Mogayra",
         "Mudarraj",
         "Mulayh",
         "Munifah",
         "Qassim",
         "Qina",
         "Qiyal",
         "Qlayyb Khedr",
         "Qufar",
         "Radifah",
         "Rafha",
         "Raudat Sudair",
         "Rawdat Al Hisu",
         "Rawdat Sudair",
         "Sadyan",
         "Sakaka",
         "Saqf",
         "Shari",
         "Sharma",
         "Shiqri",
         "Sude'a",
         "Sumaira'a",
         "Suwayr",
         "Tabarjal",
         "Tabuk",
         "Tayma",
         "Thumair",
         "Trubah",
         "Tubarjal",
         "Turaif",
         "Umm Al Jamajm",
         "Umm Hazim",
         "Unayzah",
         "Uthal",
         "Uyun Al Jawa",
         "Zalom",
         "Abha","Abu Arish",
         "Abu Muloh",
         "Ad Darb",
         "Addayer",
         "Adham",
         "Ahad Al Masarihah",
         "Ahad Rafidah",
         "Al Ama ir",
         "Al Amoah",
         "Al Aqiq",
         "Al Aridhah",
         "Al Atawilah",
         "Al Bahah",
         "Al Baheem",
         "Al Birk",
         "Al Dhabyah",
         "Al Edabi",
         "Al Farshah",
         "Al Gafrat",
         "Al Habala",
         "Al Hadror",
         "Al Hajrah",
         "Al Harajah",
         "Al Hazmi",
         "Al Hifah",
         "Al Husayniyah",
         "Al Jaizah",
         "Al Jaradiyah",
         "Al Jifah",
         "Al Karbus",
         "Al Khaniq",
         "Al Khashabiyah",
         "Al Lith",
         "Al Madaya",
         "Al Makhwah",
         "Al Marooj",
         "Al Mishaliah",
         "Al Mozvin",
         "Al Mubarakah",
         "Al Namas",
         "Al Qahma",
         "Al Qeddeh",
         "Al Qunfudhah",
         "Al Rafaie",
         "Al Salamah",
         "Al Shatt",
         "Al Sheqiqah",
         "Al Shuqaiq",
         "Al Soudah",
         "Al Theniah","Al Turshiah",
         "Al Tuwal",
         "Al Uferiah",
         "Al Wadeen",
         "Al Wurud",
         "Algayed",
         "Alkhazzan",
         "Almahalah",
         "Almajaridah",
         "Almandaq",
         "Al-Matan",
         "Almuzaylif",
         "Alnajameiah",
         "Alsilaa",
         "Amaq",
         "An Nuzhah",
         "Arman",
         "As Safa",
         "Bahr Abu Sukaynah",
         "Baish",
         "Baljurashi",
         "Bani Malik",
         "Bariq",
         "Baynah",
         "Biljurashi",
         "Billasmar",
         "Bir Askar",
         "Bish",
         "Bisha",
         "Bishah",
         "Dahu",
         "Damad",
         "Dhahran Al Janoob",
         "Dhahran Al Janub",
         "Farasan Island",
         "Fayfa",
         "Gaabah",
         "Hajrah",
         "Harub",
         "Hubuna",
         "Hullatal Ahwass",
         "Jarab",
         "Jazan",
         "Jazan Economic City",
         "Jazirah",
         "Karra",
         "Khamis Mushait",
         "Khamis Mutair",
         "Khbash",
         "Lahumah","Mahalah",
         "Majzuah",
         "Mehr Bisha Center",
         "Mijannah",
         "Mizhirah",
         "Mojour",
         "Mu fija",
         "Muhayil",
         "Najran",
         "Nakhal",
         "Namerah",
         "Qana",
         "Qilwah",
         "Ranyah",
         "Rijal Alma",
         "Rojal",
         "Ruqayqah",
         "Sabt Al Alayah",
         "Sabya",
         "Samtah",
         "Sarat Abidah",
         "Sharorah",
         "Sittr AlLihyani",
         "Tabalah",
         "Tamniah",
         "Tanomah",
         "Tarqush",
         "Tathleeth",
         "Tendaha",
         "Tereeb",
         "Thar",
         "Umm Rahta",
         "Waaer",
         "Wadi Bishah",
         "Wadi Ibn Hashbal",
         "Zawral Harith",
         "Abiyar Al Mashi",
         "Abu Markha",
         "Ad Dumayriyah",
         "Airpot",
         "Al Akhal",
         "Al Arbaeen",
         "Al Aziziyah",
         "Al Basatin",
         "Al Harara",
         "Al Henakiyah",
         "Al Heno",
         "Al Jerisiyah",
         "Al Jumum",
         "Al Juranah","Al Kamil",
         "Al Khurma",
         "Al Lahien",
         "Al Mabuth",
         "Al Mindassah",
         "Al Mulaylih",
         "Al Muwayh",
         "Al Nabah",
         "Al Nagaf",
         "Al Qrahin",
         "Al Rathaya",
         "Al Rawabi",
         "Al Rehab",
         "Al Shegrah",
         "Al Shlayil",
         "Al Sir",
         "Al Thamad",
         "Al Torkiyah",
         "Al Yutamah",
         "Alhada",
         "Almojermah Village",
         "An Nawwariyyah",
         "Ar rayis",
         "Arafa",
         "As Sail Al Kabeer",
         "As Sayl as Saghir",
         "As Sudayrah",
         "Asfan",
         "Ash Shafa",
         "Ashayrah",
         "Asuwayq",
         "Ateef",
         "Badr",
         "Bahrah",
         "Bryman",
         "Dahaban",
         "Dhalm",
         "Heelan Village",
         "Husayniyah",
         "Industrial Area",
         "Isharah",
         "Jeddah",
         "Khaybar",
         "Khulais",
         "Macca",
         "Mahd Al Thahab",
         "Mastorah",
         
         "Medina",
         "New Muwayh",
         "Nimran",
         "Qia",
         "Rabigh",
         "Shoaiba",
         "Shoqsan",
         "Taiba",
         "Taif",
         "Thuwal",
         "Turbah",
         "Umluj",
         "Umm Aldoom",
         "Urwah",
         "Ushayrah",
         "Wadi Al Fora'a",
         "Wadi Reem",
         "Yanbu"]
         const [search2, setSearch2]= useState('')
         const [showCitiesList2, setCitiesList2] = useState(false);
      const openCitiesList2 = () => {
        setCitiesList2(true);
      };
    
      const closeCitiesList2 = () => {
        setCitiesList2(false);
      };
      const citiesListRef2 = useRef(null);
        useEffect(() => {
          const handleOutsideClick = (e) => {
            if (
              citiesListRef2.current &&
              !citiesListRef2.current.contains(e.target) &&
              e.target.getAttribute('name') !== 'city'
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

const [showCitiesList, setShowCitiesList] = useState(Array(Branches.length).fill(false));
const [searchCities, setSearchCities] = useState(Array(Branches.length).fill(''));
const citiesListRef = useRef(Array(Branches.length).map(() => createRef()));

const openCitiesList = (index) => {
  setShowCitiesList((prev) => {
    const newState = [...prev];
    newState[index] = true;
    return newState;
  });
};

const closeCitiesList = (index) => {
  setShowCitiesList((prev) => {
    const newState = [...prev];
    newState[index] = false;
    return newState;
  });
};


  return (
    <>
    <div className='p-4' id='content'>
        <div className="shipmenForm marginForm">
        <form onSubmit={submitForm} className='my-3' action="">
            <div className="row">
                <div className="col-md-6 pb-3">
        <label htmlFor="first_name">الاسم  :<span className="star-requered">*</span></label>
      <input onChange={getData} type="text" className='my-input my-2 form-control' name='first_name' />
      
      {errorList.map((err,index)=>{
      if(err.context.label ==='first_name'){
        return <div key={index} className="alert alert-danger my-2">يجب ملئ جميع البيانات </div>
      }
      
    })}
    </div>
    {/* <div className="col-md-6 pb-3">
        <label htmlFor="last_name">اسم العائلة   :<span className="star-requered">*</span></label>
      <input onChange={getData} type="text" className='my-input my-2 form-control' name='last_name' />
      
      {errorList.map((err,index)=>{
      if(err.context.label ==='last_name'){
        return <div key={index} className="alert alert-danger my-2">يجب ملئ جميع البيانات </div>
      }
      
    })}
    </div> */}
    <div className="col-md-6 pb-3">
        <label htmlFor="company"> الشركة   :<span className="star-requered">*</span></label>
      <input onChange={getData} type="text" className='my-input my-2 form-control' name='company' />
      
      {errorList.map((err,index)=>{
      if(err.context.label ==='company'){
        return <div key={index} className="alert alert-danger my-2">يجب ملئ جميع البيانات </div>
      }
      
    })}
    </div>
    <div className="col-md-6 pb-3">
    <label htmlFor="mobile">رقم الهاتف: <span className="star-requered">*</span></label>
                {/* <input type="text" className="form-control" /> */}
                <PhoneInput name='mobile' 
    labels={ar} defaultCountry='SA' dir='ltr' className='phoneInput my-2' value={value}
    onChange={(value) => {
      setPhoneValue(value);
      getData({ target: { name: 'mobile', value } });
    }}/>
    {errorList.map((err,index)=>{
      if(err.context.label ==='mobile'){
        return <div key={index} className="alert alert-danger my-2">يجب ملئ جميع البيانات </div>
      }
      
    })}
    </div>
    {/* <div className="col-md-6 pb-3">
        <label htmlFor="email"> الايميل  :<span className="star-requered"> </span></label>
      <input onChange={getData} type="text" className='my-input my-2 form-control' name='email' />
      
      {errorList.map((err,index)=>{
      if(err.context.label ==='email'){
        return <div key={index} className="alert alert-danger my-2">يجب ملئ جميع البيانات </div>
      }
      
    })}
    </div> */}
    <div className="col-md-6 pb-3">
        <label htmlFor="birth_date">تاريخ الميلاد   :<span className="star-requered"> </span></label>
      <input onChange={getData} type="date" className='my-input my-2 form-control' name='birth_date' />
      
      {errorList.map((err,index)=>{
      if(err.context.label ==='birth_date'){
        return <div key={index} className="alert alert-danger my-2">يجب ملئ جميع البيانات </div>
      }
      
    })}
    </div>
    <div className='col-md-6 pb-3 ul-box'>
                <label htmlFor=""> المدينة (الفرع الرئيسى) : <span className="star-requered">*</span></label>
                <input type="text" className="form-control my-2" name='city'
                onChange={(e)=>{ 
                  const searchValue = e.target.value;
                  setSearch2(searchValue);
                  getData(e)
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
                      <li key={index} name='city' 
                      onClick={(e)=>{ 
                        const selectedCity = e.target.innerText;
                        getData({ target: { name: 'city', value: selectedCity } });
                        document.querySelector('input[name="city"]').value = selectedCity;
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
      if(err.context.label ==='city'){
        return <div key={index} className="alert alert-danger my-2">يجب ملىء هذه الخانة </div>
      }
      
    })}
            </div>
    <div className="col-md-6 pb-3">
        <label htmlFor="state">المنطقة   :<span className="star-requered">*</span></label>
      <input onChange={getData} type="text" className='my-input my-2 form-control' name='state' />
      
      {errorList.map((err,index)=>{
      if(err.context.label ==='state'){
        return <div key={index} className="alert alert-danger my-2">يجب ملئ جميع البيانات </div>
      }
      
    })}
    </div>
    
    <div className="col-md-6 pb-3">
        <label htmlFor="address">العنوان   :<span className="star-requered">*</span></label>
      <input onChange={getData} type="text" className='my-input my-2 form-control' name='address' />
      
      {errorList.map((err,index)=>{
      if(err.context.label ==='address'){
        return <div key={index} className="alert alert-danger my-2">يجب ملئ جميع البيانات </div>
      }
      
    })}
    </div>
    <div className="col-md-6 pb-3">
        <label htmlFor="street">الشارع   :<span className="star-requered">*</span></label>
      <input onChange={getData} type="text" className='my-input my-2 form-control' name='street' />
      
      {errorList.map((err,index)=>{
      if(err.context.label ==='street'){
        return <div key={index} className="alert alert-danger my-2">يجب ملئ جميع البيانات </div>
      }
      
    })}
    </div>
    {/* <div className="col-md-6 pb-3">
        <label htmlFor="category">الفئة   :<span className="star-requered"> </span></label>
      <input onChange={getData} type="text" className='my-input my-2 form-control' name='category' />
      
      {errorList.map((err,index)=>{
      if(err.context.label ==='category'){
        return <div key={index} className="alert alert-danger my-2">يجب ملئ جميع البيانات </div>
      }
      
    })}
    </div> */}
    {/* <div className="col-md-6 pb-3">
        <label htmlFor="notes">ملاحظات   :<span className="star-requered"> </span></label>
        <textarea className="form-control my-2" name='notes' onChange={getData} cols="70" rows="1"></textarea>
                {errorList.map((err,index)=>{
      if(err.context.label ==='notes'){
        return <div key={index} className="alert alert-danger my-2">يجب ملىء هذه الخانة </div>
      }
      
    })}
    </div>  */}
    {Branches.map((branche, index) => (
      <>
       
         {/* <div className='col-md-6 pb-3 ul-box'>
                <label htmlFor=""> اضافة فرع اخر  : </label>
                <input
        type="text"
        className="form-control my-2"
        name='city'
        placeholder='المدينة'
        value={branche.city}
        onChange={(e) => updateBranche(index, 'city', e.target.value)}
      />
            </div> */}
         <div className='col-md-6 pb-3 ul-box' key={index}>
    <label htmlFor=""> اضافة فرع اخر : </label>
    
<input
  type="text"
  className="form-control my-2"
  name='city'
  placeholder='المدينة'
  value={branche.city}
  onChange={(e) => {
    const searchValue = e.target.value;
    setSearchCities((prevSearchCities) => {
      const updatedSearchCities = [...prevSearchCities];
      updatedSearchCities[index] = searchValue;
      return updatedSearchCities;
    });

    updateBranche(index, 'city', e.target.value);

    const matchingCities = cities.filter((item) => {
      return searchValue === '' ? item : item.toLowerCase().includes(searchValue.toLowerCase());
    });

    if (matchingCities.length === 0) {
      closeCitiesList(index);
    } else {
      openCitiesList(index);
    }
  }}
  onClick={() => openCitiesList(index)}
/>

{showCitiesList[index] && (
  <div>
    <ul className='ul-cities'>
      {cities &&
        cities
          .filter((item) => {
            const lowercasedItem = item.toLowerCase();
            const lowercasedSearchValue = (searchCities[index] || '').toLowerCase();
            return lowercasedItem.includes(lowercasedSearchValue);
          })
          .map((item, cityIndex) => (
            <li
              key={cityIndex}
              name='city'
              onClick={(e) => {
                const selectedCity = e.target.innerText;
                updateBranche(index, 'city', selectedCity);
                closeCitiesList(index);
              }}
            >
              {item}
            </li>
          ))}
    </ul>
    <div onClick={() => closeCitiesList(index)} style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }} />
  </div>
)}


  
  </div>   
    
    <div className="col-md-6 pb-3">
        <label htmlFor="address" className='invisible'>  .</label>
      <input type="text" className='my-input my-2 form-control' name='address' placeholder='عنوان الفرع'
      value={branche.address}
      onChange={e => updateBranche(index, 'address', e.target.value)} />
      
      {errorList.map((err,index)=>{
      if(err.context.label ==='address'){
        return <div key={index} className="alert alert-danger my-2">يجب ملئ جميع البيانات </div>
      }
      
    })}
    </div>
    <div className="text-center">
    <button className=' btn-addPiece' type="button" onClick={addBranche}>
         إضافة فرع اخر
      </button>
    </div>
         
      </>
      
    ))}
      
    
     
      <div className="text-center pt-2">
      <button className='btn btn-dark my-2'>
      إضافة عميل 
      </button>
      </div>
      </div>
     </form>
        </div>
        </div>

</>
  )
}