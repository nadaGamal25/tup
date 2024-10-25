import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import SplSticker from '../SplSticker/SplSticker';

const SplStickerPreview = () => {
  const location = useLocation();
  const [stickerItem, setStickerItem] = useState(null);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const stickerData = queryParams.get('stickerData');
    if (stickerData) {
      setStickerItem(JSON.parse(decodeURIComponent(stickerData)));
    }
  }, [location.search]);

  return (
    <div>
      {stickerItem && <SplSticker item={stickerItem} />}
    </div>
  );
};

export default SplStickerPreview;
