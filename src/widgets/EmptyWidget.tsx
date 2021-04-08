import React, { memo } from 'react';
import Error from '../shared/Error';

const EmptyWidget: React.FC = () => (
  <div className="widget-empty">
    <Error text="Nothing to show" />
  </div>
);

export default memo(EmptyWidget);
