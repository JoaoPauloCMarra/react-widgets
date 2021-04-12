import React, { memo } from 'react';

const Loading: React.FC = () => (
  <div className="loading-wrapper center">
    <div className="loading-content">
      <div className="loading-ellipsis">
        <div />
        <div />
        <div />
        <div />
      </div>
    </div>
  </div>
);

export default memo(Loading);
