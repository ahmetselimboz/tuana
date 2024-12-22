
export const convertToUTC = (dateValue) => {
  const localDate = new Date(dateValue);
  return new Date(
    localDate.getTime() - localDate.getTimezoneOffset() * 60000
  ).toISOString();
};

export const convertToLocal = (dateValue) => {
  const dateUTC = new Date(dateValue);
  const localDate = dateUTC.toISOString();
  return localDate;
};

export const mergeData = (data1, data2) =>{
 
  Object.keys(data1).forEach(key => {
    data2[key] = data1[key];
  });
  
  const sortedData = {};
  Object.keys(data2).sort((a, b) => a - b).forEach(key => {
    sortedData[key] = data2[key];
  });
  
  return sortedData;
}

export const deviceFunc = (tabIndex, data) => {

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
  return {browser, number}
}
}