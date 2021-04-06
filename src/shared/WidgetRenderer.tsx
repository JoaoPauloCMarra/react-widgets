import React from 'react';
import EmptyWidget from '../widgets/EmptyWidget';
import Widget1 from '../widgets/Widget1';

interface Props {
  widget: string;
}

const WidgetRenderer: React.FC<Props> = ({ widget }) => {
  switch (widget) {
    case 'widget1':
      return <Widget1 />;
    default:
      return <EmptyWidget />;
  }
};

export default WidgetRenderer;
