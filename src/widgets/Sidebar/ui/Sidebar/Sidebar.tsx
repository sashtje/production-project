import {useState} from "react";

import {classNames} from "shared/lib/classNames";
import {ThemeSwitcher, LangSwitcher} from "shared/ui";

import cls from './Sidebar.module.scss';

interface SidebarProps {
    className?: string;
}

export const Sidebar = ({className}: SidebarProps) => {
    const [collapsed, setCollapsed] = useState(false);

    const onToggle = () => {
      setCollapsed(prev => !prev);
    };

    return (
        <div
            className={classNames(cls.sidebar, {[cls.collapsed]: collapsed}, [className])}
        >
            <button onClick={onToggle}>toggle</button>

            <div className={cls.switchers}>
                <ThemeSwitcher />
                <LangSwitcher />
            </div>
        </div>
    );
}