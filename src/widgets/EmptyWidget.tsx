import { FunctionalComponent } from 'preact';
import { memo } from 'preact/compat';

import Error from '../shared/Error';

const EmptyWidget: FunctionalComponent = () => (
  <div className="widget-empty">
    <Error text="Nothing to show" />
  </div>
);

export default memo(EmptyWidget);
