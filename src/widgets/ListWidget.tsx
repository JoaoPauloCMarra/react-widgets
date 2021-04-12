import React, { memo, useMemo, useRef, useState } from 'react';

import Form from '../shared/Form';
import List from '../shared/List';

type Route = 'list' | 'form';

interface Props {
  initialRoute?: Route;
}

const ListWidget: React.FC<Props> = ({ initialRoute = 'list' }) => {
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
      list: <List onClose={() => changeRoute('form')} />,
      form: <Form onClose={() => changeRoute('list')} />,
    };
  }, []);

  return (
    <div className="list-widget center">
      <div className={`routes ${transition}`}>{routes[route]}</div>
    </div>
  );
};

export default memo(ListWidget);
