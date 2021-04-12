import { API_URL } from '../Constants';

type Params = {
  method?: 'get' | 'post';
  params?: any;
  route: string;
};

type FetchFunction = ({ method, route, params }: Params) => any;

const useApiData = (): FetchFunction => {
  const fetchData = async ({ method = 'get', route, params }: Params) => {
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
    const data = await response.json();
    return data;
  };

  return fetchData;
};

export default useApiData;
