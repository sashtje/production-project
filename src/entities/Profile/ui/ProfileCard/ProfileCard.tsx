import { useTranslation } from 'react-i18next';

import { classNames } from '@/shared/lib/classNames';
import { Text } from '@/shared/ui/redesigned/Text';
import { Input } from '@/shared/ui/redesigned/Input';
import { Currency, CurrencySelect } from '@/entities/Currency';
import { Country, CountrySelect } from '@/entities/Country';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Card } from '@/shared/ui/redesigned/Card';
import { Avatar } from '@/shared/ui/redesigned/Avatar';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';

import { Profile } from '../../model/types/profile';
import cls from './ProfileCard.module.scss';

interface ProfileCardProps {
  className?: string;
  data?: Profile;
  isLoading?: boolean;
  error?: string;
  readonly?: boolean;
  onChangeFirstname?: (value: string) => void;
  onChangeLastname?: (value: string) => void;
  onChangeAge?: (value: string) => void;
  onChangeCity?: (value: string) => void;
  onChangeUsername?: (value: string) => void;
  onChangeAvatar?: (value: string) => void;
  onChangeCurrency?: (currency: Currency) => void;
  onChangeCountry?: (country: Country) => void;
}

export const ProfileCard = (props: ProfileCardProps) => {
  const {
    className,
    data,
    isLoading,
    error,
    readonly,
    onChangeFirstname,
    onChangeLastname,
    onChangeAge,
    onChangeCity,
    onChangeUsername,
    onChangeAvatar,
    onChangeCurrency,
    onChangeCountry,
  } = props;
  const { t } = useTranslation('profile');

  if (isLoading) {
    return (
      <Card
        className={classNames(cls.profileCard, {}, [className])}
        fullwidth
        padding="24"
        borderRadius="partial"
      >
        <VStack gap="32" max>
          <HStack justify="center" max>
            <Skeleton width={120} height={120} borderRadius="50%" />
          </HStack>

          <HStack gap="24" max>
            <VStack gap="16" max>
              <Skeleton width="100%" height={38} />
              <Skeleton width="100%" height={38} />
              <Skeleton width="100%" height={38} />
              <Skeleton width="100%" height={38} />
            </VStack>

            <VStack gap="16" max>
              <Skeleton width="100%" height={38} />
              <Skeleton width="100%" height={38} />
              <Skeleton width="100%" height={38} />
              <Skeleton width="100%" height={38} />
            </VStack>
          </HStack>
        </VStack>
      </Card>
    );
  }

  if (error) {
    return (
      <Card
        className={classNames(cls.profileCard, {}, [className])}
        fullwidth
        padding="24"
        borderRadius="partial"
      >
        <HStack
          className={classNames(cls.profileCard, {}, [className, cls.error])}
          justify="center"
          max
        >
          <Text
            variant="error"
            title={t('Произошла ошибка при загрузке профиля')}
            text={t('Попробуйте обновить страницу')}
            align="center"
          />
        </HStack>
      </Card>
    );
  }

  return (
    <Card
      className={classNames(cls.profileCard, {}, [className])}
      fullwidth
      padding="24"
      borderRadius="partial"
    >
      <VStack gap="32">
        <HStack justify="center" max>
          <Avatar src={data?.avatar} alt={t('Аватар')} size={120} />
        </HStack>

        <HStack gap="24" max>
          <VStack gap="16" max>
            <Input
              value={data?.first}
              label={t('Имя')}
              onChange={onChangeFirstname}
              readonly={readonly}
              data-testid="ProfileCard.firstname"
            />
            <Input
              value={data?.lastname}
              label={t('Фамилия')}
              onChange={onChangeLastname}
              readonly={readonly}
              data-testid="ProfileCard.lastname"
            />
            <Input
              value={data?.age}
              label={t('Возраст')}
              onChange={onChangeAge}
              readonly={readonly}
            />
            <Input
              value={data?.city}
              label={t('Город')}
              onChange={onChangeCity}
              readonly={readonly}
            />
          </VStack>

          <VStack gap="16" max>
            <Input
              value={data?.username}
              label={t('Имя пользователя')}
              onChange={onChangeUsername}
              readonly={readonly}
            />
            <Input
              value={data?.avatar}
              label={t('Аватар')}
              onChange={onChangeAvatar}
              readonly={readonly}
            />
            <CurrencySelect
              value={data?.currency}
              onChange={onChangeCurrency}
              readonly={readonly}
            />
            <CountrySelect value={data?.country} onChange={onChangeCountry} readonly={readonly} />
          </VStack>
        </HStack>
      </VStack>
    </Card>
  );
};
