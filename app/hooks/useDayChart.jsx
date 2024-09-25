import { useEffect, useState } from 'react';

const useWidth = () => {
    const [windowDimensions, setWindowDimensions] = useState({
        width: undefined,
        height: undefined,
    });

    useEffect(() => {
       
        if (typeof window !== 'undefined') {
            function handleResize() {
                setWindowDimensions({
                    width: window.innerWidth,
                    height: window.innerHeight,
                });
            }

           
            handleResize();

            window.addEventListener('resize', handleResize);
            return () => window.removeEventListener('resize', handleResize);
        }
    }, []); 

    return windowDimensions;
};

export default useWidth;
