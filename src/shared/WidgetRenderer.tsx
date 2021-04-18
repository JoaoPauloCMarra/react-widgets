import { FunctionalComponent } from 'preact';
import { memo, useMemo } from 'preact/compat';

import { useDataContext } from '../context/DataContext';
import { useAppContext } from '../context/AppContext';
import Loading from './Loading';
import Error from './Error';
import EmptyWidget from '../widgets/EmptyWidget';
import ListWidget from '../widgets/ListWidget';
import FormWidget from '../widgets/FormWidget';

const widgetList: { [key: string]: JSX.Element } = {
  default: <EmptyWidget />,
  list: <ListWidget />,
  form: <FormWidget />,
};

const WidgetRenderer: FunctionalComponent = () => {
  const { settings } = useDataContext();
  const { loading } = useAppContext();
  const { widget, token } = settings || {};
  const child = useMemo(() => {
    try {
      if (!widget) return widgetList.default;
      return widgetList[widget] || widgetList.default;
    } catch (error) {
      return widgetList.default;
    }
  }, [widget]);

  if (loading) {
    return <Loading />;
  }
  if (!widget) {
    return <EmptyWidget />;
  }
  if (!token) {
    return <Error text="This widget requires the client Token" />;
  }

  return <div className="widget-wrapper">{child}</div>;
};

export default memo(WidgetRenderer);
