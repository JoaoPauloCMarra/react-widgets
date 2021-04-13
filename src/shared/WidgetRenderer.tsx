import { FunctionalComponent } from 'preact';
import { memo, useMemo } from 'preact/compat';

import { useDataContext } from '../context/DataContext';
import { useAppContext } from '../context/AppContext';
import { renderWidget, EmptyWidget } from '../widgets';
import Loading from './Loading';
import Error from './Error';

const WidgetRenderer: FunctionalComponent = () => {
  const { settings } = useDataContext();
  const { loading } = useAppContext();
  const { widget, token } = settings || {};
  const child = useMemo(() => renderWidget(widget), [widget]);

  if (loading) {
    return <Loading />;
  }
  if (!widget) {
    return <EmptyWidget />;
  }
  if (!token) {
    return <Error text="This widget requires the client Token" />;
  }

  return <div className="widget-wrapper center">{child}</div>;
};

export default memo(WidgetRenderer);
