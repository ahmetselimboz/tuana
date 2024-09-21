import { useState } from "react";
import axios from "axios";

export const useAxios = () => {
  const [loading, setLoading] = useState(false);
  const [res, setRes] = useState(null);
  const [error, setError] = useState(null);

  const sendRequest = async ({ method, url, body }) => {
    setLoading(true);
    setError(null);
    try {
      const config = {
        method,
        url: "https://server.tuanalytics.xyz" + url,
        data: body,
      };
   
      
      const response = await axios(config);
   
      setRes(response.data.data); 
    } catch (err) {
      setError(err.message || "Bir hata oluştu");
    } finally {
      setLoading(true);
    }
  };

  return { loading, res, error, sendRequest };
};
