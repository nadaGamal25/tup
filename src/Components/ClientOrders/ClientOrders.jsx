import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ClientOrdersPreview from '../ClientOrdersPreview/ClientOrdersPreview';

export default function ClientOrders() {
    const location = useLocation();
  const [ordersItem, setOrdersItem] = useState(null);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const Data = queryParams.get('OrdersData');
    if (Data) {
        setOrdersItem(JSON.parse(decodeURIComponent(Data)));
    }
  }, [location.search]);
  return (
    <>
          {ordersItem && <ClientOrdersPreview item={ordersItem} />}
    </>
  )
}
