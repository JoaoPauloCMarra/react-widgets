import { FunctionalComponent } from 'preact';
import { memo } from 'preact/compat';

interface Props {
  text?: string;
  'data-testid'?: string;
}

const Error: FunctionalComponent<Props> = ({ text, 'data-testid': testId }) => {
  return (
    <div className="error-wrapper center">
      <div className="error-content">
        <span data-testid={testId || 'error-text'}>{text}</span>
      </div>
    </div>
  );
};

export default memo(Error);
