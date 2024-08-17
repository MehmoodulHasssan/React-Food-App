import { useState } from 'react';
import axios from 'axios';

axios.defaults.withCredentials = true;

const usePost = () => {
  const [isError, setIsError] = useState({
    state: false,
    data: '',
  });
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [resData, setResData] = useState('');

  async function postData({ url, data }) {
    setResData('');
    setIsError({
      state: false,
      data: '',
    });
    setIsSuccess(false);
    setIsLoading(true);
    try {
      const res = await axios.post(url, data);
      if (res.status === 400) {
        console.log(res.data);
        return;
      }
      if (res.status === 201 || 200) {
        console.log(res.data);
        setResData(res.data);
        setIsSuccess(true);
      }
    } catch (error) {
      setIsError({
        state: true,
        data: error.response?.data || error.message,
      });
      // console.log(isError);
    } finally {
      setIsLoading(false);
    }
  }

  return {
    isError,
    setIsError,
    isLoading,
    isSuccess,
    setIsSuccess,
    postData,
    resData,
  };
};

export default usePost;
