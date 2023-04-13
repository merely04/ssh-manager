import {useForm} from 'react-hook-form';
import Modal from 'react-modal';
import {createServerModel} from '..';
import {localApi} from '../../../shared/api';
import styles from './index.module.scss';
import {GoX} from 'react-icons/go';

export type CreateServerModalProps = {
  isOpen: boolean;
  handleClose: () => void;
}

export const CreateServerModal = ({isOpen, handleClose}: CreateServerModalProps) => {
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<localApi.servers.CreateServerParams>();

  return <Modal
    className={styles.modal}
    overlayClassName={styles.overlay}
    isOpen={isOpen}
    onRequestClose={handleClose}
  >
    <header className={styles.header}>
      <h2>Create Server</h2>
      <button className={styles.close} onClick={handleClose}>
        <GoX size={16}/>
      </button>
    </header>

    <form className={styles.row} onSubmit={handleSubmit((data) => createServerModel.events.createServer(data))}>
      <input className={styles.input} {...register('name', {required: true})} placeholder="Название"/>
      {errors.name && <p>Придумайте название</p>}
      <input className={styles.input} {...register('host', {required: true})} placeholder="Хост / адресс"/>
      {errors.host && <p>Заполните имя хост / адресс</p>}
      <input className={styles.input} {...register('username', {required: true})} placeholder="Пользователь"/>
      {errors.username && <p>Заполните имя пользователя</p>}
      <input className={styles.input} {...register('password', {required: true})} type="Пароль"
             placeholder="password"/>
      {errors.password && <p>Заполните пароль пользователя</p>}

      <button type="submit" className={styles.create}>Создать</button>
    </form>
  </Modal>;
};