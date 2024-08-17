import { useState, useEffect } from 'react';
import axios from 'axios';

axios.defaults.withCredentials = true;

const useFetch = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState({
    status: false,
    data: '',
  });

  async function fetchData(url) {
    try {
      setIsLoading(true);
      const res = await axios.get(url);
      const resData = res.data;
      // console.log(resData);
      setData(resData);
      setIsLoading(false);
      setIsError(false);
    } catch (error) {
      console.log(error.response?.data || error.message);
      setIsError({
        status: true,
        data: error.response?.data || error.message,
      });
    }
  }
  return {
    data,
    isLoading,
    isError,
    fetchData,
  };
};

export default useFetch;
