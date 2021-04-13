import { FunctionalComponent } from 'preact';
import { memo, useState } from 'preact/compat';
import { logError } from '../utils/logger';

interface Props {
  src?: string;
  alt?: string;
  'data-testid'?: string;
}

const Error: FunctionalComponent<Props> = ({ src, alt = '...', 'data-testid': testId }) => {
  const [loading, setLoading] = useState(true);

  const onLoad = () => {
    setLoading(false);
  };

  const onError = (e: any) => {
    logError('Image Loader', `image: ${src}\n`, e);
  };

  return (
    <span className={`image-wrapper${loading ? ' hidden' : ''}`}>
      <img data-testid={testId} src={src} alt={alt} onLoad={onLoad} onError={onError} />
    </span>
  );
};

export default memo(Error);
