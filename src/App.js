import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Home from './Components/Home/Home';
import Layout from './Components/Layout/Layout';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import Companies from './Components/Companies/Companies';
import Clients from './Components/Clients/Clients';
import AddClient from './Components/AddClient/AddClient';
import Payment from './Components/Payment/Payment';
import Shipments from './Components/Shipments/Shipments';
import ShipmentForms from './Components/ShipmentForms/ShipmentForms';
import Admin from './Components/Admin/Admin';
import GltShipments from './Components/GltShipments/GltShipments';
import RegisterForm from './Components/RegisterForm/RegisterForm';
import { useEffect } from 'react';
import { useState } from 'react';
import jwtDecode from 'jwt-decode';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import SaeeShipments from './Components/SaeeShipments/SaeeShipments';
import SaeeSticker from './Components/SaeeSticker/SaeeSticker';
import CompaniesAdmin from './Components/CompaniesAdmin/CompaniesAdmin';
import SaeeEdit from './Components/SaeeEdit/SaeeEdit';
import GltEdit from './Components/GltEdit/GltEdit';
import GltOrdersShipment from './Components/GltOrdersShipment/GltOrdersShipment';
import ClientsAdmin from './Components/ClientsAdmin/ClientsAdmin';
import UsersListAdmin from './Components/UsersListAdmin/UsersListAdmin';
import AddDepositAdmin from './Components/AddDepositAdmin/AddDepositAdmin';
import AramexShippments from './Components/AramexShipments/AramexShippments';
import AramexEdit from './Components/AramexEdit/AramexEdit';
import MarketerSignUp from './Components/MarketerSignUp/MarketerSignUp';
import EmailTemplate from './Components/EmailTemplate/EmailTemplate';
import SmsaEdit from './Components/SmsaEdit/SmsaEdit';
import SmsaShippments from './Components/SmsaShippments/SmsaShippments';
import VerifyUser from './Components/VerifyUser/VerifyUser';
import PageNotFound from './Components/PageNotFound/PageNotFound';
import ErrorBoundary from './Components/ErrorBoundary';
import AnwanEdit from './Components/AnwanEdit/AnwanEdit';
import AnwanShippments from './Components/AnwanShippments/AnwanShippments';
import InviteLink from './Components/InviteLink/InviteLink';
import InvitedSignUp from './Components/InvitedSignUp/InvitedSignUp';
import InvitedWaiting from './Components/InvitedWaiting/InvitedWaiting';
import { useNavigate } from 'react-router-dom'
import NavAdmin from './Components/NavAdmin/NavAdmin';
import ForgetPassword from './Components/ForgetPassword/ForgetPassword';
import UpdatePassword from './Components/UpdatePassword/UpdatePassword';
import ShipmentsAdmin from './Components/ShipmentsAdmin/ShipmentsAdmin';
import AddClientMarketer from './Components/AddClientMarketer/AddClientMarketer';
import DisplayClientsMarkter from './Components/DisplayClientsMarkter/DisplayClientsMarkter';
import SplShippments from './Components/SplShippments/SplShippments';
import SplSticker from './Components/SplSticker/SplSticker';
import SplStickerPreview from './Components/SplStickerPreview/SplStickerPreview';
import SplEdit from './Components/SplEdit/SplEdit';
import DaftraStaff from './Components/DaftraStaff/DaftraStaff';
import MArketerAddClient from './Components/MArketerAddClient/MArketerAddClient';
import MarketerClients from './Components/MarketerClients/MarketerClients';
import LayoutAdmin from './Components/LayoutAdmin/LayoutAdmin';
import axios from 'axios';
import InvocesAdmin from './Components/InvocesAdmin/InvocesAdmin';
import InvocesMarkter from './Components/InvocesMarkter/InvocesMarkter';
import ClientsCreditAdmin from './Components/ClientsCreditAdmin/ClientsCreditAdmin';
import MarketerEditClient from './Components/MarketerEditClient/MarketerEditClient';
import ImileEdit from './Components/ImileEdit/ImileEdit';
import ImileAddClient from './Components/ImileAddClient/ImileAddClient';
import ImileClients from './Components/ImileClients/ImileClients';
import ImileShippments from './Components/ImileShippments/ImileShippments';
import JtEdit from './Components/JtEdit/JtEdit';
import JtShippments from './Components/JtShippments/JtShippments';
import PaymentOrders from './Components/PaymentOrders/PaymentOrders';
import AddClientAll from './Components/AddClientAll/AddClientAll';
import ClientsAll from './Components/ClientsAll/ClientsAll';
import EditClientModal from './Components/EditClientModal/EditClientModal';
import Packeges from './Components/Packeges/Packeges';
import SignupMarketers from './Components/SignupMarketers/SignupMarketers';
import MarketersAdmin from './Components/MarketersAdmin/MarketersAdmin';
import ClientsAmarketers from './Components/Clients&marketers/ClientsAmarketers';
import AdminSearchShipments from './Components/AdminSearchShipments/AdminSearchShipments';
import LoginMarketers from './Components/LoginMarketers/LoginMarketers';
import MarketersShipments from './Components/MarketersShipments/MarketersShipments';
import LayoutMarketers from './Components/LayoutMarketers/LayoutMarketers';
import PackegesAdmin from './Components/PackegesAdmin/PackegesAdmin';
import PackageDetails from './Components/PackageDetails/PackageDetails';
import PackegesMarketers from './Components/PackegesMarketers/PackegesMarketers';
import ClientOrders from './Components/ClientOrders/ClientOrders';
import GenerateLinkPayment from './Components/GenerateLinkPayment/GenerateLinkPayment';
import FormPayment from './Components/FormPayment/FormPayment';
import ActivateUser from './Components/ActivateUser/ActivateUser';
import MarketersClients from './Components/MarketersClients/MarketersClients';
import MarketerGenerateLink from './Components/MarketerGenerateLink/MarketerGenerateLink';
import RegisterClient from './Components/RegisterClient/RegisterClient';

