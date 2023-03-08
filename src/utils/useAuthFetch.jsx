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
        if (!response.ok) {
          throw new Error(response.status);
        }
        setData(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(error);
      }
    };

    fetchData();
  }, [url]);

  return { data, error, loading };
};

export default useAuthFetch;
