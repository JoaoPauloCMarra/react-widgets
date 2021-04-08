import React, { memo, useEffect, useRef } from 'react';

import { ROOT_ELEMENT_ID, SUPPORTED_THEMES } from '../Constants';
import { useAppContext } from '../context/AppContext';
import EmptyWidget from '../widgets/EmptyWidget';
import Loading from './Loading';
import Error from './Error';

import DemoWidget from '../widgets/DemoWidget';
import { logError } from '../utils/logger';

const WidgetRenderer: React.FC = () => {
  const { loading, SetLoading, clientSettings } = useAppContext();
  const { widget, token } = clientSettings;
  const theme = useRef('');

  useEffect(() => {
    const setup = async () => {
      try {
        // logic to get token data from API could be here
        switch (token) {
          case 'demo_token_theme1':
            theme.current = 'theme1';
            break;
          case 'demo_token_theme2':
            theme.current = 'theme2';
            break;
          case 'demo_token_theme3':
            theme.current = 'theme3';
            break;
          default:
            break;
        }
        if (!SUPPORTED_THEMES.includes(theme.current)) {
          theme.current = '';
        }
        console.log({ token, ref: theme.current });
      } catch (error) {
        logError('Token check error: ', error);
      }

      const rootEl = document.getElementById(ROOT_ELEMENT_ID);
      if (rootEl) {
        rootEl.className += ' ' + theme.current;
      }
      clientSettings.theme = theme.current;
      SetLoading(false);
    };
    setup();
  }, []);

  if (loading) {
    document.title = 'loading...';
    return <Loading />;
  }
  if (!widget) {
    document.title = 'Something wrong...';
    return <EmptyWidget />;
  }
  if (!token) {
    document.title = 'Something wrong...';
    return <Error text="No token specified" />;
  }
  if (!theme || !SUPPORTED_THEMES.includes(theme.current)) {
    document.title = 'Something wrong...';
    return <Error text="Invalid theme" />;
  }

  let child: JSX.Element;
  switch (widget) {
    case 'demo-widget':
      document.title = 'Demo Widget';
      child = <DemoWidget />;
      break;
    default:
      child = <EmptyWidget />;
      break;
  }

  return <div className="widget-wrapper center">{child}</div>;
};

export default memo(WidgetRenderer);
