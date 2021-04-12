import { createContext, useContext, useEffect, useReducer } from 'react';

import { useDataContext } from './DataContext';
import Loading from '../shared/Loading';

interface AppState {
  loading: boolean;
}

const initialState: AppState = {
  loading: true,
};

const Context = createContext<AppState>(initialState);

const reducer = (state: AppState, action: Partial<AppState>): AppState => ({
  ...state,
  ...action,
});

const AppProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { loading: dataLoading, settings } = useDataContext();
  const { widgetElId, theme } = settings || {};
  const { loading } = state;

  useEffect(() => {
    const startup = async () => {
      const rootEl = document.getElementById(String(widgetElId));
      if (rootEl && theme) {
        rootEl.className += ' ' + theme;
      }
      dispatch({ loading: false });
    };
    if (!dataLoading && widgetElId && theme) {
      startup();
    }
  }, [dataLoading, widgetElId, theme]);

  return <Context.Provider value={state}>{loading ? <Loading /> : children}</Context.Provider>;
};

const useAppContext = (): AppState => {
  const context = useContext(Context);
  if (!context) {
    throw new Error('AppContext not found');
  }
  return context;
};

export { AppProvider, useAppContext };
