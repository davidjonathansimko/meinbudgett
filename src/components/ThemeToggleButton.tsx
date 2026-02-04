import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

const ThemeToggle = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
        <button
            onClick={toggleTheme}
            className="btn btn-outline-secondary btn-sm"
            title={theme === 'light' ? 'Dark Mode' : 'Light Mode'}
        >
            {theme === 'light' ? '☾' : '☀︎'}
        </button>
    );
};

export default ThemeToggle;