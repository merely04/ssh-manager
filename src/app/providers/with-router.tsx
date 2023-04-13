import {ReactNode, Suspense} from 'react';
import {BrowserRouter, HashRouter} from 'react-router-dom';

export const withRouter = (component: () => ReactNode) => () => (
  <HashRouter>
    <Suspense fallback="Loading...">
      {component()}
    </Suspense>
  </HashRouter>
);