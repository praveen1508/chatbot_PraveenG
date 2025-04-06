import { useEffect, useState } from 'react';
import axios from 'axios';
import { Exchange } from '../utils/chatbotConfig';

export const useExchange = (): Exchange[] | undefined => {
  const [data, setData] = useState<Exchange[]>();
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    const fetchData = async () => {
      const response = await axios.get(`http://localhost:3000/exchange`, {
        signal,
      });
      setData(response?.data);
    };
    fetchData();
    return () => {
      controller?.abort();
    }
  }, []);
  return data;
};
