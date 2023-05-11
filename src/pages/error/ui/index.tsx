import {Link} from 'atomic-router-react';

import {routes} from '~/shared/routes';
import {Container} from '~/shared/ui';

export const ErrorPage = () => {
  return (
    <Container>
      <header>
        <h1>Произошла ошибка при подключении</h1>
      </header>

      <main>
        <Link to={routes.home}>Назад</Link>
      </main>
    </Container>
  );
};
