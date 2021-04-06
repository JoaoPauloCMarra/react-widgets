import React, { memo } from 'react';
import { useAppContext } from '../context/AppContext';

interface Props {
  text?: string;
}

const Loading: React.FC<Props> = ({ text }) => {
  const { Translate } = useAppContext();

  return (
    <div className="loading center">
      <div className="loading-content">
        <span>{text || `${Translate('loading')}...`}</span>
      </div>
    </div>
  );
};

export default memo(Loading);
