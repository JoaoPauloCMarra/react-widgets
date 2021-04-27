import { FunctionalComponent } from 'preact';
import { memo, useMemo } from 'preact/compat';

import { useDataLayer } from '../context/DataLayer';
import Loading from './Loading';
import Error from './Error';
import EmptyWidget from '../widgets/EmptyWidget';
import ListWidget from '../widgets/ListWidget';
import FormWidget from '../widgets/FormWidget';

const WidgetRenderer: FunctionalComponent = () => {
  const dataLayer = useDataLayer();
  const { widget, token } = dataLayer.settings || {};

  const child = useMemo(() => {
    const widgetList: { [key: string]: JSX.Element } = {
      default: <EmptyWidget />,
      list: <ListWidget data={dataLayer} />,
      form: <FormWidget />,
    };
    try {
      if (!widget) return widgetList.default;
      return widgetList[widget] || widgetList.default;
    } catch (error) {
      return widgetList.default;
    }
  }, [widget, dataLayer]);

  if (dataLayer.loading) {
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
