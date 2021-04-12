import React, { memo } from 'react';

interface Props {
  text?: string;
  onClose?: () => void;
  'data-testid'?: string;
}

const List: React.FC<Props> = ({ text, 'data-testid': testId }) => {
  return (
    <div className="list-wrapper center" data-testid={testId}>
      <div className="list-content">
        <h1 data-testid="title">{text}</h1>
        <h2 data-testid="subtitle">{text}</h2>
        <h4>LIST</h4>
      </div>
    </div>
  );
};

export default memo(List);
