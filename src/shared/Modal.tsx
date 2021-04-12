import React, { memo, useEffect, useState } from 'react';

import CloseIcon from './icons/CloseIcon';

interface Props {
  show?: boolean;
  title?: string;
  hideOverlay?: boolean;
  contentCmp?: React.ReactNode;
  actionsCmp?: React.ReactNode;
  onClose?: () => void;
  'data-testid'?: string;
}

const Modal: React.FC<Props> = ({
  show,
  title = '',
  hideOverlay,
  contentCmp,
  actionsCmp,
  onClose,
  'data-testid': testId,
}) => {
  const [fade, setFade] = useState('hidden');

  useEffect(() => {
    if (!show && fade === 'hidden') {
      setFade('hidden');
    } else {
      if (!show) {
        setFade('out');
        setTimeout(() => setFade('hidden'), 250);
      } else {
        setFade('transp');
        setTimeout(() => setFade('in'), 100);
      }
    }
  }, [show]);

  return (
    <div className={`modal-wrapper${hideOverlay ? '' : ' modal-overlay'} fade-${fade}`} data-testid={testId}>
      <div className="modal">
        <div className="header">
          <p className="modal-title font-bolder">{title}</p>
          <button onClick={onClose} className="modal-close">
            <CloseIcon />
          </button>
        </div>
        {contentCmp && <div className="modal-content">{contentCmp}</div>}
        {actionsCmp && <div className="modal-actions">{actionsCmp}</div>}
      </div>
    </div>
  );
};

export default memo(Modal);
