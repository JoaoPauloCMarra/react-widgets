import { FunctionalComponent } from 'preact';
import { memo } from 'preact/compat';

interface Props {
  children: string | JSX.Element;
  onPress: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'link';
  'data-testid'?: string;
}

const Button: FunctionalComponent<Props> = ({ variant, children, disabled, 'data-testid': testId, onPress }) => {
  return (
    <button
      data-testid={testId || 'button'}
      className={`button-wrapper ${variant}`}
      onClick={onPress}
      disabled={disabled}>
      {children}
    </button>
  );
};

export default memo(Button);
