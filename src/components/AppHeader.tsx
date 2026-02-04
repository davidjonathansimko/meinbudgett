import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import ThemeToggle from './ThemeToggleButton';

const AppHeader = () => {
    const { theme } = useContext(ThemeContext);
    const { user, signOut } = useAuth();

    const handleSignOut = async () => {
        try {
            await signOut();
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    return (
        <div className="d-flex justify-content-end align-items-center gap-2 p-2">
            <ThemeToggle />
            {user ? (
                <>
                    <span className="text-muted small d-none d-md-inline">
                        Eingeloggt als:  <strong> {user.email}</strong>
                    </span>
                    <button 
                        onClick={handleSignOut}
                        className="btn btn-outline-danger btn-sm"
                    >
                        Abmelden
                    </button>
                </>
            ) : (
                <span className="text-muted small">Nicht angemeldet</span>
            )}
        </div>
    );
};

export default AppHeader;