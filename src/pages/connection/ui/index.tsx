import {reflect} from '@effector/reflect';
import {Link} from 'atomic-router-react';
import {useForm} from 'effector-forms';
import {FormEvent, useCallback, useEffect, useRef} from 'react';

import {connectionModel} from '~/entities/connection';

import {Command} from '~/shared/api';
import {routes} from '~/shared/routes';
import {Container, Input} from '~/shared/ui';

import {$form, currentRoute} from '../model';
import cls from './index.module.scss';

interface Props {
  params: {serverId: string};
  messages: Command[];
  isPending: boolean;
}

const View = (props: Props) => {
  const {params, messages, isPending} = props;
  const {submit, fields} = useForm($form);

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
    console.log(boxRef.current?.children.length);
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

          <div ref={logRef}>{isPending && <p>$: Loading...</p>}</div>
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

export const ConnectionPage = reflect<Props>({
  view: View,
  bind: {
    params: currentRoute.$params,
    messages: connectionModel.$connection,
    isPending: connectionModel.$connectionPending,
  },
  hooks: {
    mounted: connectionModel.pageMounted,
  },
});
