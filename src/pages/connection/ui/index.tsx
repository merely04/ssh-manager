import {Link} from 'atomic-router-react';
import {useForm} from 'effector-forms';
import {useUnit} from 'effector-react';
import {FormEvent, useCallback, useEffect, useRef} from 'react';

import {routes} from '~/shared/routes';
import {Container, Input} from '~/shared/ui';

import {$form, $messages, currentRoute} from '../model';
import cls from './index.module.scss';

export const ConnectionPage = () => {
  const {submit, fields} = useForm($form);
  const [params, messages] = useUnit([currentRoute.$params, $messages]);

  const logRef = useRef<HTMLDivElement | null>(null);
  const boxRef = useRef<HTMLDivElement | null>(null);

  const onFormSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      submit();
    },
    [submit],
  );

  useEffect(() => {
    logRef.current?.scrollIntoView();
  }, [messages]);

  return (
    <Container>
      <header>
        <Link to={routes.home}>Назад</Link>
        <h1>{params.serverId}</h1>
      </header>

      <main style={{marginTop: 20}}>
        <div className={cls.log} ref={boxRef}>
          {messages.map((message, index) => (
            <div key={index}>
              <pre>$: {message.user}</pre>
              <pre>server: {message.server}</pre>
            </div>
          ))}

          <div ref={logRef} />
        </div>
      </main>

      <form onSubmit={onFormSubmit}>
        <Input
          className={cls.input}
          placeholder={'Введите команду'}
          isInvalid={fields.command.hasError()}
          value={fields.command.value}
          onChange={(e) => fields.command.onChange(e.target.value)}
        />
      </form>
    </Container>
  );
};
