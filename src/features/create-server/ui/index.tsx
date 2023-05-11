import {sample} from 'effector';
import {useForm} from 'effector-forms';
import {FormEvent, useCallback} from 'react';
import {GoX} from 'react-icons/go';
import Modal from 'react-modal';

import {Input} from '~/shared/ui';

import {$form, serverCreated} from '../model';
import cls from './index.module.scss';

export type CreateServerModalProps = {
  isOpen: boolean;
  handleClose: () => void;
};

export const CreateServerModal = ({isOpen, handleClose}: CreateServerModalProps) => {
  const {fields, submit} = useForm($form);

  const onFormSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      submit();
    },
    [submit],
  );

  sample({
    clock: serverCreated,
    fn: () => handleClose(),
  });

  return (
    <Modal
      className={cls.modal}
      overlayClassName={cls.overlay}
      isOpen={isOpen}
      onRequestClose={handleClose}
    >
      <header className={cls.header}>
        <h2>Добавление сервера</h2>
        <button className={cls.close} onClick={handleClose}>
          <GoX size={16} />
        </button>
      </header>

      <form style={{marginTop: 20}} className={cls.row} onSubmit={onFormSubmit}>
        <Input
          isInvalid={fields.name.hasError()}
          value={fields.name.value}
          onChange={(e) => fields.name.onChange(e.target.value)}
          placeholder="Название"
        />
        {fields.name.hasError() && <p>Придумайте название</p>}
        <Input
          isInvalid={fields.host.hasError()}
          value={fields.host.value}
          onChange={(e) => fields.host.onChange(e.target.value)}
          placeholder="Хост / адрес"
        />
        {fields.host.hasError() && <p>Заполните имя хост / адрес</p>}
        <Input
          isInvalid={fields.username.hasError()}
          value={fields.username.value}
          onChange={(e) => fields.username.onChange(e.target.value)}
          placeholder="Пользователь"
        />
        {fields.username.hasError() && <p>Заполните имя пользователя</p>}
        <Input
          isInvalid={fields.password.hasError()}
          value={fields.password.value}
          onChange={(e) => fields.password.onChange(e.target.value)}
          type="password"
          placeholder="Пароль"
        />
        {fields.password.hasError() && <p>Заполните пароль пользователя</p>}

        <button type="submit" className={cls.create}>
          Создать
        </button>
      </form>
    </Modal>
  );
};
