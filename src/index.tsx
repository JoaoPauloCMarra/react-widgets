import { StrictMode } from 'react';
import { render } from 'react-dom';

import './styles/index.scss';
import { DEFAULT_LANGUAGE, ROOT_ELEMENT_ID, SupportedLanguages } from './Constants';
import { logError } from './utils/logger';
import { AppContext, AppContextProvider } from './context/AppContext';
import Loading from './shared/Loading';
import WidgetRenderer from './shared/WidgetRenderer';

class ReactWidget {
  params = {
    widget: '',
    token: '',
    language: String(SupportedLanguages[DEFAULT_LANGUAGE]),
  };

  constructor(params: WidgetParams) {
    this.params = params;
  }

  initiate() {
    try {
      let rootEl = document.getElementById(ROOT_ELEMENT_ID);
      if (!rootEl) {
        rootEl = document.createElement('div');
        rootEl.id = ROOT_ELEMENT_ID;
        document.body.appendChild(rootEl);
      }
      rootEl.className = 'react-widgets';

      render(
        <StrictMode>
          <AppContextProvider params={this.params}>
            <AppContext.Consumer>
              {({ initialLoading }) => (initialLoading ? <Loading /> : <WidgetRenderer />)}
            </AppContext.Consumer>
          </AppContextProvider>
        </StrictMode>,
        rootEl,
      );
    } catch (error) {
      logError('Initialization error: ', error);
    }
  }

  reload() {
    try {
      const rootEl = document.getElementById(ROOT_ELEMENT_ID);
      if (rootEl) {
        rootEl.parentElement?.removeChild(rootEl);
      }
      this.initiate();
    } catch (error) {
      logError('Reload error: ', error);
    }
  }
}

(window as any).ReactWidget = ReactWidget;
