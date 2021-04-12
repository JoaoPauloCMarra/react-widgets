import React, { memo, useMemo } from 'react';

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

const WidgetRenderer: React.FC = () => {
  const { settings } = useDataContext();
  const { loading } = useAppContext();
  const { widget, token } = settings || {};

  if (loading) {
    return <Loading />;
  }
  if (!widget) {
    return <EmptyWidget />;
  }
  if (!token) {
    return <Error text="This widget requires the client Token" />;
  }

  const child = useMemo(() => {
    try {
      return widgetList[widget];
    } catch (error) {
      return widgetList.default;
    }
  }, [widget]);

  return <div className="widget-wrapper center">{child}</div>;
};

export default memo(WidgetRenderer);
