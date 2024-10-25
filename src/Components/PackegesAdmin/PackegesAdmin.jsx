import React ,{ useState ,useEffect } from 'react'
import axios from 'axios'
import Joi from 'joi'

export default function PackegesAdmin() {
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
      const [errorList, seterrorList]= useState([]); 
      const [Companies, setCompanies]= useState([]);

      const [newPackege,setNewPackage] =useState({
        price :'',
        numberOfOrders :'',
        companies: Companies,
        
      })

      function handleCheckboxChange(event) {
        const { value, checked } = event.target;
        if (checked) {
          setCompanies((prevCompanies) => [...prevCompanies, value]);
        } else {
          setCompanies((prevCompanies) => prevCompanies.filter((company) => company !== value));
        }
      }
      const [error , setError]= useState('')
      const [isLoading, setisLoading] =useState(false)
      
      async function sendDataToApi() {
        console.log(localStorage.getItem('userToken'))
        try {
          const response = await axios.post(`https://dashboard.go-tex.net/api/package`,
           {...newPackege,
          companies:Companies},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('userToken')}`,
            },
          });
          if (response.status === 200) {
            console.log(response)
            setisLoading(false)
            window.alert("تمت اضافة الباقة بنجاح");
            getPackeges()
          } else {
            setisLoading(false)
            setError(response.data.msg)
            console.log(response.data.msg)
          }
        } catch (error) {
          console.log(error);
          window.alert('somthing wrong');
        }
      }
      
    function submitForm(e){
      e.preventDefault();
      setisLoading(true)
      let validation = validateForm();
      console.log(validation);
      if(validation.error){
        setisLoading(false)
        seterrorList(validation.error.details)
    
      }else if (Companies.length === 0) {
       alert('يجب اختيار شركة')
       setisLoading(false)

      }else{
        sendDataToApi();
      }
    
    }
    
      function getNewPackeges(e){
        let mynewPackege={...newPackege};
        mynewPackege[e.target.name]= e.target.value;
        setNewPackage(mynewPackege);
        console.log(mynewPackege);
      }
    
      function validateForm() {
        let schema = Joi.object({
          price: Joi.number().required(),
          numberOfOrders: Joi.number().required(),
          // companies: Joi.required(), 
          companies: Joi.array().items(Joi.string()).required(), 
        });
      
        return schema.validate(newPackege, { abortEarly: false });
      }
      let keyCounter = 0;

  return (
    <>
    <div className='p-4 admin' id='content'>
    
            <div className=" py-3">
              <div className="edit-form">
                <div className="p-saee p-3">
                  <h5 className="text-center mb-3">إضافة باقة جديدة   </h5>
                  <form onSubmit={submitForm} action="">
                    <label htmlFor="price">السعر :</label>
                    <input onChange={getNewPackeges} type="number"  step="0.001" className='my-input my-2 form-control' name='price' />
                    {errorList.map((err,index)=>{
      if(err.context.label ==='price'){
        return <div key={index} className="alert alert-danger my-2">يجب ملىء جميع البيانات</div>
      }
      
    })}
                    <label htmlFor="numberOfOrders">عدد الشحنات :</label>
                    <input onChange={getNewPackeges} type="number"  className='my-input my-2 form-control' name='numberOfOrders' />
                    {errorList.map((err,index)=>{
      if(err.context.label ==='numberOfOrders'){
        return <div key={index} className="alert alert-danger my-2">يجب ملىء جميع البيانات</div>
      }
      
    })}
        <label htmlFor=""> الشركة  :</label><br/>
        <input type="checkbox" id="" className='me-2' name="" value="all" onChange={handleCheckboxChange}/>
        <label for="" className='blue-txt'> جميع الشركات</label><br/>
        <input type="checkbox" id="" className='me-2' name="" value="saee" onChange={handleCheckboxChange}/>
        <label for="" className='blue-txt'> saee</label><br/>
        <input type="checkbox" id="" className='me-2' name="" value="anwan" onChange={handleCheckboxChange}/>
        <label for="" className='blue-txt'> gotex</label><br/>
        <input type="checkbox" id="" className='me-2' name="" value="smsa" onChange={handleCheckboxChange}/>
        <label for="" className='blue-txt'> smsa</label><br/>
        <input type="checkbox" id="" className='me-2' name="" value="aramex" onChange={handleCheckboxChange}/>
        <label for="" className='blue-txt'> aramex</label><br/>
        <input type="checkbox" id="" className='me-2' name="" value="imile" onChange={handleCheckboxChange}/>
        <label for="" className='blue-txt'> imile</label><br/>
        <input type="checkbox" id="" className='me-2' name="" value="jt" onChange={handleCheckboxChange}/>
        <label for="" className='blue-txt'> jt</label><br/>
        <input type="checkbox" id="" className='me-2' name="" value="spl" onChange={handleCheckboxChange}/>
        <label for="" className='blue-txt'> spl</label><br/>
        {errorList.map((err,index)=>{
      if(err.context.label ==='companies'){
        return <div key={index} className="alert alert-danger my-2">يجب ملىء جميع البيانات</div>
      }
      
    })}
        {/*    ..*/}
                   <div className="text-center">
                    <button className='btn btn-primary mt-3'>
                    {isLoading == true?<i class="fa-solid fa-spinner fa-spin"></i>:'إضافة باقة'}
                   </button>
                   </div>
                  </form>
                </div>
              </div>
            </div>

{/* 

    {Companies.length === 0 && (
  <>
      <div  key={0}>
    <label htmlFor=""> الشركة  :</label>
    <select
      type="text"
      className='my-input my-2 form-control'
      name='companies'
      placeholder=' '
      onChange={(e) => updateArrayData(0, 'companies', e.target.value)}
    >
<option value="">  </option>
<option value="saee">saee</option>
<option value="gotex">gotex</option>
<option value="smsa">smsa</option>
<option value="aramex">aramex</option>
<option value="imile">imile</option>
<option value="jt">jt</option>
<option value="spl">spl</option>
<option value="all">جميع الشركات </option>


</select>
{errorList.map((err,index)=>{
      if(err.context.label ==='companies'){
        return <div key={index} className="alert alert-danger my-2">يجب ملىء جميع البيانات</div>
      }
      
    })}
<div className="text-center">
<input type="checkbox" className='' onClick={addCompany}/>
<label for="">  إضافة شركة أخرى</label><br/>
    {/* <button className=' btn-addPiece' type="button" onClick={addCompany}>
         إضافة شركة أخرى
      </button> 
    </div>
    </div>
      </>
)}

{Companies.length > 0 && (
Companies.map((item, index) => (
    <div  key={index}>
      <label htmlFor=""> الشركة  :</label>
      <select
        type="text"
        className='my-input my-2 form-control'
        name='companies'
        placeholder=' '
        value={item}
        onChange={(e) => updateArrayData(index, 'companies', e.target.value)}
      >
<option value=""></option>
<option value="saee">saee</option>
<option value="anwan">gotex</option>
<option value="smsa">smsa</option>
<option value="aramex">aramex</option>
<option value="imile">imile</option>
<option value="jt">jt</option>
<option value="spl">spl</option>
<option value="all">جميع الشركات </option>

</select>
{errorList.map((err,index)=>{
      if(err.context.label ==='companies'){
        return <div key={index} className="alert alert-danger my-2">يجب ملىء جميع البيانات</div>
      }
      
    })}
<div className="text-center">
<input type="checkbox" onClick={addCompany}/>
<label for="">  إضافة شركة أخرى</label><br/>
    {/* <button className=' btn-addPiece' type="button" onClick={addCompany}>
         إضافة شركة أخرى
      </button> 
    </div>    
    </div>
  ))
)}
 */}

            <div className="clients-table p-4 my-4">
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">سعر الباقة</th>
            <th scope="col">عدد الشحنات </th>
            <th scope="col">الشركات  </th> 
            <th></th>           
            
          </tr>
        </thead>
        <tbody>
          {packeges && packeges.map((item,index) =>(
            item !== null ? (
              <tr key={index}>
                <td>{index+1}</td>
                {item.price?<td>{item.price}</td>:<td>_</td>}
                {item.numberOfOrders?<td>{item.numberOfOrders}</td>:<td>_</td>}
                {item.companies ? (
          <td>
            {item.companies.map((company) => (
              <span >{company === "anwan" ? "gotex ," : company === "all" ? "جميع الشركات" : company + ` , `}  </span>
            ))}
          </td>
        ) : (
          <td>_</td>
        )}
        <td>
        <button
            className="btn btn-danger"
            onClick={() => {
              if (window.confirm('هل انت بالتأكيد تريد حذف هذه الباقة ؟')) {
                const orderId = item._id;
                axios
                  .delete(`https://dashboard.go-tex.net/api/package/${ orderId }`, 
                   {
                    headers: {
                      Authorization: `Bearer ${localStorage.getItem('userToken')}`,
                    },
                  })
                  .then((response) => {
                    if (response.status === 200) {
                      console.log(response)
                      getPackeges();
                              window.alert(response.data.msg)

                    }
                  })
                  .catch((error) => {
                    console.error(error);
                        // window.alert(error.response.data.data.error)
                  });
              }
            }}
          >
             حذف 
          </button>
        </td>
              </tr>
            ): null
          )
          
          
          )}
        </tbody>
      </table>
     </div>
            </div>
    
    </>
  )
}


// function addCompany() {
//   setCompanies((prevData) => [...prevData, '']);
// }


// // function updateArrayData(index, field, value) {
// //   const updated = [...Companies];
// //   updated[index][field] = value;
// //   setCompanies(updated);
// // }
// function updateArrayData(index, field, value) {
//   const updated = [...Companies];
//   updated[index] = value;
//   setCompanies(updated);
// }