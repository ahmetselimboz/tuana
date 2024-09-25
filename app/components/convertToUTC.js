export const convertToUTC = (dateValue) => {
  const localDate = new Date(dateValue);
  return new Date(
    localDate.getTime() - localDate.getTimezoneOffset() * 60000
  ).toISOString();
};

export const mergeData = (data1, data2) =>{
  // data1'deki her anahtarı data2'ye ekleyip güncelliyoruz
  Object.keys(data1).forEach(key => {
    data2[key] = data1[key];
  });
  
  // Anahtarları sıralayıp yeni bir obje oluşturuyoruz
  const sortedData = {};
  Object.keys(data2).sort((a, b) => a - b).forEach(key => {
    sortedData[key] = data2[key];
  });
  
  return sortedData;
}