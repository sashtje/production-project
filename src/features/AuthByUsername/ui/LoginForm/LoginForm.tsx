import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { classNames } from 'shared/lib/classNames';
import { Button } from 'shared/ui';
import { Input } from 'shared/ui/Input';
import { ButtonTheme } from 'shared/ui/Button';
import { Text, TextTheme } from 'shared/ui/Text';

import { getLoginState } from '../../model/selectors/getLoginState/getLoginState';
import { loginByUsername } from '../../model/services/loginByUsername/loginByUsername';
import { loginActions } from '../../model/slices/loginSlice';

import cls from './LoginForm.module.scss';

interface LoginFormProps {
    className?: string;
}

export const LoginForm = memo((props: LoginFormProps) => {
  const { className } = props;

  const { t } = useTranslation();

  const dispatch = useDispatch();
  const {
    username, password, isLoading, error,
  } = useSelector(getLoginState);

  const onChangeUsername = useCallback((value: string) => {
    dispatch(loginActions.setUsername(value));
  }, [dispatch]);

  const onChangePassword = useCallback((value: string) => {
    dispatch(loginActions.setPassword(value));
  }, [dispatch]);

  const onLoginClick = useCallback(() => {
    dispatch(loginByUsername({ username, password }));
  }, [dispatch, password, username]);

  return (
    <div className={classNames(cls.loginForm, {}, [className])}>
      <Text title={t('Форма авторизации')} />

      {error && <Text text={t('Неверный логин или пароль')} theme={TextTheme.ERROR} />}

      <Input
        autofocus
        type="text"
        placeholder={t('Введите username')}
        className={cls.input}
        value={username}
        onChange={onChangeUsername}
      />

      <Input
        type="text"
        placeholder={t('Введите пароль')}
        className={cls.input}
        value={password}
        onChange={onChangePassword}
      />

      <Button
        theme={ButtonTheme.OUTLINE}
        className={cls.loginBtn}
        onClick={onLoginClick}
        disabled={isLoading}
      >
        {t('Войти')}
      </Button>
    </div>
  );
});
