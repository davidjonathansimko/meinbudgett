import React, { useState, useContext } from 'react';
import { useAuth } from '../context/AuthContext';
import { ThemeContext } from '../context/ThemeContext';
import ThemeToggle from './ThemeToggleButton';

const Login = () => {
    const { signIn, signUp } = useAuth();
    const { theme } = useContext(ThemeContext);
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isRegister, setIsRegister] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setMessage('');
        setLoading(true);

        try {
            if (isRegister) {
                await signUp(email, password);
                setMessage('Registrierung erfolgreich! Bitte bestätigen Sie Ihre E-Mail.');
            } else {
                await signIn(email, password);
            }
        } catch (err: any) {
            setError(err.message || 'Ein Fehler ist aufgetreten');
        } finally {
            setLoading(false);
        }
    };

    // NEUE DARK PALETTE
    const modalBg = theme === 'dark' ? 'bg-dark-custom' : 'bg-white';
    const modalStyle = theme === 'dark' 
        ? { backgroundColor: '#241e2a', color: '#edf2f4', borderColor: '#393041' }
        : {};
    
    const inputClass = theme === 'dark' 
        ? 'form-control' 
        : 'form-control';

    const backdropColor = theme === 'dark' 
        ? 'rgba(0, 0, 0, 0.85)' 
        : 'rgba(0, 0, 0, 0.5)';

    return (
        <div 
            className="modal d-block" 
            style={{ backgroundColor: backdropColor }}
        >
            <div className="modal-dialog modal-dialog-centered">
                <div 
                    className={`modal-content ${modalBg}`}
                    style={modalStyle}
                >
                    {/* Header */}
                    <div 
                        className="modal-header border-bottom"
                        style={theme === 'dark' ? { borderColor: '#393041' } : {}}
                    >
                        <h4 className="modal-title w-100 text-center">
                            ⛃ Mein Budget
                        </h4>
                        <div className="position-absolute" style={{ right: '1rem' }}>
                            <ThemeToggle />
                        </div>
                    </div>

                    {/* Body */}
                    <div className="modal-body px-4 pb-4">
                        <p className={`text-center mb-4 ${theme === 'dark' ? '' : 'text-muted'}`}
                           style={theme === 'dark' ? { color: '#a8a2b0' } : {}}>
                            {isRegister 
                                ? 'Erstellen Sie ein neues Konto' 
                                : 'Melden Sie sich an, um fortzufahren'}
                        </p>

                        {error && (
                            <div className="alert alert-danger py-2">{error}</div>
                        )}
                        
                        {message && (
                            <div className="alert alert-success py-2">{message}</div>
                        )}

                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label 
                                    className="form-label"
                                    style={theme === 'dark' ? { color: '#edf2f4' } : {}}
                                >
                                    E-Mail
                                </label>
                                <input
                                    type="email"
                                    className={inputClass}
                                    placeholder="ihre@email.de"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    style={theme === 'dark' ? { 
                                        backgroundColor: '#2c2433', 
                                        borderColor: '#393041',
                                        color: '#edf2f4'
                                    } : {}}
                                />
                            </div>

                            <div className="mb-4">
                                <label 
                                    className="form-label"
                                    style={theme === 'dark' ? { color: '#edf2f4' } : {}}
                                >
                                    Passwort
                                </label>
                                <input
                                    type="password"
                                    className={inputClass}
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    minLength={6}
                                    style={theme === 'dark' ? { 
                                        backgroundColor: '#2c2433', 
                                        borderColor: '#393041',
                                        color: '#edf2f4'
                                    } : {}}
                                />
                            </div>

                            <button
                                type="submit"
                                className="btn btn-primary w-100 mb-3"
                                disabled={loading}
                            >
                                {loading 
                                    ? 'Bitte warten...' 
                                    : isRegister 
                                        ? 'Registrieren' 
                                        : 'Anmelden'}
                            </button>
                        </form>

                        <hr style={theme === 'dark' ? { borderColor: '#393041' } : {}} />

                        <p className="text-center mb-0">
                            {isRegister ? (
                                <>
                                    <span style={theme === 'dark' ? { color: '#a8a2b0' } : {}}>
                                        Bereits ein Konto?{' '}
                                    </span>
                                    <button
                                        type="button"
                                        className="btn btn-link p-0"
                                        onClick={() => {
                                            setIsRegister(false);
                                            setError('');
                                            setMessage('');
                                        }}
                                        style={theme === 'dark' ? { color: '#90cdf4' } : {}}
                                    >
                                        Anmelden
                                    </button>
                                </>
                            ) : (
                                <>
                                    <span style={theme === 'dark' ? { color: '#a8a2b0' } : {}}>
                                        Noch kein Konto?{' '}
                                    </span>
                                    <button
                                        type="button"
                                        className="btn btn-link p-0"
                                        onClick={() => {
                                            setIsRegister(true);
                                            setError('');
                                            setMessage('');
                                        }}
                                        style={theme === 'dark' ? { color: '#90cdf4' } : {}}
                                    >
                                        Registrieren
                                    </button>
                                </>
                            )}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;