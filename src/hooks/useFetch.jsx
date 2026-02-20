import { useState, useEffect } from 'react';

function useFetch(endpoint) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!endpoint) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';

        const fullUrl = `${baseUrl}/api/products${endpoint}`;

        const response = await fetch(fullUrl);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        setData(result);
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint]);

  return { data, loading, error };
}

export default useFetch;
