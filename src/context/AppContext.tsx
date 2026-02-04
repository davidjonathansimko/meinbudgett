import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { Ausgabe } from '../types/types';
import { supabase } from '../config/supabase';
import { 
    fetchAusgaben, 
    addAusgabeToDb, 
    updateAusgabeInDb, 
    deleteAusgabeFromDb 
} from '../services/ausgabeService';

interface AppContextType {
    ausgaben: Ausgabe[];
    budget: number;
    loading: boolean;
    setBudget: (budget: number) => void;
    addAusgabe: (ausgabe: Omit<Ausgabe, 'id'>) => Promise<void>;
    updateAusgabe: (id: string, ausgabe: Partial<Ausgabe>) => Promise<void>;
    deleteAusgabe: (id: string) => Promise<void>;
    refreshAusgaben: () => Promise<void>;
}

export const AppContext = createContext<AppContextType>({
    ausgaben: [],
    budget: 0,
    loading: false,
    setBudget: () => {},
    addAusgabe: async () => {},
    updateAusgabe: async () => {},
    deleteAusgabe: async () => {},
    refreshAusgaben: async () => {}
});

interface AppProviderProps {
    children: ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {
    const [ausgaben, setAusgaben] = useState<Ausgabe[]>([]);
    const [budget, setBudgetState] = useState<number>(() => {
        const saved = localStorage.getItem('budget');
        return saved ? parseFloat(saved) : 0;
    });
    const [loading, setLoading] = useState<boolean>(true);

    // Budget speichern
    const setBudget = (newBudget: number) => {
        setBudgetState(newBudget);
        localStorage.setItem('budget', newBudget.toString());
    };

    // Ausgaben laden wenn User eingeloggt ist
    const loadAusgaben = async () => {
        try {
            setLoading(true);
            const data = await fetchAusgaben();
            setAusgaben(data);
        } catch (error) {
            console.error('Fehler beim Laden:', error);
        } finally {
            setLoading(false);
        }
    };

    // Bei Auth-Änderungen Ausgaben neu laden
    useEffect(() => {
        loadAusgaben();

        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
            if (session) {
                loadAusgaben();
            } else {
                setAusgaben([]);
            }
        });

        return () => subscription.unsubscribe();
    }, []);

    // Neue Ausgabe hinzufügen
    const addAusgabe = async (ausgabe: Omit<Ausgabe, 'id'>) => {
        const newAusgabe = await addAusgabeToDb(ausgabe);
        setAusgaben(prev => [newAusgabe, ...prev]);
    };

    // Ausgabe aktualisieren
    const updateAusgabe = async (id: string, ausgabe: Partial<Ausgabe>) => {
        const updated = await updateAusgabeInDb(id, ausgabe);
        setAusgaben(prev => prev.map(a => a.id === id ? updated : a));
    };

    // Ausgabe löschen
    const deleteAusgabe = async (id: string) => {
        await deleteAusgabeFromDb(id);
        setAusgaben(prev => prev.filter(a => a.id !== id));
    };

    const refreshAusgaben = async () => {
        await loadAusgaben();
    };

    return (
        <AppContext.Provider value={{
            ausgaben,
            budget,
            loading,
            setBudget,
            addAusgabe,
            updateAusgabe,
            deleteAusgabe,
            refreshAusgaben
        }}>
            {children}
        </AppContext.Provider>
    );
};