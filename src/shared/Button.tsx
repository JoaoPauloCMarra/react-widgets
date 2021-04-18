import { FunctionalComponent } from 'preact';
import { memo } from 'preact/compat';

interface Props {
  children: string | JSX.Element;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'link';
  disabled?: boolean;
  'data-testid'?: string;
  onPress?: () => void;
}

const Button: FunctionalComponent<Props> = ({
  children,
  type = 'button',
  variant = 'primary',
  disabled,
  'data-testid': testId,
  onPress,
}) => {
  return (
    <button
      type={type}
      data-testid={testId || 'button'}
      className={`button-wrapper ${variant}`}
      onClick={onPress}
      disabled={disabled}>
      {children}
    </button>
  );
};

export default memo(Button);
