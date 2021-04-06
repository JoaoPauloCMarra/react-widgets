import React, { memo } from 'react';

import '../styles/widget-empty.scss';

const EmptyWidget: React.FC = () => {
  return (
    <div className="widget-empty center">
      <h2 data-testid="title">EmptyWidget</h2>
    </div>
  );
};

export default memo(EmptyWidget);
