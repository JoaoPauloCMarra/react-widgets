import { FunctionalComponent } from 'preact';
import { memo } from 'preact/compat';

import Error from '../shared/Error';

const EmptyWidget: FunctionalComponent = () => (
  <div className="empty-widget center">
    <div className="message">
      <Error text="Nothing to show" />
    </div>
  </div>
);

export default memo(EmptyWidget);
