import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { classNames } from '@/shared/lib/classNames';
import { Input as InputDeprecated } from '@/shared/ui/deprecated/Input';
import { Input } from '@/shared/ui/redesigned/Input';
import { Button as ButtonDeprecated, ButtonTheme } from '@/shared/ui/deprecated/Button';
import { Button } from '@/shared/ui/redesigned/Button';
import { Text as TextDeprecated, TextTheme } from '@/shared/ui/deprecated/Text';
import { Text } from '@/shared/ui/redesigned/Text';
import {
  DynamicModuleLoader,
  ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme';
import { ToggleFeatures } from '@/shared/lib/features';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { useForceUpdate } from '@/shared/render/forceUpdate';

import { getLoginUsername } from '../../model/selectors/getLoginUsername/getLoginUsername';
import { getLoginPassword } from '../../model/selectors/getLoginPassword/getLoginPassword';
import { getLoginIsLoading } from '../../model/selectors/getLoginIsLoading/getLoginIsLoading';
import { getLoginError } from '../../model/selectors/getLoginError/getLoginError';
import { loginByUsername } from '../../model/services/loginByUsername/loginByUsername';
import { loginActions, loginReducer } from '../../model/slices/loginSlice';
import cls from './LoginForm.module.scss';

export interface LoginFormProps {
  className?: string;
  onSuccess: () => void;
}

const initialReducers: ReducersList = {
  loginForm: loginReducer,
};

export const LoginForm = memo((props: LoginFormProps) => {
  const { className, onSuccess } = props;

  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const username = useSelector(getLoginUsername);
  const password = useSelector(getLoginPassword);
  const isLoading = useSelector(getLoginIsLoading);
  const error = useSelector(getLoginError);
  const forceUpdate = useForceUpdate();
  const { setTheme } = useTheme();

  const onChangeUsername = useCallback(
    (value: string) => {
      dispatch(loginActions.setUsername(value));
    },
    [dispatch],
  );

  const onChangePassword = useCallback(
    (value: string) => {
      dispatch(loginActions.setPassword(value));
    },
    [dispatch],
  );

  const onLoginClick = useCallback(async () => {
    const result = await dispatch(loginByUsername({ username, password }));

    if (result.meta.requestStatus === 'fulfilled') {
      if (typeof result?.payload === 'object' && result?.payload?.jsonSettings?.theme) {
        setTheme?.(result.payload.jsonSettings.theme);
      }
      onSuccess();
      forceUpdate();
    }
  }, [onSuccess, dispatch, password, username, setTheme, forceUpdate]);

  return (
    <DynamicModuleLoader reducers={initialReducers} removeAfterUnmount>
      <ToggleFeatures
        feature="isAppRedesigned"
        on={
          <VStack gap="16" className={classNames(cls.loginForm, {}, [className])}>
            <Text title={t('Форма авторизации')} />

            {error && <Text text={t('Неверный логин или пароль')} variant="error" />}

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

            <Button className={cls.loginBtn} onClick={onLoginClick} disabled={isLoading}>
              {t('Войти')}
            </Button>
          </VStack>
        }
        off={
          <div className={classNames(cls.loginForm, {}, [className])}>
            <TextDeprecated title={t('Форма авторизации')} />

            {error && (
              <TextDeprecated text={t('Неверный логин или пароль')} theme={TextTheme.ERROR} />
            )}

            <InputDeprecated
              autofocus
              type="text"
              placeholder={t('Введите username')}
              className={cls.input}
              value={username}
              onChange={onChangeUsername}
            />

            <InputDeprecated
              type="text"
              placeholder={t('Введите пароль')}
              className={cls.input}
              value={password}
              onChange={onChangePassword}
            />

            <ButtonDeprecated
              theme={ButtonTheme.OUTLINE}
              className={cls.loginBtn}
              onClick={onLoginClick}
              disabled={isLoading}
            >
              {t('Войти')}
            </ButtonDeprecated>
          </div>
        }
      />
    </DynamicModuleLoader>
  );
});