function App() {
  
  useEffect(()=>{
    if(localStorage.getItem('userToken') !== null){
      saveUserData();
    }
  },[])

  const [userData, setuserData] = useState(null)

  async function saveUserData(){
    let encodedToken =localStorage.getItem('userToken')
    let decodedToken = jwtDecode(encodedToken);
    console.log(decodedToken);
    setuserData(decodedToken)
    console.log(userData)
  }
  const [marketerData, setmarketerData] = useState(null)

  async function saveMarketerData(){
    let encodedToken =localStorage.getItem('marketerToken')
    let decodedToken = jwtDecode(encodedToken);
    console.log(decodedToken);
    setmarketerData(decodedToken)
    console.log(marketerData)
  }
  useEffect(() => {
    const timeout = setTimeout(() => {
      window.alert('الجلسة انتهت..قم بتسجيل الدخول مرة اخرى');
      
      // if(localStorage.getItem('userToken') !== null){
        window.location.href = '/';
        localStorage.removeItem('userToken');
        setuserData(null);
      // }else{
        // window.location.href = '/loginMarketers';
        localStorage.removeItem('marketerToken');
        setmarketerData(null)
      // }
    }, 60 * 60 * 1000); // 1 hour in milliseconds

    return () => clearTimeout(timeout);
  }, [userData,marketerData]);
  
 

  let routers =createBrowserRouter([
    {index:true,element:<Login saveUserData={saveUserData} setuserData={setuserData} userData={userData}/>},
    {path:'register',element:<RegisterForm setuserData={setuserData} userData={userData} />},
    {path:'marketerSignUp',element:<MarketerSignUp/>},
    {path:'signupMarketers',element:<SignupMarketers/>},
    {path:'loginMarketers',element:<LoginMarketers saveMarketerData={saveMarketerData}/>},
    {path:'registerClient/:mCode',element:<RegisterClient/>},
    // {path:'marketersShipments',element:<MarketersShipments/>},
    {path:'clientOrders',element:<ErrorBoundary><ClientOrders userData={userData}/></ErrorBoundary>},
    {path:'splSticker',element:<SplSticker/>},
    {path:'splStickerPreview',element:<SplStickerPreview/>},
    {path:'invitedSignUp',element:<InvitedSignUp/>},
    {path:'forgetPassword',element:<ForgetPassword/>},
    {path:'updatePassword/:x',element:<UpdatePassword/>},
    {path:'user/activate-user/:code/:id',element:<ActivateUser/>},
    {path:'formPayment/:uId/:cId/:cN',element:<FormPayment/>},
    {path:'/packeges',element:<ErrorBoundary><ProtectedRoute userData={userData}><Packeges userData={userData}/></ProtectedRoute></ErrorBoundary>},
    {path:'verifyUser',element:<ErrorBoundary><VerifyUser/></ErrorBoundary>},
    {path:'nav',element:<ProtectedRoute><NavAdmin setuserData={setuserData} userData={userData}/></ProtectedRoute>},
    // {path:'admin',element:<ProtectedRoute userData={userData}><Admin/></ProtectedRoute>},
       {path:'/',element:<Layout setuserData={setuserData} userData={userData}/> ,children:[
      // {path:'home',element:<ProtectedRoute userData={userData}><Home /></ProtectedRoute> },
      {path:'/companies',element:<ErrorBoundary><Companies userData={userData}/></ErrorBoundary>},
      {path:'/inviteLink',element:<ErrorBoundary><InviteLink userData={userData}/></ErrorBoundary>},
      {path:'/addClientMarketer',element:<ErrorBoundary><AddClientMarketer userData={userData}/></ErrorBoundary>},
      {path:'/displayClientsMarkter',element:<ErrorBoundary><DisplayClientsMarkter userData={userData}/></ErrorBoundary>},
      {path:'/MArketerAddClient',element:<ErrorBoundary><MArketerAddClient userData={userData}/></ErrorBoundary>},
      {path:'/MarketerClients',element:<ErrorBoundary><MarketerClients userData={userData}/></ErrorBoundary>},
      // {path:'/clients',element:<ProtectedRoute userData={userData}><Clients/></ProtectedRoute>},
      // {path:'/addclient',element:<ProtectedRoute userData={userData}><AddClient/></ProtectedRoute>},
      {path:'/payment',element:<ErrorBoundary><ProtectedRoute userData={userData}><Payment/></ProtectedRoute></ErrorBoundary>},
      {path:'/shipments',element:<ErrorBoundary><ProtectedRoute userData={userData}><Shipments userData={userData}/></ProtectedRoute></ErrorBoundary>},
      {path:'/shipmentForms',element:<ErrorBoundary><ProtectedRoute userData={userData}><ShipmentForms userData={userData}/></ProtectedRoute></ErrorBoundary>},
      {path:'/saeeShipments',element:<ErrorBoundary><ProtectedRoute userData={userData}><SaeeShipments userData={userData}/></ProtectedRoute></ErrorBoundary>},
      // {path:'/gltShipment',element:<ErrorBoundary><ProtectedRoute userData={userData}><GltShipments/></ProtectedRoute>},
      {path:'/aramexShipment',element:<ErrorBoundary><ProtectedRoute userData={userData}><AramexShippments userData={userData}/></ProtectedRoute></ErrorBoundary>},
      {path:'/smsaShipment',element:<ErrorBoundary><ProtectedRoute userData={userData}><SmsaShippments userData={userData}/></ProtectedRoute></ErrorBoundary>},
      {path:'/anwanShipment',element:<ErrorBoundary><ProtectedRoute userData={userData}><AnwanShippments userData={userData}/></ProtectedRoute></ErrorBoundary>},
      {path:'/splShipment',element:<ErrorBoundary><ProtectedRoute userData={userData}><SplShippments userData={userData}/></ProtectedRoute></ErrorBoundary>},
      {path:'/gltOrders',element:<ErrorBoundary><ProtectedRoute userData={userData}><GltOrdersShipment userData={userData}/></ProtectedRoute></ErrorBoundary>},
      {path:'/invocesMarkter',element:<ErrorBoundary><ProtectedRoute userData={userData}><InvocesMarkter userData={userData}/></ProtectedRoute></ErrorBoundary>},
      {path:'/marketerEditClient',element:<ErrorBoundary><ProtectedRoute userData={userData}><MarketerEditClient userData={userData}/></ProtectedRoute></ErrorBoundary>},
      {path:'/imileAddClient',element:<ErrorBoundary><ProtectedRoute userData={userData}><ImileAddClient userData={userData}/></ProtectedRoute></ErrorBoundary>},
      {path:'/imileClients',element:<ErrorBoundary><ProtectedRoute userData={userData}><ImileClients userData={userData}/></ProtectedRoute></ErrorBoundary>},
      {path:'/imileShippments',element:<ErrorBoundary><ProtectedRoute userData={userData}><ImileShippments userData={userData}/></ProtectedRoute></ErrorBoundary>},
      {path:'/jtShippments',element:<ErrorBoundary><ProtectedRoute userData={userData}><JtShippments userData={userData}/></ProtectedRoute></ErrorBoundary>},
      {path:'/paymentOrders',element:<ErrorBoundary><ProtectedRoute userData={userData}><PaymentOrders userData={userData}/></ProtectedRoute></ErrorBoundary>},
      {path:'/addClientAll',element:<ErrorBoundary><ProtectedRoute userData={userData}><AddClientAll userData={userData}/></ProtectedRoute></ErrorBoundary>},
      {path:'/clientsAll',element:<ErrorBoundary><ProtectedRoute userData={userData}><ClientsAll userData={userData}/></ProtectedRoute></ErrorBoundary>},
      {path:'/packageDetails',element:<ErrorBoundary><ProtectedRoute userData={userData}><PackageDetails userData={userData}/></ProtectedRoute></ErrorBoundary>},
      {path:'/packageMarketers',element:<ErrorBoundary><ProtectedRoute userData={userData}><PackegesMarketers userData={userData}/></ProtectedRoute></ErrorBoundary>},
      {path:'/generateLinkPayment',element:<ErrorBoundary><ProtectedRoute userData={userData}><GenerateLinkPayment userData={userData}/></ProtectedRoute></ErrorBoundary>},
      // {path:'/EditClientModal',element:<ErrorBoundary><ProtectedRoute userData={userData}><EditClientModal userData={userData}/></ProtectedRoute></ErrorBoundary>},
    ]},
    {path:'/',element:<LayoutAdmin setuserData={setuserData} userData={userData}/> ,children:[
      {path:'companiesAdmin',element:<ErrorBoundary><CompaniesAdmin userData={userData}/></ErrorBoundary>},
    {path:'clientsAdmin',element:<ErrorBoundary><ProtectedRoute userData={userData}><ClientsAdmin/></ProtectedRoute></ErrorBoundary>},
    {path:'daftraStaff',element:<ErrorBoundary><ProtectedRoute userData={userData}><DaftraStaff/></ProtectedRoute></ErrorBoundary>},
    {path:'saeeEdit',element:<ErrorBoundary><ProtectedRoute userData={userData}><SaeeEdit/></ProtectedRoute></ErrorBoundary>},
    {path:'gltEdit',element:<ErrorBoundary><ProtectedRoute userData={userData}><GltEdit/></ProtectedRoute></ErrorBoundary>},
    {path:'aramexEdit',element:<ErrorBoundary><ProtectedRoute userData={userData}><AramexEdit/></ProtectedRoute></ErrorBoundary>},
    {path:'smsaEdit',element:<ErrorBoundary><ProtectedRoute userData={userData}><SmsaEdit/></ProtectedRoute></ErrorBoundary>},
    {path:'anwanEdit',element:<ErrorBoundary><ProtectedRoute userData={userData}><AnwanEdit/></ProtectedRoute></ErrorBoundary>},
    {path:'splEdit',element:<ErrorBoundary><ProtectedRoute userData={userData}><SplEdit/></ProtectedRoute></ErrorBoundary>},
    {path:'imileEdit',element:<ErrorBoundary><ProtectedRoute userData={userData}><ImileEdit/></ProtectedRoute></ErrorBoundary>},
    {path:'jtEdit',element:<ErrorBoundary><ProtectedRoute userData={userData}><JtEdit/></ProtectedRoute></ErrorBoundary>},
    {path:'userListAdmin',element:<ErrorBoundary><ProtectedRoute userData={userData}><UsersListAdmin/></ProtectedRoute></ErrorBoundary>},
    {path:'addDepositAdmin',element:<ErrorBoundary><ProtectedRoute userData={userData}><AddDepositAdmin/></ProtectedRoute></ErrorBoundary>},
    {path:'InvitedWaiting',element:<ErrorBoundary><ProtectedRoute userData={userData}><InvitedWaiting/></ProtectedRoute></ErrorBoundary>},
    {path:'shipmentsAdmin',element:<ErrorBoundary><ProtectedRoute userData={userData}><AdminSearchShipments/></ProtectedRoute></ErrorBoundary>},
    {path:'invocesAdmin',element:<ErrorBoundary><ProtectedRoute userData={userData}><InvocesAdmin/></ProtectedRoute></ErrorBoundary>},
    {path:'clientsCreditAdmin',element:<ErrorBoundary><ProtectedRoute userData={userData}><ClientsCreditAdmin/></ProtectedRoute></ErrorBoundary>},
    {path:'marketersAdmin',element:<ErrorBoundary><ProtectedRoute userData={userData}><MarketersAdmin/></ProtectedRoute></ErrorBoundary>},
    {path:'clientsAmarketers',element:<ErrorBoundary><ProtectedRoute userData={userData}><ClientsAmarketers/></ProtectedRoute></ErrorBoundary>},
    {path:'packegesAdmin',element:<ErrorBoundary><ProtectedRoute userData={userData}><PackegesAdmin/></ProtectedRoute></ErrorBoundary>},
   
    ]},
    {path:'/',element:<LayoutMarketers setmarketerData={setmarketerData} marketerData={marketerData}/> ,children:[
      {path:'marketersShipments',element:<ErrorBoundary><MarketersShipments marketerData={marketerData}/></ErrorBoundary>},
      {path:'marketersClients',element:<ErrorBoundary><MarketersClients marketerData={marketerData}/></ErrorBoundary>},
      {path:'marketerGenerateLink',element:<ErrorBoundary><MarketerGenerateLink marketerData={marketerData}/></ErrorBoundary>},
   
    ]},
    {path:'*', element:<PageNotFound/>}
  ])
  return (
    <>
            <RouterProvider router={routers} />
    </>
  );
}

export default App;
