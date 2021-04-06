import { createContext, FC, useContext, useEffect, useReducer } from 'react';

import { DEFAULT_LANGUAGE, SupportedLanguages } from '../Constants';
import LocalStorage from '../utils/storage';
import { logError } from '../utils/logger';
import I18n from '../utils/i18n';

export interface AppState {
  initialLoading: boolean;
  language: SupportedLanguages;
  languageName: string;
  selectedWidget: string;

  SetLanguage: (language: SupportedLanguages) => void;
  Translate: (path: string) => string;
}

export const initialState: AppState = {
  initialLoading: true,
  language: DEFAULT_LANGUAGE,
  languageName: '',
  selectedWidget: '',

  SetLanguage: () => null,
  Translate: () => '',
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

  useEffect(() => {
    const startup = async () => {
      try {
        dispatch({ initialLoading: true });

        if (!location) return;
        const clientSettings = JSON.parse(
          '{"' + location.search.substring(1).replace(/&/g, '","').replace(/=/g, '":"') + '"}',
          (key, value) => {
            return key === '' ? value : decodeURIComponent(value);
          },
        );

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

  return <AppContext.Provider value={{ ...state, SetLanguage, Translate }}>{children}</AppContext.Provider>;
};

export const useAppContext = (): AppState => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('AppContext not found');
  }
  return context;
};
