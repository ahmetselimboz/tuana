import { useEffect, useState } from 'react';
import { useAppSelector } from '@/lib/redux/hooks';

const useDevice = ({tabIndex, data}) => {
    const [browserState, setBrowserState] = useState(null)
    const [numberState, setNumberState] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (tabIndex === 0) {
            const result = data.reduce((acc, item) => {
                const browserName = item.userDevice.browser.name;

                const existingBrowser = acc.find((obj) => obj.browser === browserName);
                if (existingBrowser) {
                    existingBrowser.number += 1;
                } else {
                    acc.push({ browser: browserName, number: 1 });
                }

                return acc;
            }, []);


            const browser = result.map(item => item.browser);
            const number = result.map(item => item.number);
            setBrowserState(browser)
            setNumberState(number)
            setLoading(false)
        }

    }, [res, activeDevices]);
   
    return { loading, browserState, numberState};
};

export default useDevice;
