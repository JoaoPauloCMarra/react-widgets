import React, { memo, useEffect } from 'react';

import { useAppContext } from '../context/AppContext';
import EmptyWidget from '../widgets/EmptyWidget';
import Loading from './Loading';

import Widget1 from '../widgets/Widget1';

const WidgetRenderer: React.FC = () => {
  const { loading, SetLoading, selectedWidget } = useAppContext();

  useEffect(() => {
    // logic to prepare widget data
    const setup = async () => {
      await new Promise((res) => setTimeout(res, 1000)); // just a temp delay of 1s to simulate api call
      SetLoading(false);
    };
    setup();
  }, []);

  if (loading) {
    return <Loading />;
  }

  switch (selectedWidget) {
    case 'widget1':
      return <Widget1 />;
    default:
      return <EmptyWidget />;
  }
};

export default memo(WidgetRenderer);
