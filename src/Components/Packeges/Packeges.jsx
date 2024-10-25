import React ,{ useState ,useEffect } from 'react'
import axios from 'axios'
import logo from '../../assets/tup.PNG'

export default function Packeges() {
  useEffect(()=>{
    getPackeges()
  },[])
  const [packeges,setPackeges]=useState([])
  async function getPackeges() {
    try {
      const response = await axios.get('https://dashboard.go-tex.net/api/package');
      console.log(response)
      setPackeges(response.data.data)
      
    } catch (error) {
      console.error(error);
    }
  }
  async function buyPackage(packageId) {
    try {
      const response = await axios.get(`https://dashboard.go-tex.net/api/package/user-buy-package/${packageId}`,
       
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('userToken')}`,
        },
      });
      if (response.status === 200) {
        console.log(response)
        window.alert("تم شراء الباقة بنجاح");
      } else {
        console.log(response)
      }
    } catch (error) {
      console.log(error);
      // window.alert('somthing wrong');
      alert(error.response.data.msg)
    }
  }
  return (
    <>
    <div className="f">
    <div className='p-3 packages-container' >
      <div className="logo-box">
      <img className='m-auto logo' src={logo} alt="logo" />

      </div>
      <div className="text-center heading">
        <h3>شراء باقة</h3>
      </div>
      <div class="row row-cols-1 row-cols-md-4 pt-5 g-4">
      {packeges && packeges.map((item,index) =>(
            item !== null ? (
              <div class="col ">
    <div class="card h-100 package">
      <div class="card-body">
        {/* <h5 class="card-title text-center">
        <i class="fa-solid fa-truck-fast"></i>
        </h5> */}
        <div class="card-text text-center">
          <p>{item.numberOfOrders} <sub>شحنة</sub> </p>
          <span>مقابل</span>
          <p>{item.price} <sub>ريال</sub> </p>

        </div>
        <hr/>
        <p className='p-desc'>هذه الباقة توفر لك شحنات فى  {
          item.companies ? (
            <b>
              {item.companies.map((company) => (
                <b><span >{company === "anwan" ? "gotex" :company === "all" ? "جميع الشركات" : company} 
 </span>{item.companies.length > 1 ? "& " : ""}
</b>
              ))}
            </b>
          ) : (
            <span>_</span>
          )
        }</p>
        <hr/>
        <div className="text-center">
          <button className="btn btn-blue" onClick={() => {
              if (window.confirm('هل انت بالتأكيد تريد شراء هذه الباقة ؟')) {
                buyPackage(item._id)
              }
            }}>
            شراء
          </button>
        </div>
      </div>
    </div>
  </div>
            ): null
          )
          
          
          )}
 


  
</div>

</div>
</div>
    </>
  )
}
