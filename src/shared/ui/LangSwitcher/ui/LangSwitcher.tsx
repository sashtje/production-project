import {useTranslation} from "react-i18next";

import {Button} from "shared/ui";
import {classNames} from "shared/lib/classNames";

import cls from './LangSwitcher.module.scss';
import {ThemeButton} from "shared/ui/Button/ui/Button";

interface LangSwitcherProps {
    className?: string;
}

export const LangSwitcher = ({className}: LangSwitcherProps) => {
    const {t, i18n} = useTranslation();

    const toggle = () => {
        i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru');
    };

    return (
        <Button
            theme={ThemeButton.CLEAR}
            onClick={toggle}
            className={classNames(cls.langSwitcher, {}, [className])}
        >
            {t('Язык')}
        </Button>
    );
}