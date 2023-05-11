import {RouteInstance} from 'atomic-router';
import {Link} from 'atomic-router-react';

import {Container} from '~/shared/ui';

interface LoaderProps {
  routeBack?: RouteInstance<NonNullable<unknown>>;
}

export const Loader = (props: LoaderProps) => {
  const {routeBack} = props;

  return (
    <Container>
      {routeBack && <Link to={routeBack}>Назад</Link>}
      <h1>Loading...</h1>
    </Container>
  );
};
