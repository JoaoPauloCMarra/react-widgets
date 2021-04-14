import { useCallback } from 'preact/hooks';
import { API_URL } from '../Constants';
import { logError } from '../utils/logger';

type Params = {
  route: string;
  method?: 'get' | 'post';
  params?: any;
  filter?: { key: string; value: string | number | boolean };
};

type FetchFunction = ({ method, route, params }: Params) => any;

class FetchError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = 'Fetch Error';
    this.status = status;

    logError(`${this.name} - CODE: ${status}`, message);
  }
}

const useApiData = (): FetchFunction => {
  const fetchData = async ({ method = 'get', route, params, filter }: Params) => {
    const response = await fetch(`${API_URL}${route}`, {
      method: method || 'get',
      mode: 'cors',
      cache: 'default',
      headers: {
        'Content-Encoding': 'gzip',
        'Content-Type': 'application/json',
      },
      body: params ? JSON.stringify(params) : undefined,
    });
    const { ok, status, statusText } = response;

    if (!ok) {
      throw new FetchError(status, statusText);
    }

    const data = await response.json();

    if (filter) {
      return data.find((item: any) => item[filter.key] && item[filter.key] === filter.value);
    }

    return data;
  };

  try {
    return useCallback(fetchData, []);
  } catch (error) {
    throw new FetchError(0, error.message);
  }
};

export default useApiData;
