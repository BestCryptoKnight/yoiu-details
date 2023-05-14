import { useState, useEffect } from 'react';

export const useUserAggreement = (key: string) => {
  const [agreed, setAgreed] = useState(false);

  useEffect(() => {
    const agreedValue = localStorage.getItem(key);
    if (agreedValue !== null) {
      setAgreed(true);
    }
  }, [key]);

  const agreeToTerms = () => {
    localStorage.setItem(key, 'true');
    setAgreed(true);
  };

  return [agreed, agreeToTerms];
};
