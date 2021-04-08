import React, { memo } from 'react';

interface Props {
  text?: string;
}

const Error: React.FC<Props> = ({ text }) => {
  return (
    <div className="error center">
      <div className="error-content">
        <span data-testid="text">{text}</span>
      </div>
    </div>
  );
};

export default memo(Error);
