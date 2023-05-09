import {useForm} from 'react-hook-form';
import {GoX} from 'react-icons/go';
import Modal from 'react-modal';

import {createServerModel} from '..';
import {localApi} from '../../../shared/api';
import styles from './index.module.scss';

export type CreateServerModalProps = {
  isOpen: boolean;
  handleClose: () => void;
};

export const CreateServerModal = ({isOpen, handleClose}: CreateServerModalProps) => {
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<localApi.servers.CreateServerParams>();

  return (
    <Modal
      className={styles.modal}
      overlayClassName={styles.overlay}
      isOpen={isOpen}
      onRequestClose={handleClose}
    >
      <header className={styles.header}>
        <h2>Create Server</h2>
        <button className={styles.close} onClick={handleClose}>
          <GoX size={16} />
        </button>
      </header>

      <form
        style={{marginTop: 20}}
        className={styles.row}
        onSubmit={handleSubmit(async (data) => {
          await createServerModel.events.createServer(data);
          handleClose();
        })}
      >
        <input
          className={styles.input}
          {...register('name', {required: true})}
          placeholder="Название"
        />
        {errors.name && <p>Придумайте название</p>}
        <input
          className={styles.input}
          {...register('host', {required: true})}
          placeholder="Хост / адрес"
        />
        {errors.host && <p>Заполните имя хост / адрес</p>}
        <input
          className={styles.input}
          {...register('username', {required: true})}
          placeholder="Пользователь"
        />
        {errors.username && <p>Заполните имя пользователя</p>}
        <input
          className={styles.input}
          {...register('password', {required: true})}
          type="password"
          placeholder="Пароль"
        />
        {errors.password && <p>Заполните пароль пользователя</p>}

        <button type="submit" className={styles.create}>
          Создать
        </button>
      </form>
    </Modal>
  );
};
