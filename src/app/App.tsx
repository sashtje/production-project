import {useTheme} from "app/providers/ThemeProvider";
import {AppRouter} from "app/providers/router";

import {Navbar, Sidebar} from "widgets";

import {classNames} from "shared/lib/classNames";

import './styles/index.scss';

export const App = () => {
    const {theme} = useTheme();

    return (
        <div className={classNames('app', {}, [theme])}>
            <Navbar />

            <div className='content-page'>
                <Sidebar />
                <AppRouter />
            </div>
        </div>
    );
};