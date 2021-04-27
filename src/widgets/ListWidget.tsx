import { FunctionalComponent } from 'preact';
import { memo, useRef, useMemo, useState } from 'preact/compat';

import Form from '../shared/Form';
import List from '../shared/List';

type Route = 'list' | 'form';

interface Props {
  data: DataState;
  initialRoute?: Route;
}

const ListWidget: FunctionalComponent<Props> = ({ data, initialRoute = 'list' }) => {
  const [route, setRoute] = useState(initialRoute);
  const [transition, setTransition] = useState('');
  const transitionId = useRef<any>();

  const changeRoute = (route: Route) => {
    setRoute(route);
    setTransition('slide-in');
    if (transitionId.current) clearTimeout(transitionId.current);
    transitionId.current = setTimeout(() => setTransition(''), 250);
  };

  const routes: Routes = useMemo(() => {
    return {
      list: <List data={data} onClose={() => changeRoute('form')} />,
      form: <Form onClose={() => changeRoute('list')} />,
    };
  }, [data]);

  return (
    <div className="list-widget">
      <div className={`routes ${transition}`}>{routes[route]}</div>
    </div>
  );
};

export default memo(ListWidget);
