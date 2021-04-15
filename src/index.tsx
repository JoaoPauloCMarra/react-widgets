import { FunctionalComponent } from 'preact';
import { useEffect, useRef, useState } from 'preact/hooks';
import register from 'preact-custom-element';

import './styles/index.scss';
import { logError } from './utils/logger';
import { AppProvider } from './context/AppContext';
import { DataProvider } from './context/DataContext';
import WidgetRenderer from './shared/WidgetRenderer';

interface WebComponent extends FunctionalComponent<WidgetParams> {
  tagName: string;
  observedAttributes: string[];
}

const Main: WebComponent = (props) => {
  const [el, setEl] = useState(null);
  const ref = useRef(null);
  useEffect(() => {
    setEl(ref.current);
  }, [ref]);

  if (!props.widget || !props.token) {
    logError('React Widgets Error', 'Widget or Token not provided...');
    return <></>;
  }

  return (
    <div className="react-widgets" ref={ref}>
      {el && (
        <DataProvider params={props}>
          <AppProvider widgetEl={el}>
            <WidgetRenderer />
          </AppProvider>
        </DataProvider>
      )}
    </div>
  );
};
Main.tagName = 'react-widgets';
Main.observedAttributes = ['widget', 'token'];

register(Main, 'react-widgets', [], { shadow: false });
