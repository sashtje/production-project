import { useDispatch, useSelector } from 'react-redux';
import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { classNames } from 'shared/lib/classNames';
import { AppLink, Button } from 'shared/ui';
import { Text, TextTheme } from 'shared/ui/Text';
import { ButtonTheme } from 'shared/ui/Button/ui/Button';
import { LoginModal } from 'features/AuthByUsername';
import {
  getUserAuthData, isUserAdmin, isUserManager, userActions,
} from 'entities/User';
import { AppRoutes, RoutePath } from 'shared/config/routerConfig/routerConfig';
import { AppLinkTheme } from 'shared/ui/AppLink/ui/AppLink';
import { Dropdown } from 'shared/ui/Popups/ui/Dropdown';
import { Avatar } from 'shared/ui/Avatar';
import { HStack } from 'shared/ui/Stack';
import { Icon } from 'shared/ui/Icon';
import NotificationIcon from 'shared/assets/icons/notifications-20-20.svg';
import { Popover } from 'shared/ui/Popups';

import cls from './Navbar.module.scss';

interface NavbarProps {
    className?: string;
}

export const Navbar = memo(({ className }: NavbarProps) => {
  const { t } = useTranslation();
  const [isAuthModal, setIsAuthModal] = useState(false);
  const authData = useSelector(getUserAuthData);
  const isAdmin = useSelector(isUserAdmin);
  const isManager = useSelector(isUserManager);
  const isAdminPanelAvailable = isAdmin || isManager;

  const dispatch = useDispatch();

  const onCloseModal = useCallback(() => {
    setIsAuthModal(false);
  }, []);

  const onShowModal = useCallback(() => {
    setIsAuthModal(true);
  }, []);

  const onLogout = useCallback(() => {
    dispatch(userActions.logout());
  }, [dispatch]);

  if (authData) {
    return (
      <header className={classNames(cls.navbar, {}, [className])}>
        <Text
          className={cls.appName}
          title={t('Блог')}
          theme={TextTheme.INVERTED}
        />

        <AppLink
          to={RoutePath[AppRoutes.ARTICLE_CREATE]}
          theme={AppLinkTheme.SECONDARY}
        >
          {t('Создать статью')}
        </AppLink>

        <HStack gap="16" className={cls.actions}>
          <Popover
            trigger={(
              <Button theme={ButtonTheme.CLEAR}>
                <Icon Svg={NotificationIcon} inverted />
              </Button>
            )}
            direction="bottom-right"
          >
            ===
          </Popover>

          <Dropdown
            direction="bottom-right"
            items={[
              ...(isAdminPanelAvailable ? [{
                content: t('Админка'),
                href: RoutePath.admin_panel,
              }] : []),
              {
                content: t('Профиль'),
                href: RoutePath.profile + authData.id,
              },
              {
                content: t('Выйти'),
                onClick: onLogout,
              },
            ]}
            trigger={<Avatar size={30} src={authData.avatar} />}
          />
        </HStack>
      </header>
    );
  }

  return (
    <header className={classNames(cls.navbar, {}, [className])}>
      <Button
        theme={ButtonTheme.CLEAR_INVERTED}
        className={cls.links}
        onClick={onShowModal}
      >
        {t('Войти')}
      </Button>

      {isAuthModal && (
        <LoginModal
          isOpen={isAuthModal}
          onClose={onCloseModal}
        />
      )}
    </header>
  );
});

Navbar.displayName = 'Navbar';
