import { createContext, useContext, useEffect, useReducer } from 'react';

import { DEFAULT_LANGUAGE, SupportedLanguages } from '../Constants';
import { logError } from '../utils/logger';
import I18n from '../utils/i18n';

interface ProviderProps {
  params: WidgetParams;
}

export interface AppState {
  language: SupportedLanguages;
  languageName: string;
  initialLoading: boolean;
  loading: boolean;

  clientSettings: any;

  SetLanguage: (language: SupportedLanguages) => void;
  Translate: (path: string) => string;
  SetLoading: (loading: boolean) => void;
}

export const initialState: AppState = {
  language: DEFAULT_LANGUAGE,
  languageName: '',
  initialLoading: true,
  loading: true,

  clientSettings: {},

  SetLanguage: () => null,
  Translate: () => '',
  SetLoading: () => {},
};

export const AppContext = createContext<AppState>(initialState);

const reducer = (state: AppState, action: Partial<AppState>): AppState => ({
  ...state,
  ...action,
});

export const AppContextProvider: React.FC<ProviderProps> = ({ children, params }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const i18n = new I18n();

  const SetLanguage = (value: SupportedLanguages | string) => {
    const language = i18n.getLanguageCode(value);
    const languageName = i18n.getLanguageFromCode(language);
    dispatch({ language, languageName });
  };

  const Translate = (path: string) => i18n.setLanguage(state.language).t(path) || '';

  const SetLoading = (loading: boolean) => {
    dispatch({ loading });
  };

  useEffect(() => {
    const startup = async () => {
      try {
        dispatch({ loading: true });

        SetLanguage(params.language);

        dispatch({ clientSettings: params, initialLoading: false });
      } catch (error) {
        logError('AppContextStartup error:', error);
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
