import { render } from 'preact';

import './styles/index.scss';
import { logError } from './utils/logger';
import { AppProvider } from './context/AppContext';
import { DataProvider } from './context/DataContext';
import WidgetRenderer from './shared/WidgetRenderer';

const renderWidget = (params: WidgetParams) => {
  if (!params.id) return;
  const rootEl = document.getElementById(params.id);
  if (!rootEl || rootEl.className.includes('react-widgets')) return;
  rootEl.className = 'react-widgets';
  render(
    <DataProvider params={params}>
      <AppProvider>
        <WidgetRenderer />
      </AppProvider>
    </DataProvider>,
    rootEl,
  );
};

const removeWidget = (params: WidgetParams) => {
  const rootEl = document.getElementById(params.id);
  if (rootEl) {
    render(<></>, rootEl);
    rootEl.className = '';
    rootEl.innerHTML = '';
  }
};

type ReactWidgetAppParams = WidgetParams | WidgetParams[];
type ReactWidgetApp = {
  params: ReactWidgetAppParams;
  initiate: (params: ReactWidgetAppParams) => void;
  reload: (params: ReactWidgetAppParams) => void;
};
const ReactWidget: ReactWidgetApp = {
  params: [
    {
      id: '',
      widget: '',
      token: '',
      language: 'en',
    },
  ],
  initiate: () => {},
  reload: () => {},
};

ReactWidget.initiate = (params: WidgetParams | WidgetParams[]) => {
  try {
    if (Array.isArray(params)) {
      for (const k in params) {
        if (Object.prototype.hasOwnProperty.call(params, k)) {
          renderWidget(params[k]);
        }
      }
    } else {
      renderWidget(params);
    }
    (window as any).ReactWidget.params = params;
  } catch (error) {
    logError('Initialization error: ', error);
  }
};

ReactWidget.reload = (params: WidgetParams | WidgetParams[]) => {
  try {
    if (Array.isArray(params)) {
      for (const k in params) {
        if (Object.prototype.hasOwnProperty.call(params, k)) {
          removeWidget(params[k]);
        }
      }
    } else {
      removeWidget(params);
    }
    ReactWidget.initiate(params);
  } catch (error) {
    logError('Reload error: ', error);
  }
};

(window as any).ReactWidget = ReactWidget;
