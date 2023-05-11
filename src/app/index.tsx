import {Pages} from '~/pages';

import {withProviders} from './providers';
import './styles/index.scss';

const App = () => {
  return <Pages />;
};

export default withProviders(App);
