import { useState, useEffect } from 'react';

export interface Dimensions {
  width: number;
  height: number;
}

export const useWindowSize = () => {
  const [dimensions, setDimensions] = useState<Dimensions>({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEffect(() => {
    const handleResize = (): void => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return dimensions;
};