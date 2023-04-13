import ReactDOM from 'react-dom/client';
import App from './app';

window.eel.set_host('ws://localhost:8080');

ReactDOM
  .createRoot(document.getElementById('root') as HTMLElement)
  .render(<App/>);
