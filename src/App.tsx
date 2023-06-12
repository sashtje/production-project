import {Suspense, useContext} from 'react';
import {Routes, Route, Link} from "react-router-dom";

import {AboutPageAsync} from "./pages/AboutPage/AboutPage.async";
import {MainPageAsync} from "./pages/MainPage/MainPage.async";
import {Theme} from "./theme/ThemeContext";
import {useTheme} from "./theme/useTheme";

import './styles/index.scss';

export const App = () => {
    const {theme, toggleTheme} = useTheme();

    return (
        <div className={`app ${theme}`}>
            <button onClick={toggleTheme}>{theme === Theme.DARK ? 'Light' : 'Dark'}</button>

            <Link to={'/'}>Главная</Link>
            <Link to={'/about'}>О сайте</Link>

            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    <Route path={'/about'} element={<AboutPageAsync />} />
                    <Route path={'/'} element={<MainPageAsync />} />
                </Routes>
            </Suspense>
        </div>
    );
};