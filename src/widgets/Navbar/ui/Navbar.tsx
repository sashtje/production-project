import { AppLink } from 'shared/ui';
import { classNames } from 'shared/lib/classNames';
import { AppLinkTheme } from 'shared/ui/AppLink/ui/AppLink';

import { useTranslation } from 'react-i18next';
import cls from './Navbar.module.scss';

interface NavbarProps {
    className?: string;
}

export const Navbar = ({ className }: NavbarProps) => {
  const { t: tMain } = useTranslation('main');
  const { t: tAbout } = useTranslation('about');

  return (
    <div className={classNames(cls.navbar, {}, [className])}>
      <div className={cls.links}>
        <AppLink theme={AppLinkTheme.SECONDARY} to="/">{tMain('Главная страница')}</AppLink>
        <AppLink theme={AppLinkTheme.SECONDARY} to="/about">{tAbout('О сайте')}</AppLink>
      </div>
    </div>
  );
};
