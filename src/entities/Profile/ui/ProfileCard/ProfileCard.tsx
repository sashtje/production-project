import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { classNames } from 'shared/lib/classNames';
import { AppRoutes } from 'shared/config/routerConfig/routerConfig';
import { Text } from 'shared/ui/Text';
import { Button } from 'shared/ui';
import { ButtonTheme } from 'shared/ui/Button';
import { Input } from 'shared/ui/Input';

import { getProfileIsLoading } from '../../model/selectors/getProfileIsLoading/getProfileIsLoading';
import { getProfileError } from '../../model/selectors/getProfileError/getProfileError';
import { getProfileData } from '../../model/selectors/getProfileData/getProfileData';
import cls from './ProfileCard.module.scss';

interface ProfileCardProps {
    className?: string;
}

export const ProfileCard = (props: ProfileCardProps) => {
  const { className } = props;
  const { t } = useTranslation(AppRoutes.PROFILE);
  const data = useSelector(getProfileData);
  const isLoading = useSelector(getProfileIsLoading);
  const error = useSelector(getProfileError);

  return (
    <div className={classNames(cls.profileCard, {}, [className])}>
      <div className={cls.header}>
        <Text title={t('Профиль')} />

        <Button
          theme={ButtonTheme.OUTLINE}
          className={cls.editBtn}
        >
          {t('Редактировать')}
        </Button>
      </div>

      <div className={cls.data}>
        <Input
          value={data?.first}
          placeholder={t('Ваше имя')}
          className={cls.input}
        />
        <Input
          value={data?.lastname}
          placeholder={t('Ваше фамилия')}
          className={cls.input}
        />
      </div>
    </div>
  );
};
