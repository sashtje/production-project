import { Suspense } from "react";
import {useTranslation} from "react-i18next";

import {useTheme} from "app/providers/ThemeProvider";
import {AppRouter} from "app/providers/router";

import {Navbar, Sidebar} from "widgets";

import {classNames} from "shared/lib/classNames";

import './styles/index.scss';

export const App = () => {
    const {theme} = useTheme();

    return (
        <div className={classNames('app', {}, [theme])}>
            <Suspense fallback="">
                <Navbar />

                <div className='content-page'>
                    <Sidebar />
                    <AppRouter />
                </div>
            </Suspense>
        </div>
    );
};