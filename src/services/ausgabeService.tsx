import { supabase } from '../config/supabase';
import { Ausgabe } from '../types/types';

// Alle Ausgaben des eingeloggten Users laden
export const fetchAusgaben = async (): Promise<Ausgabe[]> => {
    const { data, error } = await supabase
        .from('ausgaben')
        .select('*')
        .order('datum', { ascending: false });

    if (error) {
        console.error('Fehler beim Laden der Ausgaben:', error);
        throw error;
    }

    return data || [];
};

// Neue Ausgabe hinzufügen
export const addAusgabeToDb = async (ausgabe: Omit<Ausgabe, 'id'>): Promise<Ausgabe> => {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) throw new Error('Nicht eingeloggt');

    const { data, error } = await supabase
        .from('ausgaben')
        .insert({
            name: ausgabe.name,
            beschreibung: ausgabe.beschreibung,
            kostet: ausgabe.kostet,
            datum: ausgabe.datum,
            kategorie: ausgabe.kategorie,
            user_id: user.id
        })
        .select()
        .single();

    if (error) {
        console.error('Fehler beim Hinzufügen:', error);
        throw error;
    }

    return data;
};

// Ausgabe aktualisieren
export const updateAusgabeInDb = async (id: string, ausgabe: Partial<Ausgabe>): Promise<Ausgabe> => {
    const { data, error } = await supabase
        .from('ausgaben')
        .update(ausgabe)
        .eq('id', id)
        .select()
        .single();

    if (error) {
        console.error('Fehler beim Aktualisieren:', error);
        throw error;
    }

    return data;
};

// Ausgabe löschen
export const deleteAusgabeFromDb = async (id: string): Promise<void> => {
    const { error } = await supabase
        .from('ausgaben')
        .delete()
        .eq('id', id);

    if (error) {
        console.error('Fehler beim Löschen:', error);
        throw error;
    }
};