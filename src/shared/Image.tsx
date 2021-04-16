import { FunctionalComponent } from 'preact';
import { memo, useCallback, useEffect, useMemo, useState } from 'preact/compat';

import { logError } from '../utils/logger';

interface Props {
  src?: string;
  alt?: string;
  height?: number | string;
  width?: number | string;
  'data-testid'?: string;
}

const Error: FunctionalComponent<Props> = ({ src, alt = '...', height, width, 'data-testid': testId }) => {
  const [loading, setLoading] = useState(true);

  const onLoad = useCallback(() => {
    setLoading(false);
  }, []);

  const onError = useCallback(
    (e: any) => {
      logError('Image Loader', `image: ${src}\n`, e);
    },
    [src],
  );

  useEffect(() => {
    if (src) {
      const preloader = new Image();
      preloader.src = src;
      preloader.onload = onLoad;
      preloader.onerror = onError;
    }
  }, [src, onLoad, onError]);

  const style = useMemo(() => ({ height, width }), [height, width]);

  return (
    <span className={`image-wrapper${loading ? ' hidden' : ''}`}>
      {loading && <div className="image-preloader" style={style} />}
      {!loading && <img data-testid={testId} src={src} alt={alt} style={style} />}
    </span>
  );
};

export default memo(Error);
