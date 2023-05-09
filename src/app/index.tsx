import Modal from 'react-modal';

import {Routing} from '../pages';
import './index.scss';
import {withProviders} from './providers';

const App = () => {
  Modal.setAppElement('#root');

  return <Routing />;
};

export default withProviders(App);
