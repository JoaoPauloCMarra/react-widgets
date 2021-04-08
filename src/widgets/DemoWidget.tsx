import React, { memo } from 'react';
import { useAppContext } from '../context/AppContext';

import Button from '../shared/Button';

const DemoWidget: React.FC = () => {
  const { Translate } = useAppContext();

  const onCreatePressed = () => {
    console.log('create an alert...');
  };
  const onHelpPressed = () => {
    console.log('show help to the user...');
  };

  return (
    <div className="demo-widget center">
      <h2 className="title" data-testid="title">
        {Translate('TITLE')}
      </h2>
      <p className="subtitle" data-testid="subtitle">
        {Translate('SUBTITLE')}
      </p>
      <div className="actions">
        <Button onPress={onCreatePressed} variant="primary" data-testid="create-alert-btn">
          <span className="font-bold">{Translate('ACTION_1')}</span>
        </Button>
        <Button onPress={onHelpPressed} variant="link" data-testid="help-btn">
          <span className="font-normal">{Translate('ACTION_2')}</span>
        </Button>
      </div>
    </div>
  );
};

export default memo(DemoWidget);
