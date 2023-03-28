import { useEffect, useState } from 'react';

const useAuthFetch = (url, method, body) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const authKey = localStorage.getItem('REACT_TOKEN_AUTH_KEY');
        if (authKey) {
          const { accessToken } = JSON.parse(authKey);
          const response = await fetch(url, {
            method: method,
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify(body),
          });
          if (response.ok) {
            const data = await response.json();
            setData(data);
          } else {
            throw new Error(response.status);
          }
        }
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, error, loading };
};

export default useAuthFetch;
