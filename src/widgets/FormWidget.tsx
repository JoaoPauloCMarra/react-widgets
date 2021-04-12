import React, { memo, useMemo, useRef, useState } from 'react';

import Form from '../shared/Form';

type Route = 'entryForm' | 'form1';

interface Props {
  initialRoute?: Route;
}

const FormWidget: React.FC<Props> = ({ initialRoute = 'entryForm' }) => {
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
      entryForm: <Form />,
      form1: <Form onClose={() => changeRoute('entryForm')} />,
    };
  }, []);

  return (
    <div className="form-widget center">
      <div className={`routes ${transition}`}>{routes[route]}</div>
    </div>
  );
};

export default memo(FormWidget);
