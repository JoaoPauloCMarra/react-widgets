import { memo } from 'react';

interface Props {
  children: string | JSX.Element;
  onPress: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'link';
  'data-testid'?: string;
}

const Button: React.FC<Props> = ({ variant, children, disabled, 'data-testid': testId, onPress }) => {
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
