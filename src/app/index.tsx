import './index.scss';
import {withProviders} from './providers';
import {Routing} from '../pages';
import Modal from 'react-modal';

const App = () => {
  Modal.setAppElement('#root');

  return (
    <Routing/>
  );
};

export default withProviders(App);