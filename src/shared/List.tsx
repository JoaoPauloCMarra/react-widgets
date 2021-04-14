import { FunctionalComponent } from 'preact';
import { memo } from 'preact/compat';

import { useDataContext } from '../context/DataContext';

interface Props {
  text?: string;
  onClose?: () => void;
  'data-testid'?: string;
}

const List: FunctionalComponent<Props> = ({ text, 'data-testid': testId }) => {
  const { translate } = useDataContext();

  return (
    <div className="list-wrapper center" data-testid={testId}>
      <div className="list-content">
        <h1 data-testid="title">{text}</h1>
        <h2 data-testid="subtitle">{text}</h2>
        <h4>{translate('LIST')}</h4>
      </div>
    </div>
  );
};

export default memo(List);
