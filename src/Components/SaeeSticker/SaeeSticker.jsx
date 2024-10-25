import React from 'react';
import { useLocation } from 'react-router-dom';

export default function SaeeSticker() {
  const location = useLocation();
  // const stickerHTML = location.state.stickerHTML;

  // Use the stickerHTML data in your component

  return (
    // <div dangerouslySetInnerHTML={{ __html: stickerHTML }} />
<></>
  );
}

// import React, { useEffect, useState } from 'react'
// import axios from 'axios';

// export default function SaeeSticker() {
//     const [saeeAllOrders,setSaeeAllOrders]=useState([]);
//     const [stickers,setStickers]=useState('');

//     useEffect(()=>{
//         getUserOrders()
//     },[])
//     async function getUserOrders() {
//         try {
//           const response = await axios.get('https://dashboard.go-tex.net/api/saee/get-all-orders', {
//             headers: {
//               Authorization: `Bearer ${localStorage.getItem('userToken')}`,
//             },
//           });
//           const orders = response.data.data;
//           // Process the orders as needed
//           console.log(orders);
//           setSaeeAllOrders(orders);
      
//           // Fetch the order sticker for the first order
//           if (orders.length > 0) {
//             const orderId = orders[0]._id;
//              // Assuming you want to get the sticker for the first order
//              console.log(orderId)
//             const stickerResponse = await axios.get(`https://dashboard.go-tex.net/api/saee/print-sticker/${orderId}`, {
//               headers: {
//                 Authorization: `Bearer ${localStorage.getItem('userToken')}`,
//               },
//             });
//             const stickerHtml = stickerResponse.data.data;
//             // Process the sticker HTML as needed
//             console.log(stickerHtml);
//             setStickers(stickerHtml);
//           }
//         } catch (error) {
//           console.error(error);
//         }
//       }
//     // async function getUserOrders() {
//     //     console.log(localStorage.getItem('userToken'))
//     //     try {
//     //       const response = await axios.get('https://dashboard.go-tex.net/api/saee/get-all-orders',
//     //       {
//     //         headers: {
//     //           Authorization: `Bearer ${localStorage.getItem('userToken')}`,
//     //         },
//     //       });
//     //       const orders = response.data.data;
//     //       // Process the orders as needed
//     //       console.log(orders)
//     //       setSaeeAllOrders(orders)
//     //     } catch (error) {
//     //       console.error(error);
//     //     }
//     //   } 
      
//   return (
//     <>
//     <div className='p-5' id='content'>
//         saaaaa
//     </div>

//     </>
//   )
// }

// import React from 'react';

// export default function SaeeSticker({ sticker }) {
//   return (
//     <div dangerouslySetInnerHTML={{ __html: sticker }} />
//   );
// }
// import React from 'react';
// export default function SaeeSticker({ stickerHTML }) {
//   return (
//     <div dangerouslySetInnerHTML={{ __html: stickerHTML }} />
//   );
// }




