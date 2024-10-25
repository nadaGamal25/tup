import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function InvocesAdmin() {
    useEffect(()=>{
        getInvocesAdmin()
      },[])
      const [invocesAdmin,setInvocesAdmin]=useState([])
      const [currentPage, setCurrentPage] = useState(Number(1));
      const [numberOfPages, setNumberOfPages] = useState(1);
      const [loading, setLoading] = useState(false);
      async function getInvocesAdmin() {
        try {
          setLoading(true);
          const response = await axios.get('https://dashboard.go-tex.net/api/daftra/all-invoices',
          {
            params: {
              page: currentPage,
              
            },
            headers: {
              Authorization: `Bearer ${localStorage.getItem('userToken')}`,
            },
          });
          console.log(response)
          setInvocesAdmin(response.data.data)
          setCurrentPage(response.data.pagination.page);
          setNumberOfPages(response.data.pagination.page_count);
        } catch (error) {
          console.error(error);
        }finally {
          setLoading(false); 
        }
      }
      const [search, setSearch]= useState('')

      const handlePreviousPage = async () => {
        if (currentPage > 1) {
          setCurrentPage(currentPage - 1); 
          try {
            setLoading(true);
            const response = await axios.get(`https://dashboard.go-tex.net/api/daftra/all-invoices`, {
              params: {
                  page: currentPage -1,
                  
                },
              headers: {
                Authorization: `Bearer ${localStorage.getItem('userToken')}`,
              },
            });
        
            console.log(response);
            setInvocesAdmin(response.data.data);
            setCurrentPage(response.data.pagination.page);
            setNumberOfPages(response.data.pagination.page_count);
          } catch (error) {
            console.error('Error fetching students:', error);
          } finally {
            setLoading(false); 
          }
        }
      };
      const handleNextPage = async () => {
        if (currentPage < numberOfPages) {
          setCurrentPage(currentPage + 1);
          try {
            setLoading(true);
            const response = await axios.get(`https://dashboard.go-tex.net/api/daftra/all-invoices`, {
              params: {
                  page: currentPage +1,
                  
                },
              headers: {
                Authorization: `Bearer ${localStorage.getItem('userToken')}`,
              },
            });
        
            console.log(response)
            setInvocesAdmin(response.data.data)
            setCurrentPage(response.data.pagination.page);
            setNumberOfPages(response.data.pagination.page_count);
          } catch (error) {
            console.error('Error fetching students:', error);
          } finally {
            setLoading(false); 
          }
        }
      };
  return (
    <>
    <div className='p-5' id='content'>
    {/* <div className="search-box p-4 mt-2 row g-1">
        <div className="col-md-2">
        <button className="btn"><i class="fa-solid fa-magnifying-glass"></i> بحث</button>
        </div>
        <div className="col-md-10">
        <input className='form-control' name="search" onChange={(e)=> setSearch(e.target.value)} type="search" placeholder=' اسم العميل او id_الفاتورة '  />
        </div>
      </div> */}
    <div className="clients-table p-4 my-4">
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">العميل </th>
            <th scope="col">اللقب </th>
            {/* <th scope="col">الايميل </th> */}
            <th scope="col">المدينة </th>
            <th scope="col">العنوان </th>
            <th scope="col">عنوان اضافى </th>
            <th scope="col">id_العميل </th>
            <th scope="col">id_الفاتورة </th>            
            <th></th>
            
          </tr>
        </thead>
        <tbody>
          {invocesAdmin && invocesAdmin.filter((item)=>{
            if (search === '') {
              return true;
            }
            return  (
              (item.Invoice.id && item.Invoice.id.includes(search)) ||
              (item.Invoice.client_business_name && item.Invoice.client_business_name.includes(search))
            );
          }).map((item,index) =>{
            return(
              <tr key={index}>
                 {loading ? (
      <td>
        <i className="fa-solid fa-spinner fa-spin"></i>
      </td>
    ) : (<>
    <td>{index+1}</td>
                {item.Invoice?<td>{item.Invoice.client_first_name} {item.Invoice.client_last_name}</td>:<td>_</td>}
                {item.Invoice.client_business_name?<td>{item.Invoice.client_business_name}</td>:<td>_</td>}
                {/* {item.Invoice.client_email?<td>{item.Invoice.client_email}</td>:<td>_</td>} */}
                {item.Invoice.client_city?<td>{item.Invoice.client_city}</td>:<td>_</td>}
                {item.Invoice.client_address1?<td>{item.Invoice.client_address1}</td>:<td>_</td>}
                {item.Invoice.client_address2?<td>{item.Invoice.client_address2}</td>:<td>_</td>}
                {item.Invoice.client_id?<td>{item.Invoice.client_id}</td>:<td>_</td>}
                {item.Invoice.id?<td>{item.Invoice.id}</td>:<td>_</td>}
                <td>
                    <a className="btn btn-orange" href={item.Invoice.invoice_pdf_url} target='_blank'>
                        عرض الفاتورة
                    </a>
                </td>
    </>
    )}
                
              </tr>
            )
          }
          )}
        </tbody>
      </table>
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
      <div>
<input className=' m-1' type="number" 

placeholder="رقم الصفحة "
onChange={(e) => setCurrentPage(e.target.value)} />
<button className="btn btn-primary m-1" onClick={getInvocesAdmin}>
            بحث برقم الصفحة
        </button>
      </div>
     </div>
         </div>
    </>

  )
}
