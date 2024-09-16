import { useEffect, useState } from 'react';

const useWidth = () => {
    const [windowDimensions, setWindowDimensions] = useState({
        width: undefined,
        height: undefined,
    });

    useEffect(() => {
        // Tarayıcı ortamında olup olmadığını kontrol et
        if (typeof window !== 'undefined') {
            function handleResize() {
                setWindowDimensions({
                    width: window.innerWidth,
                    height: window.innerHeight,
                });
            }

            // Sayfa yüklendiğinde boyutu al
            handleResize();

            window.addEventListener('resize', handleResize);
            return () => window.removeEventListener('resize', handleResize);
        }
    }, []); // Boş bağımlılık dizisi, sadece bileşen mount edilirken çalışır

    return windowDimensions;
};

export default useWidth;
