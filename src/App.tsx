import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AppProvider } from './context/AppContext';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import AppHeader from './components/AppHeader';
import Budget from './components/Budget';
import Ausgegeben from './components/Ausgegeben';
import GebliebenesBudget from './components/GebliebenesBudget';
import AusgabeListe from './components/AusgabeListe';
import AusgabeHinzufuegenForm from './components/AusgabeHinzufuegenForm';
import Statistik from './components/Statistik';
import Login from './components/Login';

// Componenta principală care verifică autentificarea
const AppContent = () => {
    const { user, loading } = useAuth();

    // Afișează loading în timp ce verificăm autentificarea
    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center vh-100">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    // Dacă nu e logat, arată modalul de Login
    if (!user) {
        return <Login />;
    }

    // Dacă e logat, arată aplicația
    return (
        <>
            <AppHeader />
            
            <div className="container py-3">
                <h1 className="text-center mb-4">Mein Budget</h1>

                {/* Budget Row - 3 Alerts */}
                <div className="row mb-3">
                    <div className="col-md-4">
                        <Budget />
                    </div>
                    <div className="col-md-4">
                        <GebliebenesBudget />
                    </div>
                    <div className="col-md-4">
                        <Ausgegeben />
                    </div>
                </div>

                {/* Main Content */}
                <div className="row">
                    <div className="col-lg-8 mb-3 mb-lg-0">
                        <AusgabeListe />
                        <AusgabeHinzufuegenForm />
                    </div>
                    <div className="col-lg-4">
                        <Statistik />
                    </div>
                </div>
            </div>
        </>
    );
};

function App() {
    return (
        <ThemeProvider>
            <AuthProvider>
                <AppProvider>
                    <AppContent />
                </AppProvider>
            </AuthProvider>
        </ThemeProvider>
    );
}

export default App;