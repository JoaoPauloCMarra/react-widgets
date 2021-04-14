import { createContext, FunctionalComponent } from 'preact';
import { useContext, useEffect, useReducer } from 'preact/hooks';

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

const AppProvider: FunctionalComponent = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { loading: dataLoading, settings } = useDataContext();

  useEffect(() => {
    const { widgetElId, theme } = settings || {};
    const startup = async () => {
      const rootEl = document.getElementById(String(widgetElId));
      if (rootEl && theme) {
        rootEl.className += ` ${theme}`;
      }
      dispatch({ loading: false });
    };
    if (!dataLoading && widgetElId && theme) {
      startup();
    }
  }, [dataLoading, settings]);

  return <Context.Provider value={state}>{state.loading ? <Loading /> : children}</Context.Provider>;
};

const useAppContext = (): AppState => {
  const context = useContext(Context);
  if (!context) {
    throw new Error('AppContext not found');
  }
  return context;
};

export { AppProvider, useAppContext };
