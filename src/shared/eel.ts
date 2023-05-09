import {sample} from 'effector';

import {appStarted} from '~/shared/config/init';

export const eel = window.eel;

sample({
  clock: appStarted,
  fn: () => eel.set_host('ws://localhost:8080'),
});
