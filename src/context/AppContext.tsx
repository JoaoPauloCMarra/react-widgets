import { createContext, FC, useContext, useEffect, useReducer } from 'react';

import { DEFAULT_LANGUAGE, SupportedLanguages } from '../Constants';
import LocalStorage from '../utils/storage';
import { logError } from '../utils/logger';
import I18n from '../utils/i18n';

export interface AppState {
  language: SupportedLanguages;
  languageName: string;
  selectedWidget: string;
  initialLoading: boolean;
  loading: boolean;

  SetLanguage: (language: SupportedLanguages) => void;
  Translate: (path: string) => string;
  SetLoading: (loading: boolean) => void;
}

export const initialState: AppState = {
  language: DEFAULT_LANGUAGE,
  languageName: '',
  selectedWidget: '',
  initialLoading: true,
  loading: true,

  SetLanguage: () => null,
  Translate: () => '',
  SetLoading: () => {},
};

export const AppContext = createContext<AppState>(initialState);

const reducer = (state: AppState, action: Partial<AppState>): AppState => ({
  ...state,
  ...action,
});

export const AppContextProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const storage = new LocalStorage();

  const SetLanguage = (language: SupportedLanguages) => {
    const i18n = new I18n();
    storage.set('language', language);
    dispatch({ language, languageName: i18n.getLanguageFromCode(language) });
  };

  const Translate = (path: string) => {
    const i18n = new I18n(state.language);
    return i18n.t(path) || '';
  };

  const SetLoading = (loading: boolean) => {
    dispatch({ loading });
  };

  useEffect(() => {
    const startup = async () => {
      try {
        dispatch({ loading: true });

        if (!location) return;
        const locationSearch = location.search.substring(1);
        let clientSettings: any = {};
        if (locationSearch) {
          clientSettings = JSON.parse(
            '{"' + locationSearch.replace(/&/g, '","').replace(/=/g, '":"') + '"}',
            (key, value) => (key === '' ? value : decodeURIComponent(value)),
          );
        }

        if (clientSettings.widget) {
          const storageLanguage = storage.get('language');

          if (storageLanguage) {
            SetLanguage(Number(storageLanguage));
          } else {
            SetLanguage(DEFAULT_LANGUAGE);
          }
          dispatch({ selectedWidget: clientSettings.widget });
        } else {
          logError('Warning!', 'No Widget Specified...');
        }
      } catch (error) {
        logError('AppContextStartup error:', error);
      } finally {
        dispatch({ initialLoading: false });
      }
    };
    startup();
  }, []);

  return (
    <AppContext.Provider
      value={{
        ...state,
        SetLanguage,
        Translate,
        SetLoading,
      }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = (): AppState => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('AppContext not found');
  }
  return context;
};
