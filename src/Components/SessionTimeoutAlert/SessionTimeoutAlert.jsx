import React, { useEffect } from 'react';

const SessionTimeoutAlert = () => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      window.alert('Session timeout. Please login again.');
      window.location.href = '/';
    },  10000); // 1 hour in milliseconds

    return () => clearTimeout(timeout);
  }, []);

  return null;
};

export default SessionTimeoutAlert;
