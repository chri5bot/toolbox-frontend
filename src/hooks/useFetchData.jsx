import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetchData = (url, dependencies) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const response = await axios.get(url);

        if (response && response.data) {
          setData(response.data);
        } else {
          setIsError(true);
        }
      } catch (error) {
        setIsError(true);
        console.log(error);
      }

      setIsLoading(false);
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, ...dependencies]);

  return { isLoading, isError, data };
};

export default useFetchData;
