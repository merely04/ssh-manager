import {createEvent, forward, sample} from 'effector';
import {createForm} from 'effector-forms';

import {serverModel} from '~/entities/server';
import {createServerFx} from '~/entities/server/model';

import {CreateServer} from '~/shared/api';
import {rules} from '~/shared/rules';

export const serverCreated = createEvent();

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

forward({
  from: $form.formValidated,
  to: serverModel.createServerFx,
});

sample({
  clock: createServerFx.done,
  target: serverCreated,
});
