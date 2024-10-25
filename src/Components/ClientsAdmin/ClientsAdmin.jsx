import React, { useEffect, useState,useRef ,createRef } from 'react'
import axios from 'axios'
import EditClientModal from '../EditClientModal/EditClientModal';
import {Modal , Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css'
import ar from 'react-phone-number-input/locale/ar'

export default function ClientsAll() {
    useEffect(()=>{
        getClientsList()
      },[])

      const [showModal, setShowModal] = useState(false);
      const [depositAmount, setDepositAmount] = useState('');
      const [selectedUserId, setSelectedUserId] = useState(null);
      const [searchName, setSearchName] = useState('');
      const [searchPhone, setSearchPhone] = useState('');
      const [searchCity, setSearchCity] = useState('');
      const [searchCompany, setSearchCompany] = useState('');
      const [currentPage, setCurrentPage] = useState(Number(1));
    const [numberOfPages, setNumberOfPages] = useState(1);
    const [currentPage2, setCurrentPage2] = useState(Number(1));
    const [numberOfPages2, setNumberOfPages2] = useState(1);
    const [loading, setLoading] = useState(false);
    const [secondFilter, setSecondFilter] = useState(false);

      async function addDepositToUser() {
        try {
          const response = await axios.post(
            'https://dashboard.go-tex.net/api/user/add-credit-to-client',
            {
              clientid : selectedUserId,
              cartid_limit: depositAmount,
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('userToken')}`,
              },
            }

          );
          // Handle the response as per your requirement
          console.log(response.data);
          window.alert('الرصيد معلق حتى تتم الموافقه من قبل الادارة')
          // if (response.data.msg === 'ok') {
            closeModal2();
            getClientsList();
          // }
        } catch (error) {
          console.error(error);
          window.alert(error.response.data.msg)
        }
      }
      const openModal2 = (userId) => {
        setSelectedUserId(userId);
        setShowModal(true);
      };
    
      const closeModal2 = () => {
        setSelectedUserId(null);
        setShowModal(false);
        setDepositAmount('');
      };
      const handleDepositChange = (event) => {
        setDepositAmount(Number(event.target.value));
      };
      const [search, setSearch]= useState('')

      const[clients,setClients]=useState([])
      async function getClientsList() {
        try {
          setLoading(true);
          // const response = await axios.get('https://dashboard.go-tex.net/api/clients/get-all-clients',
          const response = await axios.get('https://dashboard.go-tex.net/api/clients/all-clients',
          {
            params: {
              page: currentPage,
              limit: 30,
              
              
            },
            headers: {
              Authorization: `Bearer ${localStorage.getItem('userToken')}`,
            },
          });
          const List = response.data.data
          setSecondFilter(false);
          console.log(List)
          setClients(List)
          console.log(response)
          setCurrentPage(response.data.pagination.currentPage);
          setNumberOfPages(response.data.pagination.numberOfPages);
        } catch (error) {
          console.error(error);
        }finally {
          setLoading(false); 
        }
      }
      async function getSearchClientsList() {
        try {
          setLoading(true);
          const response = await axios.get('https://dashboard.go-tex.net/api/clients/all-clients',
          {
            params: {
              page: 1,
              limit: 30,
              company: searchCompany,
              name: searchName,
              mobile: searchPhone,
              city:searchCity,
              
            },
            headers: {
              Authorization: `Bearer ${localStorage.getItem('userToken')}`,
            },
          });
          const List = response.data.data
          setSecondFilter(true)

          console.log(List)
          setClients(List)
          console.log(response)
          setCurrentPage2(response.data.pagination.currentPage);
          setNumberOfPages2(response.data.pagination.numberOfPages);
        } catch (error) {
          console.error(error);
        }finally {
          setLoading(false); 
        }
      }
      async function getSearchClientsPage() {
        try {
          setLoading(true);
          const response = await axios.get('https://dashboard.go-tex.net/api/clients/all-clients',
          {
            params: {
              page: currentPage2,
              limit: 30,
              company: searchCompany,
              name: searchName,
              mobile: searchPhone,
              city:searchCity,
              
            },
            headers: {
              Authorization: `Bearer ${localStorage.getItem('userToken')}`,
            },
          });
          const List = response.data.data
          setSecondFilter(true)

          console.log(List)
          setClients(List)
          console.log(response)
          setCurrentPage2(response.data.pagination.currentPage);
          setNumberOfPages2(response.data.pagination.numberOfPages);
        } catch (error) {
          console.error(error);
        }finally {
          setLoading(false); 
        }
      }
      const [isModalOpen, setIsModalOpen] = useState(false);
      
      const [editedClient, setEditedClient] = useState(null);
      const [eClient, setEClient] = useState(null);
      const [Branches, setBranches]= useState([
        {
          city:'',
          address:''
        }
      ]); 
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
  const handleEditClick = (client) => {
    setEClient(client);
    setEditedClient(
      {
        company: client?.company || '',
        first_name: client?.name || '',
        city: client?.city || '',
        state: client?.state || '', // optional
        address: client?.address || '',
        mobile: client?.mobile || '',
        // email: client?.email || '', // optional
        notes: client?.notes || '', // optional
        category: client?.category || '', // optional
        birth_date: client?.birth_date || '', // optional
        street: client?.street || '',
        branches:client?.branches || Branches ,
    }
    )
    setIsModalOpen(true);

    console.log(client)
    console.log(editedClient)
    console.log("yes")
  }
  const [selectedClientId, setSelectedClientId] = useState(null);

      const openModal = (clientId) => {
        setSelectedClientId(clientId)
        setIsModalOpen(true);
        
      };
      const closeModal = () => {
        setIsModalOpen(false);
        setEditedClient(null)
      };
      
      const [formData, setFormData] = useState({
        name: editedClient?.name || '',
      });
    // const handleInputChange = (event) => {
    //     const { name, value } = event.target;
    //     setEditedClient({ ...editedClient, [name]: value });
    //     console.log(editedClient)
    //   }
   
    const handleInputChange = (event, branchIndex) => {
      const { name, value } = event.target;
    
      if (branchIndex !== undefined) {
        setEditedClient((prev) => {
          const updatedBranches = [...prev.branches];
          const updatedBranch = { ...updatedBranches[branchIndex], [name]: value };
          updatedBranches[branchIndex] = updatedBranch;
    
          return { ...prev, branches: updatedBranches };
        });
      } else {
        setEditedClient((prev) => ({
          ...prev,
          [name]: value,
        }));
      }
    };
    
    const addBranche2 = () => {
      setEditedClient((prev) => {
        const newBranches = [
          ...prev.branches,
          {
            city: '',
            address: ''
          }
        ];
    
        return {
          ...prev,
          branches: newBranches
        };
      });
    };
    
      const handleSubmit = async (event) => {
        console.log(editedClient)
        event.preventDefault();
        try {
          const filteredBranches = editedClient.branches.filter(branch => branch.city.trim() !== '' || branch.address.trim() !== '');
          const filteredBranches2 = Branches.filter(branch => branch.city.trim() !== '' && branch.address.trim() !== '');
         
          const response = await axios.post(
            `https://dashboard.go-tex.net/api/clients/edit-client/${eClient._id}`,
            {...editedClient,
              branches: filteredBranches.length > 0 ? filteredBranches : filteredBranches2,
              // branches: editedClient.branches.length > 0 ? editedClient.branches : Branches,
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('userToken')}`,
              },
            }
          );
          console.log(editedClient)
          console.log(response);
    
          closeModal();
          window.alert("تم تعديل بيانات العميل بنجاح")
          getClientsList()
          
        } catch (error) {
          console.error(error);
          alert(error.response.data.err.message)
        }
      }     
      const [value ,setPhoneValue]=useState()

      

      const filteredClients = clients.filter((item) => {
        return (
          (searchPhone === '' || item.mobile?.includes(searchPhone)) &&
          (searchName === '' || (item.name?.includes(searchName)) )&&
          (searchCity === '' || item.city.includes(searchCity)) &&
          (searchCompany === '' || item.company?.includes(searchCompany))
         
        );
    
      });

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

        const [showModalDeposit, setShowModalDeposit] = useState(false);
      const [depositAmountDeposit, setDepositAmountDeposit] = useState('');
      const [receiptFile, setReceiptFile] = useState(null);
      const [selectedClientIdDeposit, setSelectedClientIdDeposit] = useState('');

        function handleOpenModal(clientId) {
          setSelectedClientIdDeposit(clientId);
          setShowModalDeposit(true);
        }
        async function handleDepositSubmit(e) {
          e.preventDefault();
          if (!depositAmountDeposit || isNaN(depositAmountDeposit) || !receiptFile) {
            alert('يرجى ملء جميع الحقول المطلوبة');
            return;
          }
          const depositAmountNumber = Number(depositAmountDeposit);
          const formData = new FormData();
          formData.append('deposit', depositAmountNumber);
          formData.append('recipt', receiptFile);
          formData.append('clintid', selectedClientIdDeposit);
        
          try {
            const response = await axios.post(
              'https://dashboard.go-tex.net/api/user/add-clint-deposit',
              formData,
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem('userToken')}`,
                },
              }
            );
        
            console.log(response.data);
            window.alert('تم اضافة الرصيد بنجاح')
            getClientsList()
            setShowModalDeposit(false);
          } catch (error) {
            console.error('Error while adding deposit', error);
        
          }
        }

        const handleClientOrders = (item) => {
          const OrdersData = encodeURIComponent(JSON.stringify(item));
          window.open(`/clientOrders?OrdersData=${OrdersData}`);
        };
        const handlePreviousPage = async () => {
          if (currentPage > 1) {
            setCurrentPage(currentPage - 1); 
            try {
              setLoading(true);
              const response = await axios.get('https://dashboard.go-tex.net/api/clients/all-clients',
              {
                params: {
                  page: currentPage -1,
                  limit: 30,
                  company: searchCompany,
                  name: searchName,
                  mobile: searchPhone,
                  city:searchCity,
                  
                },
                headers: {
                  Authorization: `Bearer ${localStorage.getItem('userToken')}`,
                },
              });
              const List = response.data.data
              console.log(List)
              setSecondFilter(false)
              setClients(List)
              console.log(response)
              setCurrentPage(response.data.pagination.currentPage);
              setNumberOfPages(response.data.pagination.numberOfPages);
            } catch (error) {
              console.error(error);
            }finally {
              setLoading(false); 
            }
          }
        };
        const handleNextPage = async () => {
          if (currentPage < numberOfPages) {
            setCurrentPage(currentPage + 1);
            try {
              setLoading(true);
              const response = await axios.get('https://dashboard.go-tex.net/api/clients/all-clients',
              {
                params: {
                  page: currentPage +1,
                  limit: 30,
                  company: searchCompany,
                  name: searchName,
                  mobile: searchPhone,
                  city:searchCity,
                  
                },
                headers: {
                  Authorization: `Bearer ${localStorage.getItem('userToken')}`,
                },
              });
              const List = response.data.data
              setSecondFilter(false)
              console.log(List)
              setClients(List)
              console.log(response)
              setCurrentPage(response.data.pagination.currentPage);
              setNumberOfPages(response.data.pagination.numberOfPages);
            } catch (error) {
              console.error(error);
            }finally {
              setLoading(false); 
            }
          }
        };
        const handlePreviousPage2 = async () => {
      if (currentPage2 > 1) {
        setCurrentPage2(currentPage2 - 1); 
        try {
          setLoading(true);
          const response = await axios.get('https://dashboard.go-tex.net/api/clients/all-clients',
          {
            params: {
              page: currentPage2 -1,
              limit: 30,
              company: searchCompany,
              name: searchName,
              mobile: searchPhone,
              city:searchCity,
              
            },
            headers: {
              Authorization: `Bearer ${localStorage.getItem('userToken')}`,
            },
          });
          const List = response.data.data
          console.log(List)
          setSecondFilter(true)
          setClients(List)
          console.log(response)
          setCurrentPage2(response.data.pagination.currentPage);
          setNumberOfPages2(response.data.pagination.numberOfPages);
        } catch (error) {
          console.error(error);
        }finally {
          setLoading(false); 
        }
      }
    };
    const handleNextPage2 = async () => {
      if (currentPage2 < numberOfPages2) {
        setCurrentPage2(currentPage2 + 1) 
        try {
          setLoading(true);
          const response = await axios.get('https://dashboard.go-tex.net/api/clients/all-clients',
          {
            params: {
              page: currentPage2 + 1,
              limit: 30,
              company: searchCompany,
              name: searchName,
              mobile: searchPhone,
              city:searchCity,
              
            },
            headers: {
              Authorization: `Bearer ${localStorage.getItem('userToken')}`,
            },
          });
          const List = response.data.data
          setSecondFilter(true)
          console.log(List)
          setClients(List)
          console.log(response)
          setCurrentPage2(response.data.pagination.currentPage);
          setNumberOfPages2(response.data.pagination.numberOfPages);
        } catch (error) {
          console.error(error);
        }finally {
          setLoading(false); 
        }
      }
    };
  return (
    <>
    <div className='p-5' id='content'>
    <div className="gray-table p-4 mb-4">
      <div className="row">
        
        <div className="col-md-4">
          <label htmlFor="">اسم العميل:</label>
          <input className='form-control' type="search"  onChange={(e) => setSearchName(e.target.value)} />
        </div>
        <div className="col-md-4">
          <label htmlFor="">الشركة :</label>
          <input className='form-control' type="search"  onChange={(e) => setSearchCompany(e.target.value)} />
        </div>
        
        <div className="col-md-4">
          <label htmlFor="">الهاتف:</label>
          <input className='form-control' type="search" onChange={(e) => setSearchPhone(e.target.value)} />
        </div>
        <div className="col-md-4">
          <label htmlFor="">المدينة :</label>
          <input className='form-control' type="search" onChange={(e) => setSearchCity(e.target.value)} />
        </div>
        
       
        <div className="text-center mt-3">
          <button className="btn btn-dark" onClick={getSearchClientsList}><i class="fa-solid fa-magnifying-glass"></i> بحث</button>
        </div>
      </div>
    </div>
    <div className="clients-table p-4 my-4">
    <button className="btn btn-addPiece m-1" onClick={getClientsList}>عرض جميع العملاء  </button>

      <table className="table">
        <thead>
          <tr>
            
          <th scope="col">#</th>
            <th scope="col">العميل </th>
            {/* <th scope="col">الشركة </th> */}
            <th scope="col">الهاتف </th>
            {/* <th scope="col">الايميل </th> */}
            <th scope="col">المدينة </th>
            <th scope="col">العنوان </th>
            <th scope="col">الشارع  </th>
            <th scope="col">الفروع  </th>
            <th scope="col">المحفظة </th>
            <th scope="col"> credit </th>
            {/* <th scope="col">الشحنات </th>
            <th scope="col">ملاحظات </th> */}
            {/* <th scope="col"></th>             */}
            <th scope="col"></th>            
            <th scope="col"></th>            
            <th scope="col"></th>            

           
          </tr>
        </thead>
        <tbody>
          {clients && clients.map((item,index) =>{
            return(
              <tr key={index}>
                {loading ? (
      <td>
        <i className="fa-solid fa-spinner fa-spin"></i>
      </td>
    ) : (
      <>
                <td>{index+1}</td>
                {item.name?<td>{item.name}</td>:<td>_</td>}
                {/* {item.company?<td>{item.company}</td>:<td>_</td>} */}
                {item.mobile?<td>{item.mobile} </td>:<td>_</td>}
                {/* {item.email?<td>{item.email}</td>:<td>_</td>} */}
                {item.city?<td>{item.city}</td>:<td>_</td>}
                {item.address?<td>{item.address}</td>:<td>_</td>}
                {item.street?<td>{item.street}</td>:<td>_</td>}
                 {item.branches ? (
          <td>
            {item.branches.map((branche) => (
              <span key={branche._id}>{branche.city}  {branche.address} , <br/> </span>
            ))}
          </td>
        ) : (
          <td>_</td>
        )}
                {item.wallet?<td>{item.wallet}</td>:<td>_</td>}
                {item.credit?<td>{item.credit.limet} <br/> '{item.credit.status}'</td>:<td>_</td>}
               
                 
              <td>
                <button className="btn btn-orange"
                onClick={()=>{handleClientOrders(item)}}>شحنات العميل </button>
              </td>
                 <td>
                <button
                        className='sdd-deposite btn btn-primary '
                        onClick={() => openModal2(item._id)}
                      >
                        إضافة credit 
                      </button>
              </td>
              <td>
  <button className="btn btn-dark" onClick={() => handleEditClick(item)}>تعديل</button>
</td>
{/* {item.notes?<td>{item.notes}</td>:<td>_</td>} */}
                 {/* <td>
                <button
                        className='sdd-deposite btn btn-success'
                        onClick={() => handleOpenModal(item._id)}
                        >
                        إضافة رصيد
                      </button>
              </td> */}
              </>
    )}
              </tr>
            )
          }
          )}
        </tbody>
      </table>
      {secondFilter?(
      <div>
        <button className="btn btn-dark" onClick={handlePreviousPage2} disabled={currentPage2 === 1}>
          الصفحة السابقة 
        </button>
        <span className='px-1'>
          Page {currentPage2} of {numberOfPages2}
        </span>
        <button className="btn btn-dark" onClick={handleNextPage2} disabled={currentPage2 === numberOfPages2}>
          الصفحة التالية 
        </button>
      </div>
      ):
      (
        <div>
        <button className="btn btn-dark" onClick={handlePreviousPage} disabled={currentPage === 1}>
          الصفحة السابقة 
        </button>
        <span className='px-1'>
          Page {currentPage} of {numberOfPages}
        </span>
        <button className="btn btn-dark" onClick={handleNextPage} disabled={currentPage === numberOfPages}>
          الصفحة التالية 
        </button>
      </div>
      )}
      <div>
<input className=' m-1' type="number" 

placeholder="رقم الصفحة "
onChange={(e) => setCurrentPage2(e.target.value)} />
<button className="btn btn-primary m-1" onClick={getSearchClientsPage}>
            بحث برقم الصفحة
        </button>
      </div>
     </div>
         </div>
         
         {/* <EditClientModal isOpen={isModalOpen} closeModal={closeModal} client={editedClient} /> */}
{isModalOpen && (<Modal show={isModalOpen} onHide={closeModal} >
        <Modal.Header >
          <Modal.Title>تعديل بيانات العميل
             </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
          <form onSubmit={handleSubmit}>
        {/* <input type="text" name="name" value={editedClient.name} onChange={handleInputChange} /> */}
        <div className="row">
                <div className="col-md-6 pb-1">
        <label htmlFor="first_name">الاسم   :</label>
      <input onChange={handleInputChange} value={editedClient.first_name} type="text" className='my-input my-2 form-control' name='first_name' />
      
      
    </div>
    <div className="col-md-6 pb-1">
        <label htmlFor="company"> الشركة   :</label>
      <input onChange={handleInputChange} value={editedClient.company} type="text" className='my-input my-2 form-control' name='company' />
      
    </div>
    {/* <div className="col-md-6 pb-3">
        <label htmlFor="birth_date">تاريخ الميلاد   :</label>
      <input onChange={handleInputChange} value={editedClient.name} type="date" className='my-input my-2 form-control' name='birth_date' />
      
     
    </div> */}
    <div className="col-md-6 pb-1">
    <label htmlFor="mobile">رقم الهاتف</label>
    {/* <PhoneInput name='mobile' 
    labels={ar} defaultCountry='SA' dir='ltr' className='phoneInput my-2' value={value}
    onChange={(value) => {
      setPhoneValue(value);
      handleInputChange({ target: { name: 'mobile', value } });
    }}/> */}
      <input onChange={handleInputChange} value={editedClient.mobile} type="text" className='my-input my-2 form-control' name='mobile' />
       {/* <input type="text" className="form-control" /> */}
                {/* <PhoneInput name='mobile' 
    labels={ar} defaultCountry='SA' dir='ltr' className='phoneInput my-2' value={value}
    onChange={(value) => {
      // setPhoneValue(value);
      onChange={handleInputChange}
      // getData({ target: { name: 'mobile', value } });
    }}/> */}
      
    </div>
               
    
    {/* </div> */}
    {/* <div className="col-md-6 pb-1">
        <label htmlFor="email"> الايميل  :</label>
      <input onChange={handleInputChange} value={editedClient.email} type="email" className='my-input my-2 form-control' name='email' />
      
      
    </div> */}
    <div className='col-md-6 pb-1 ul-box'>
                <label htmlFor=""> المدينة (الفرع الرئيسى)</label>

                <input type="text" className=" my-input form-control my-2" name='city' value={editedClient.city}
                onChange={(e)=>{ 
                  const searchValue = e.target.value;
                  setSearch2(searchValue);
                  handleInputChange(e)
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
                        handleInputChange({ target: { name: 'city', value: selectedCity } });
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
                 
            </div>
    
    <div className="col-md-6 pb-1">
        <label htmlFor="address">العنوان   :</label>
      <input onChange={handleInputChange} value={editedClient.address} type="text" className='my-input my-2 form-control' name='address' />
      
    </div>
    {/* <div className="col-md-6 pb-3">
        <label htmlFor="state">المنطقة   :</label>
      <input onChange={handleInputChange} value={editedClient.name} type="text" className='my-input my-2 form-control' name='state' />
      
    </div> */}
    <div className="col-md-6 pb-1">
        <label htmlFor="street">الشارع   :</label>
      <input onChange={handleInputChange} value={editedClient.street} type="text" className='my-input my-2 form-control' name='street' />
      
    </div>
    <div className="col-md-12 pb-1">
        <label htmlFor="category">الفئة   :</label>
      <input onChange={handleInputChange} value={editedClient.category} type="text" className='my-input my-2 form-control' name='category' />
      
    </div>
    {/* updateBranche(index, 'city', e.target.value); 
                    updateBranche(index, 'city', selectedCity);
*/}
{editedClient.branches.length > 0 ? (
  editedClient.branches.map((branche, index) => (
    <div className='row' key={index}>
      <div className='col-md-6 pb-3 ul-box'>
        <label htmlFor="">  فرع اخر : </label>
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
            handleInputChange(e, index)

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
                        handleInputChange({ target: { name: 'city', value: selectedCity } }, index);
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
        <label htmlFor="address">   </label>
        <input
          type="text"
          className='my-input my-2 form-control'
          name='address'
          placeholder='عنوان الفرع'
          value={branche.address}
          onChange={(e) => handleInputChange(e, index)}

        />

      </div>

      <div className="text-center">
        <button className='btn-addPiece' type="button" onClick={addBranche2}>
          إضافة فرع اخر
        </button>
      </div>
    </div>
  ))
) : (
  Branches.map((branche, index) => (
    <>
       
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
        <label htmlFor="address">   </label>
      <input type="text" className='my-input my-2 form-control' name='address' placeholder='عنوان الفرع'
      value={branche.address}
      onChange={e => updateBranche(index, 'address', e.target.value)} />
      
      
    </div>
    <div className="text-center">
    <button className=' btn-addPiece' type="button" onClick={addBranche}>
         إضافة فرع اخر
      </button>
    </div>
         
      </>
    
  ))
)}

   
      
    
     
      <div className="text-center pt-1">
      <button className='btn btn-dark'>
      تعديل  
      </button>
      </div>
      </div>
        {/* <button type="submit">Save</button> */}
      </form>  
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
          إغلاق
          </Button>
        </Modal.Footer>
      </Modal>)}
    {showModal && (
        <div className='modal' style={{ display: 'block' }}>
          <div className='modal-dialog'>
            <div className='modal-content'>
              <div className='modal-header'>
                <h5 className='modal-title'>إضافة credit </h5>
                <button
                  type='button'
                  className='close'
                  onClick={closeModal2}
                >
                  <span aria-hidden='true'>&times;</span>
                </button>
              </div>
              <div className='modal-body'>
                <div className='form-group'>
                  <label htmlFor='deposit'>السعة :</label>
                  <input
                    type='number'
                    className='form-control'
                    id='deposit'
                    value={depositAmount}
                    onChange={handleDepositChange}
                   
                  />
                </div>
              </div>
              <div className='modal-footer'>
                <button
                  type='button'
                  className='btn btn-primary'
                  onClick={addDepositToUser}
                >
                  إضافة
                </button>
                <button
                  type='button'
                  className='btn btn-secondary'
                  onClick={closeModal2}
                >
                  إلغاء
                </button>
              </div>
            </div>
          </div>
        </div>
      )}  
      {showModalDeposit && (
        <div className='add-deposit-modal-overlay' style={{ display: 'block' }}>
          <div className='add-deposit-modal-dialog'>
            <div className='add-deposit-modal-content'>
              <div className='add-deposit-modal-header'>
                <h2 className='add-deposit-modal-title'>إضافة رصيد</h2>
                <button
                  className='close'
                  onClick={() => setShowModalDeposit(false)}
                >
                  &times;
                </button>
              </div>
              <div className='add-deposit-modal-body'>
                <form onSubmit={handleDepositSubmit}>
                  <label>الرصيد:</label>
                  <input
                    type='number' className='form-control'
                    value={depositAmountDeposit}
                    onChange={(e) => setDepositAmountDeposit(Number(e.target.value))}
                  />
                  <label>الإيصال:</label> <br/>
                  <input
                    type='file'
                    onChange={(e) => setReceiptFile(e.target.files[0])}
                  /><br/>
                  <button
                    type='submit'
                    className='add-deposit-btn-primary btn btn-primary m-2'
                  >
                إضافة
                  </button>
                  <button
                    type='button'
                    className='btn btn-secondary m-2'
                    onClick={() => setShowModalDeposit(false)}
                  >
                    إلغاء
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}   
    </>
  )
}


// import React, { useEffect, useState } from 'react'
// import axios from 'axios'

// export default function ClientsAdmin() {
//     useEffect(()=>{
//         getClientsAdmin()
//       },[])
//       const [clientsAdmin,setClientsAdmin]=useState([])
//       const [searchName, setSearchName] = useState('');
//       const [searchEmail, setSearchEmail] = useState('');
//       const [searchPhone, setSearchPhone] = useState('');
//       const [searchCity, setSearchCity] = useState('');
//       const [searchID, setSearchID] = useState('');
    
//       async function getClientsAdmin() {
//         try {
//           const response = await axios.get('https://dashboard.go-tex.net/api/daftra/clients-get-all',
//           {
//             headers: {
//               Authorization: `Bearer ${localStorage.getItem('userToken')}`,
//             },
//           });
//           const clients = response.data.data;
//           console.log(clients)
//           setClientsAdmin(clients)
//         } catch (error) {
//           console.error(error);
//         }
//       }
//       const filteredClients = clientsAdmin.filter((item) => {
//         return (
//           (searchPhone === '' || item.Client?.phone1?.includes(searchPhone)) &&
//           (searchName === '' || (item.Client?.first_name?.includes(searchName)) )&&
//           (searchEmail === '' || item.Client?.email?.includes(searchEmail)) &&
//           (searchCity === '' || item.Client?.city.includes(searchCity)) &&
//           (searchID === '' || item.Client?.id?.includes(searchID))
         
//         );
    
//       });
//   return (
//     <>
//     <div className='p-5' id='content'>
//     <div className="gray-table p-4 mb-4">
//       <div className="row">
        
//         <div className="col-md-4">
//           <label htmlFor="">اسم العميل:</label>
//           <input className='form-control' type="search" value={searchName} onChange={(e) => setSearchName(e.target.value)} />
//         </div>
//         <div className="col-md-4">
//           <label htmlFor="">الايميل:</label>
//           <br/><input className='form-control' type="search" value={searchEmail} onChange={(e) => setSearchEmail(e.target.value)} />
//         </div>
//         <div className="col-md-4">
//           <label htmlFor="">الهاتف:</label>
//           <input className='form-control' type="search" value={searchPhone} onChange={(e) => setSearchPhone(e.target.value)} />
//         </div>
//         <div className="col-md-4">
//           <label htmlFor="">المدينة :</label>
//           <input className='form-control' type="search" value={searchCity} onChange={(e) => setSearchCity(e.target.value)} />
//         </div>
//         <div className="col-md-4">
//           <label htmlFor="">id_العميل :</label>
//           <input className='form-control' type="search" value={searchID} onChange={(e) => setSearchID(e.target.value)} />
//         </div>
       
//         <div className="text-center mt-3">
//           <button className="btn dark"><i class="fa-solid fa-magnifying-glass"></i> بحث</button>
//         </div>
//       </div>
//     </div>
//     <div className="clients-table p-4 my-4">
//       <table className="table">
//         <thead>
//           <tr>
//             <th scope="col">#</th>
//             <th scope="col">العميل </th>
//             <th scope="col">الهاتف </th>
//             <th scope="col">الايميل </th>
//             <th scope="col">المدينة </th>
//             <th scope="col">العنوان </th>
//             <th scope="col">عنوان اضافى </th>
//             <th scope="col">رقم العميل </th>
//             <th scope="col">id_العميل </th>
//             <th scope="col">id_الموظف </th>
            
//           </tr>
//         </thead>
//         <tbody>
//           {filteredClients && filteredClients.map((item,index) =>{
//             return(
//               <tr key={index}>
//                 <td>{index+1}</td>
//                 {item.Client?<td>{item.Client.first_name} {item.Client.last_name}</td>:<td>_</td>}
//                 {item.Client.phone1?<td>{item.Client.phone1}</td>:<td>_</td>}
//                 {item.Client.email?<td>{item.Client.email}</td>:<td>_</td>}
//                 {item.Client.city?<td>{item.Client.city}</td>:<td>_</td>}
//                 {item.Client.address1?<td>{item.Client.address1}</td>:<td>_</td>}
//                 {item.Client.address2?<td>{item.Client.address2}</td>:<td>_</td>}
//                 {item.Client.client_number?<td>{item.Client.client_number}</td>:<td>_</td>}
//                 {item.Client.id?<td>{item.Client.id}</td>:<td>_</td>}
//                 {item.Client.staff_id?<td>{item.Client.staff_id}</td>:<td>_</td>}
                
//               </tr>
//             )
//           }
//           )}
//         </tbody>
//       </table>
//      </div>
//          </div>
//     </>
//   )
// }