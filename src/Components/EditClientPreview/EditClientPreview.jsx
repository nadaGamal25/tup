import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import EditClientModal from '../EditClientModal/EditClientModal';

export default function EditClientPreview() {
    const location = useLocation();
  const [clientItem, setItem] = useState(null);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const Data = queryParams.get('Data');
    if (Data) {
        setItem(JSON.parse(decodeURIComponent(Data)));
    }
  }, [location.search]);

  return (
<div>
      {clientItem && <EditClientModal item={clientItem} />}
    </div>  )
}
