
export const KATEGORIEN = [
    "Unterkunft",    
    "Verpflegung",  
    "Transport",     
    "Aktivitäten",   
    "Einkäufe",      
    "Sonstiges"      
] as const;


export type Kategorie = typeof KATEGORIEN [number];



export interface Ausgabe {
    id: string;
    name: string;
    beschreibung?: string;
    kostet: number;
    datum: string;
    kategorie: Kategorie;
    user_id?: string;
    created_at?: string;
}


export interface AppState {
    budget: number;
    ausgaben: Ausgabe [];
}


export type AppAction = 
    | { type: 'ADD_AUSGABE'; payload: Ausgabe }      // Eine neue Ausgabe wird hinzugefügt
    | { type: 'DELETE_AUSGABE'; payload: string }    // Eine Ausgabe wird gelöscht (payload = id)
    | { type: 'EDIT_AUSGABE'; payload: Ausgabe }     // Eine Ausgabe wird bearbeitet
    | { type: 'SET_BUDGET'; payload: number }        // Das Budget wird gesetzt
    | { type: 'LOAD_FROM_STORAGE'; payload: AppState }; // Daten werden aus dem localStorage geladen



export interface AppContextType {
    budget: number;                         // Aktuelles Budget
    ausgaben: Ausgabe [];                   // Liste der Ausgaben
    dispatch : React.Dispatch<AppAction>;   // Dispatch-Funktion zum Senden von Aktionen / Änderungen / Updates  oder Befehle
}

// Habe ich für Filterung gebraucht und hinzugefügt:

// Typen für Zeitfilter
export type ZeitFilter = 'alle' | 'heute' | 'woche' | 'monat' | 'jahr' | 'custom';

// Schnittstelle für angewendete Filter
export interface ExpenseFilters {
    zeitFilter: ZeitFilter;
    kategorie: Kategorie | 'Alle';
    vonDatum?: string;  // Für benutzerdefinierte Filter: von
    bisDatum?: string;  // Für benutzerdefinierte Filter: bis
    limit?: number;     // Wie viele sollen angezeigt werden (z.B. 6)
}


/*
    002. 
    Habe ich alle Typen und Schnittstellen definiert, die in der Anwendung verwendet werden.
       - Zuerst gebrauche ich es noch nicht, denn ich möchte die GUI erstellen und erst dann,
       auch die Logik und Funktionalität implementieren.

       - Also zuerst ist meine Web Anwendung Statisch und danach mache ich es Dynamisch.
*/