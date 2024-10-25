import ReactModal from 'react-modal';
import {Modal , Button} from 'react-bootstrap';
import axios from 'axios';
import { useEffect, useState } from 'react';


const EditClientModal = ({item}) => {

    useEffect(()=>{
        console.log(item)
      },[])
    //   const [formData, setFormData] = useState({
    //     name: client?.name || '',
    //     // Add other fields here with default values if needed
    //   });
    // const handleInputChange = (event) => {
    //     const { name, value } = event.target;
    //     setFormData({ ...formData, [name]: value });
    //   }
    //   const handleSubmit = async (event) => {
    //     event.preventDefault();
    //     try {
    //       const response = await axios.post(
    //         `https://dashboard.go-tex.net/api/clients/edit-client/:${client._id}`,
    //         formData,
    //         {
    //           headers: {
    //             Authorization: `Bearer ${localStorage.getItem('token')}`,
    //           },
    //         }
    //       );
    //       console.log(response);
    //       console.log(response.data.msg);
    
    //       closeModal();
    //       window.alert("تم تعديل بيانات العميل بنجاح")
          
    //     } catch (error) {
    //       console.error(error);
    //     }
    //   }     
  return (
    <>
    
    <div>
    {/* <Modal show={isOpen} onHide={closeModal} formData={formData}>
        <Modal.Header >
          <Modal.Title>تعديل بيانات العميل
             </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
          <form>
          <input type="text" className="form-control" id="name" name="name" value={formData.name} onChange={handleInputChange} />

        <button type="submit">Save</button>
      </form>  
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
          إغلاق
          </Button>
        </Modal.Footer>
      </Modal> */}
      </div>
    </>
    
  );
};

export default EditClientModal;