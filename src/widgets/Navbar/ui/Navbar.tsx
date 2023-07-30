import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { classNames } from 'shared/lib/classNames';
import { Modal } from 'shared/ui/Modal/Modal';
import { Button } from 'shared/ui';
import { ButtonTheme } from 'shared/ui/Button/ui/Button';

import cls from './Navbar.module.scss';

interface NavbarProps {
    className?: string;
}

export const Navbar = ({ className }: NavbarProps) => {
  const { t } = useTranslation();
  const [isAuthModal, setIsAuthModal] = useState(false);

  const onToggleModal = useCallback(() => {
    setIsAuthModal((prev) => !prev);
  }, []);

  return (
    <div className={classNames(cls.navbar, {}, [className])}>
      <Button
        theme={ButtonTheme.CLEAR_INVERTED}
        className={cls.links}
        onClick={onToggleModal}
      >
        {t('Войти')}
      </Button>

      {/* eslint-disable-next-line i18next/no-literal-string */}
      <Modal isOpen={isAuthModal} onClose={onToggleModal}>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        Dolore earum esse fuga impedit iure mollitia sint veniam.
        Excepturi, iure, voluptatem?
      </Modal>
    </div>
  );
};
