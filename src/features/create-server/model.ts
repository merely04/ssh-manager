import {attach, createEvent, createStore, forward, sample} from 'effector';
import {createForm} from 'effector-forms';

import {serverModel} from '~/entities/server';

import * as api from '~/shared/api';
import {CreateServer} from '~/shared/api';
import {rules} from '~/shared/rules';

export const open = createEvent();
export const close = createEvent();

export const $opened = createStore(false)
  .on(open, () => true)
  .on(close, () => false);

const createServerFx = attach({effect: api.createServerFx});
export const $loading = createServerFx.pending;

serverModel.$servers.on(createServerFx.doneData, (state, payload) => [...state, payload]);

export const $form = createForm<CreateServer>({
  fields: {
    name: {
      init: '',
      validateOn: ['change'],
      rules: [rules.required()],
    },
    host: {
      init: '',
      validateOn: ['change'],
      rules: [rules.required()],
    },
    username: {
      init: '',
      validateOn: ['change'],
      rules: [rules.required()],
    },
    password: {
      init: '',
      validateOn: ['change'],
      rules: [rules.required()],
    },
  },
  validateOn: ['submit'],
});

sample({
  clock: $opened,
  filter: (isOpen) => isOpen,
  target: $form.reset,
});

forward({
  from: $form.formValidated,
  to: createServerFx,
});

sample({
  clock: createServerFx.done,
  target: close,
});
