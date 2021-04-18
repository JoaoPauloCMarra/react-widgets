import { FunctionalComponent } from 'preact';
import { useEffect, useRef, useState } from 'preact/hooks';
import register from 'preact-custom-element';

import './styles/index.scss';
import { logError } from './utils/logger';
import { DataLayerProvider } from './context/DataLayer';
import WidgetRenderer from './shared/WidgetRenderer';
import Loading from './shared/Loading';

const Main: FunctionalComponent<WidgetParams> = (props) => {
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
      {el ? (
        <DataLayerProvider params={props} widgetEl={el}>
          <WidgetRenderer />
        </DataLayerProvider>
      ) : (
        <Loading />
      )}
    </div>
  );
};

register(Main, 'react-widgets', ['widget', 'token'], { shadow: false });
