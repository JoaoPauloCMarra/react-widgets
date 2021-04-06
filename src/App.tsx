import React from 'react';

import { AppContext, AppContextProvider } from './context/AppContext';
import WidgetRenderer from './shared/WidgetRenderer';
import Loading from './shared/Loading';

const App: React.FC = () => (
  <AppContextProvider>
    <AppContext.Consumer>
      {({ initialLoading }) => (initialLoading ? <Loading /> : <WidgetRenderer />)}
    </AppContext.Consumer>
  </AppContextProvider>
);

export default App;
