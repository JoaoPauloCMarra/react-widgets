import React, { StrictMode } from 'react';

import { AppContext, AppContextProvider } from './context/AppContext';
import Loading from './shared/Loading';
import WidgetRenderer from './shared/WidgetRenderer';

const App: React.FC = () => {
  return (
    <StrictMode>
      <AppContextProvider>
        <AppContext.Consumer>
          {({ initialLoading, selectedWidget }) => {
            if (initialLoading) return <Loading />;
            return <WidgetRenderer widget={selectedWidget} />;
          }}
        </AppContext.Consumer>
      </AppContextProvider>
    </StrictMode>
  );
};

export default App;
