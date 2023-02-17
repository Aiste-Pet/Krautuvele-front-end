import { useEffect, useState } from 'react';

import { authFetch } from './useAuth';

const useAuthFetch = (url) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await authFetch(url);
        const data = await response.json();
        setData(data);
        setLoading(false);
      } catch (error) {
        setError(error);
      }
    };

    fetchData();
  }, [url]);

  return { data, error, loading };
};

export default useAuthFetch;
