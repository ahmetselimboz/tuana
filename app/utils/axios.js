import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000',
  withCredentials: true, // HttpOnly cookies için
});

// Token yenileme fonksiyonu
api.interceptors.response.use(
  (response) => response, // Başarılı bir cevap dönerse bunu olduğu gibi geri döndür
  async (error) => {
    const originalRequest = error.config;
    
    // Eğer 401 hatası ve retry yapılmamışsa token'i yenile
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        // Refresh token ile yeni access token alma
        const { data } = await api.post('/api/user/refresh-token', { 
          token: localStorage.getItem('refreshToken') 
        });


        // Yeni access token'i localStorage'a kaydet
        localStorage.setItem('accessToken', data.accessToken);

        // Yeni token'i header'a ekle ve isteği yeniden gönder
        originalRequest.headers['Authorization'] = 'Bearer ' + data.accessToken;
        return api(originalRequest);
      } catch (err) {
        console.error("Token yenileme başarısız:", err);
        // Refresh token de geçersizse kullanıcıyı login'e yönlendirebiliriz
        window.location.href = '/login';
      }
    }
    
    // Eğer başka bir hata ise olduğu gibi geri döndür
    return Promise.reject(error);
  }
);

export default api;
