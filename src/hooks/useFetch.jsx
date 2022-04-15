import { useCallback, useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../context/GlobalContext';

function useFetch(url, options, immediate = false) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const { dispatch } = useContext(GlobalContext);

  const executeFetch = useCallback(async (body, params) => {
    try {
      dispatch({ type: 'SET_LOADING' });

      if (body) {
        options.body = JSON.stringify(body);
        options.headers = {
          'Content-Type': 'application/json',
        };
      }

      const res = await fetch(params ? `${url}/${params}` : url, options);
      if (!res.ok) throw new Error('Something went wrong');

      const data = await res.json();
      setData(data);

      dispatch({ type: 'CLEAR_LOADING' });
    } catch (error) {
      const errorMessage = error?.message || error;
      setError(errorMessage);
      dispatch({ type: 'SET_ERROR', payload: errorMessage });

      dispatch({ type: 'CLEAR_LOADING' });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (immediate) {
      executeFetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { data, error, executeFetch };
}

export default useFetch;
