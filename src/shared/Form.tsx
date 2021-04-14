import { FunctionalComponent } from 'preact';
import { memo } from 'preact/compat';

import { useDataContext } from '../context/DataContext';

interface Props {
  text?: string;
  onClose?: () => void;
  'data-testid'?: string;
}

const Form: FunctionalComponent<Props> = ({ text, 'data-testid': testId }) => {
  const { translate } = useDataContext();

  return (
    <div className="form-wrapper center" data-testid={testId}>
      <div className="form-content">
        <h1 data-testid="title">{text}</h1>
        <h2 data-testid="subtitle">{text}</h2>
        <h4>{translate('FORM')}</h4>
      </div>
    </div>
  );
};

export default memo(Form);
