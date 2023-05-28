import {RouteInstance} from 'atomic-router';
import {Link} from 'atomic-router-react';

import {Container} from '~/shared/ui';

interface LoaderProps {
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  routeBack?: RouteInstance<any>;
}

export const Loader = (props: LoaderProps) => {
  const {routeBack} = props;

  return (
    <Container>
      {routeBack && <Link to={routeBack}>Назад</Link>}
      <h1>Загрузка...</h1>
    </Container>
  );
};
