import {createRoot} from 'react-dom/client';
import Modal from 'react-modal';

import {appStarted} from '~/shared/config/init';

import App from './app';

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);

window.eel.set_host('ws://localhost:8080');

appStarted();

Modal.setAppElement(container);
root.render(<App />);
