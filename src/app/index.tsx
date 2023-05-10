import {Pages} from '~/pages';

import './index.scss';
import {withProviders} from './providers';

const App = () => {
  return <Pages />;
};

export default withProviders(App);
