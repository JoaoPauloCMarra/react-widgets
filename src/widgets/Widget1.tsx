import React, { memo } from 'react';

import '../styles/widget1.scss';

const Widget1: React.FC = () => {
  return (
    <div className="widget1 center">
      <h2 data-testid="title">Widget1</h2>
    </div>
  );
};

export default memo(Widget1);
