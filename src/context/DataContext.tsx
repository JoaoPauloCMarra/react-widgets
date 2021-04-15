import { createContext, FunctionalComponent } from 'preact';
import { useContext, useEffect, useReducer, useCallback } from 'preact/hooks';

import { defaultSettings } from '../Constants';
import useApiData from '../hooks/useApiData';
import { logError } from '../utils/logger';

interface ProviderProps {
  params: WidgetParams;
}

interface DataState {
  loading: boolean;

  settings?: ClientSettings;

  locales?: Locales;
  translate: (path: string, replaceKeys?: string[], replaceWith?: { [key: string]: string }) => string;
}

const initialState: DataState = {
  loading: true,

  translate: () => '',
};

const Context = createContext<DataState>(initialState);

const reducer = (state: DataState, action: Partial<DataState>): DataState => ({
  ...state,
  ...action,
});

const DataProvider: FunctionalComponent<ProviderProps> = ({ children, params }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const fetchData = useApiData();

  const translate = (path: string, replaceKeys?: string[], replaceWith?: { [key: string]: string }) => {
    const { locales } = state;
    if (!locales) return '';

    let result = '';
    try {
      result = locales[path] || '';
      if (replaceKeys && replaceWith) {
        result = result.replace(
          new RegExp(`\\$${replaceKeys.join('\\$|\\$')}\\$`),
          (key: string): string => replaceWith[key] || '',
        );
      }
    } catch (error) {
      result = '';
    }
    return result;
  };

  const updateSettings = useCallback(async () => {
    try {
      const { token } = params || {};
      if (!token) return;
      const clientData = await fetchData({ route: `/token`, filter: { key: 'token', value: token } });
      const settings = { ...params, ...clientData };
      dispatch({ settings });
    } catch (error) {
      logError('Setting up client data error:', error);
      dispatch({ settings: defaultSettings });
    }
  }, [params, fetchData]);

  const updateLocales = async () => {
    try {
      // const { language } = params;
      // const response: Locales = await fetchData({
      //   route: `/server-translations-json/${language}}`,
      // });
      const response = { FORM: 'Form', LIST: 'List' };
      dispatch({ locales: response });
    } catch (error) {
      dispatch({ locales: {} });
    }
  };

  useEffect(() => {
    const { token, widget } = params;
    const startup = async () => {
      await updateSettings();
      await updateLocales();

      dispatch({ loading: false });
    };
    if (token && widget) {
      startup();
    }
  }, [params, updateSettings]);

  return <Context.Provider value={{ ...state, translate }}>{children}</Context.Provider>;
};

const useDataContext = () => {
  const context = useContext(Context);
  if (context === undefined) {
    throw new Error('DataProvider not properly setup');
  }
  return context;
};
export { DataProvider, useDataContext };
