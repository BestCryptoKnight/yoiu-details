import { useState, useEffect } from 'react';

export const useLocalStorage = (key:string, initialValue?: string) => {
  const [value, setValue] = useState(() => {
    const v = window?.localStorage.getItem(key);
    return v !== null && v !== undefined ? JSON.parse(v) : initialValue;
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};
