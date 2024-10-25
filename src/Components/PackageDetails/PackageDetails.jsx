import React ,{ useState ,useEffect } from 'react'
import axios from 'axios'

export default function PackageDetails(userData) {
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
            if(response.data.data.userAvailableOrders === 0){
              alert('لقد انتهت الباقة الخاصة بك..قم بشراء باقة أخرى او سيتم استخدام الرصيد بالمحفظة')
            }
          } else {
            console.log(response)
          }
        } catch (error) {
          console.log(error);
          // window.alert('somthing wrong');
        }
      }
      async function cancelPackage() {
        try {
          const response = await axios.get(`https://dashboard.go-tex.net/api/package/user-cancel-package`,
           
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('userToken')}`,
            },
          });
          if (response.status === 200) {
            console.log(response)
            alert('تم الغاء الباقة بنجاح وتم استرجاع المال')
            getPackageDetails()
          } else {
            console.log(response)
          }
        } catch (error) {
          console.log(error);
          alert(error.response.data.msg)
          // window.alert('somthing wrong');
        }
      }
  return (
    <>
    <div className='p-4 admin' id='content'>
    { userData.userData.data.user.rolle === "user" && packegeDetails.companies && packegeDetails.companies.length === 0?(
            <div className=" py-3">
            <div className="edit-form package-details">
              <div className="p-saee p-3">
                <h4 className="text-center mb-3">تفاصيل باقتك     </h4>
                
                <div className="prices-box text-center">
                  <p className="cancelpackage text-danger">
                    ليس لديك باقة حاليا...قم بشراء باقة
                  </p>
                 
                </div>
                </div>
                
                    </div>
                  </div>
          ): 
          <div className=" py-3">
      <div className="edit-form package-details">
        <div className="p-saee p-3">
          <h4 className="text-center mb-3">تفاصيل باقتك     </h4>
          <div className="row">
          <div className="col-md-6 py-1">
            <label htmlFor="">سعر الباقة :</label>
            <span>{packegeDetails.price}  ريال</span>
          </div>
          <div className="col-md-6 py-1">
            <label htmlFor="">عدد الشحنات : </label>
            <span>{packegeDetails.numberOfOrders}</span>
          </div>
          <div className="col-md-12 py-1">
            <label htmlFor="">شركات الشحن  : </label>
            {packegeDetails.companies ? (
          <span>
            {packegeDetails.companies.map((company) => (
              <span >{company === "anwan" ? "gotex" : company} , </span>
            ))}
          </span>
        ) : (
          <span>_</span>
        )}
          </div>
          <div className="col-md-12 py-1">
            <label htmlFor="">الشحنات المتبقة  : </label>
            <span>{packegeDetails.userAvailableOrders}</span>
          </div>
          
          </div>
          <div className="prices-box text-center">
            <p className="cancelpackage text-danger">
              يمكنك الغاء الباقة فقط فى حالة عدم استخدامها ..
            </p>
            <div className="text-center py-3">
              <button className="btn btn-danger" onClick={cancelPackage}>
                الغاء الباقة
              </button>
            </div>
          </div>
          </div>
          
              </div>
            </div>}
    
            </div>
    </>
  )
}
