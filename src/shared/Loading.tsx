import { FunctionalComponent } from 'preact';
import { memo } from 'preact/compat';

const Loading: FunctionalComponent = () => (
  <div className="loading-wrapper center">
    <div className="loading-content">
      <div className="loading-ellipsis">
        <div />
        <div />
        <div />
        <div />
      </div>
    </div>
  </div>
);

export default memo(Loading);
