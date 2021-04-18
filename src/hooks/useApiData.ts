import { useCallback } from 'preact/hooks';
import { apiRoutes } from '../Constants';
import { logError } from '../utils/logger';

const mocks = {
  translation: require('./mocks/translation').default,
};

type Params = {
  route: string;
  method?: 'get' | 'post';
  params?: any;
  filter?: { key: string; value: string | number | boolean };
  sort?: { by: string; type: 'asc' | 'desc' };
  mock?: boolean;
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
  const fetchData = async ({ method = 'get', route, params, filter, sort, mock = false }: Params) => {
    if (mock && Boolean(process.env.ALLOW_MOCKS)) {
      if (route.includes(apiRoutes.translation)) {
        return mocks.translation;
      }
      return {};
    }

    const response = await fetch(`${process.env.API_URL}${route}`, {
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

    let data = await response.json();

    if (filter) {
      data = data.find((item: any) => item[filter.key] && item[filter.key] === filter.value);
    }

    if (sort && sort.by) {
      if (sort.type === 'asc') {
        data = data.sort((a: any, b: any) => (a[sort.by] > b[sort.by] ? 1 : -1));
      } else {
        data = data.sort((a: any, b: any) => (a[sort.by] > b[sort.by] ? -1 : 1));
      }
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
