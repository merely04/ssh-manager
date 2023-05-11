import {useForm} from 'react-hook-form';
import {GoX} from 'react-icons/go';
import Modal from 'react-modal';

import {CreateServer} from '~/shared/api';
import {Input} from '~/shared/ui';

import {submit} from '../model';
import cls from './index.module.scss';

export type CreateServerModalProps = {
  isOpen: boolean;
  handleClose: () => void;
};

export const CreateServerModal = ({isOpen, handleClose}: CreateServerModalProps) => {
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<CreateServer>();

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

      <form
        style={{marginTop: 20}}
        className={cls.row}
        onSubmit={handleSubmit(async (data) => {
          await submit(data);
          handleClose();
        })}
      >
        <Input {...register('name', {required: true})} placeholder="Название" />
        {errors.name && <p>Придумайте название</p>}
        <Input {...register('host', {required: true})} placeholder="Хост / адрес" />
        {errors.host && <p>Заполните имя хост / адрес</p>}
        <Input {...register('username', {required: true})} placeholder="Пользователь" />
        {errors.username && <p>Заполните имя пользователя</p>}
        <Input {...register('password', {required: true})} type="password" placeholder="Пароль" />
        {errors.password && <p>Заполните пароль пользователя</p>}

        <button type="submit" className={cls.create}>
          Создать
        </button>
      </form>
    </Modal>
  );
};
