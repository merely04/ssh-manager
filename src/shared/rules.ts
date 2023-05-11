import {Rule} from 'effector-forms';

export const rules = {
  required: (): Rule<string> => ({
    name: 'required',
    validator: (value: string) => Boolean(value) && value.length > 0,
  }),
};
