import { createContext, FunctionalComponent } from 'preact';
import { useContext, useEffect, useReducer } from 'preact/hooks';

import { useDataContext } from './DataContext';
import Loading from '../shared/Loading';

interface ProviderProps {
  widgetEl: any;
}

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

const AppProvider: FunctionalComponent<ProviderProps> = ({ children, widgetEl }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { loading: dataLoading, settings } = useDataContext();

  useEffect(() => {
    const { theme } = settings || {};
    const startup = async () => {
      if (widgetEl && theme && !widgetEl?.className?.includes(theme)) {
        const firstClassName = widgetEl.className.split(' ')[0];
        widgetEl.className = `${firstClassName} ${theme}`;
      }
      dispatch({ loading: false });
    };
    if (!dataLoading && widgetEl && theme) {
      startup();
    }
  }, [dataLoading, settings, widgetEl]);

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
