import { useTranslation } from 'react-i18next';

import { classNames } from 'shared/lib/classNames';
import { Button } from 'shared/ui';
import { Input } from 'shared/ui/Input';

import cls from './LoginForm.module.scss';

interface LoginFormProps {
    className?: string;
}

export const LoginForm = (props: LoginFormProps) => {
  const { className } = props;

  const { t } = useTranslation();

  return (
    <div className={classNames(cls.loginForm, {}, [className])}>
      <Input
        autofocus
        type="text"
        placeholder={t('Введите username')}
        className={cls.input}
      />
      <Input
        type="text"
        placeholder={t('Введите пароль')}
        className={cls.input}
      />

      <Button className={cls.loginBtn}>{t('Войти')}</Button>
    </div>
  );
};
