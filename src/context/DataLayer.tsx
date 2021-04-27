import { createContext, FunctionalComponent } from 'preact';
import { useContext, useEffect, useReducer, useCallback } from 'preact/hooks';

import { apiRoutes, defaultSettings } from '../Constants';
import useApiData from '../hooks/useApiData';
import { updateWidgetStyle } from '../utils/data';
import { logError } from '../utils/logger';

interface ProviderProps {
  params: WidgetParams;
  widgetEl: null | HTMLElement;
}

const initialState: DataState = {
  loading: true,

  translate: () => '',

  postsLoading: true,
  updatePosts: () => {},
};

const Context = createContext<DataState>(initialState);

const reducer = (state: DataState, action: Partial<DataState>): DataState => ({
  ...state,
  ...action,
});

export const DataLayerProvider: FunctionalComponent<ProviderProps> = ({ children, params, widgetEl }) => {
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

  const updateSettings = useCallback(
    async (params: WidgetParams) => {
      try {
        const { token, height, width } = params || {};
        if (!token) return;
        const clientData = await fetchData({ route: apiRoutes.token, filter: { key: 'token', value: token } });
        const { theme } = clientData;
        updateWidgetStyle(widgetEl, theme, height, width);
        if (widgetEl && theme && !widgetEl?.className?.includes(theme)) {
          const [firstClassName] = widgetEl.className.split(' ');
          widgetEl.className = `${firstClassName} ${theme}`;
        }
        const settings = { ...params, ...clientData };
        dispatch({ settings });
      } catch (error) {
        logError('Setting up client data error:', error);
        dispatch({ settings: defaultSettings });
      }
    },
    [fetchData, widgetEl],
  );

  const updateLocales = useCallback(
    async (language: string) => {
      try {
        if (!language) return;
        const locales: Locales = await fetchData({
          route: `${apiRoutes.translation}/${language}}`,
          mock: true,
        });
        dispatch({ locales });
      } catch (error) {
        dispatch({ locales: {} });
      }
    },
    [fetchData],
  );

  const updatePosts = useCallback(async () => {
    try {
      dispatch({ postsLoading: true });
      const posts: Post[] = await fetchData({
        route: apiRoutes.post,
        sort: { by: 'createdAt', type: 'desc' },
      });
      dispatch({ posts, postsLoading: false });
    } catch (error) {
      dispatch({ posts: [] });
    }
  }, [fetchData]);

  useEffect(() => {
    const { token, language = 'en', widget } = params;
    const startup = async () => {
      await updateSettings(params);
      await updateLocales(language);
      dispatch({ loading: false });
    };
    if (token && widget) {
      startup();
    }
  }, [params, updateLocales, updateSettings]);

  return <Context.Provider value={{ ...state, translate, updatePosts }}>{children}</Context.Provider>;
};

export const useDataLayer = () => {
  const context = useContext(Context);
  if (context === undefined) {
    throw new Error('DataLayerProvider not properly setup');
  }
  return context;
};
