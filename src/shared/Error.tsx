import React, { memo } from 'react';

interface Props {
  text?: string;
  'data-testid'?: string;
}

const Error: React.FC<Props> = ({ text, 'data-testid': testId }) => {
  return (
    <div className="error-wrapper center">
      <div className="error-content">
        <span data-testid={testId || 'error-text'}>{text}</span>
      </div>
    </div>
  );
};

export default memo(Error);
