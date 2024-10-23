import { useState } from "react";
import api from "../utils/axios"; // Token yenileme işlemi olan axios'u kullan

export const useAxios = () => {
  const [loading, setLoading] = useState(false);
  const [res, setRes] = useState(null);
  const [error, setError] = useState(null);

  const sendRequest = async ({ method, url, body }) => {
    setLoading(true);
    setError(null);

    try {
      // İstek ayarlarını hazırla
      const config = {
        method,
        url: url, // baseURL zaten axios içinde ayarlı
        data: body,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`, // Token'i header'a ekle
        },
      };

      // Axios instance ile isteği gönder (Token yenileme işlevselliği zaten axios.js'de tanımlı)
      const response = await api(config); // `api` ile axios'u kullanıyoruz

      // Gelen veriyi set et
      setRes(response.data.data);
    } catch (err) {
      // Hataları yönet, özellikle token yenileme durumu için
      setError({
        status: err.response?.status || 500,
        message: err.response?.data?.error?.description || "Bir hata oluştu!",
      });
    } finally {
      setLoading(false); // İstek bittiğinde loading durumunu güncelle
    }
  };

  return { loading, res, error, sendRequest };
};
