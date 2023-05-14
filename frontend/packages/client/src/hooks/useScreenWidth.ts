import { useEffect, useState } from 'react';

import { ScreenWidth } from 'global';

const useScreenWidth = (screenWidth: ScreenWidth) => {
  const [isScreenWidth, setIsScreenWidth] = useState(
    document.body.clientWidth <= screenWidth,
  );

  useEffect(() => {
    const listener = () => {
      setIsScreenWidth(document.body.clientWidth <= screenWidth);
    };
    window.addEventListener('resize', listener);
    return () => {
      window.removeEventListener('resize', listener);
    };
  }, [screenWidth]);
  return isScreenWidth;
};

export { useScreenWidth };
