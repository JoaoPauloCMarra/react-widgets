import { memo } from 'react';

interface Props {
  children: string | JSX.Element;
  variant?: 'primary' | 'link';
  'data-testid'?: string;
  onPress: () => void;
}

const Button: React.FC<Props> = ({ variant, children, 'data-testid': testId }) => {
  return (
    <button data-testid={testId} className={`button ${variant}`}>
      {children}
    </button>
  );
};

export default memo(Button);
