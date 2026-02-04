import { Ausgabe, ZeitFilter, Kategorie } from '../types/types';

/**
 * Returnează începutul zilei de azi
 */
const getStartOfToday = (): Date => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return today;
};

/**
 * Returnează începutul săptămânii (Luni)
 */
const getStartOfWeek = (): Date => {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const diff = today.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1); // Luni
    const monday = new Date(today.setDate(diff));
    monday.setHours(0, 0, 0, 0);
    return monday;
};

/**
 * Returnează începutul lunii curente
 */
const getStartOfMonth = (): Date => {
    const today = new Date();
    return new Date(today.getFullYear(), today.getMonth(), 1);
};

/**
 * Returnează începutul anului curent
 */
const getStartOfYear = (): Date => {
    const today = new Date();
    return new Date(today.getFullYear(), 0, 1);
};

/**
 * Filtrează cheltuielile bazat pe toate criteriile
 */
export const filterAusgaben = (
    expenses: Ausgabe[],
    zeitFilter: ZeitFilter,
    kategorie: Kategorie | 'Alle',
    vonDatum?: string,
    bisDatum?: string,
    limit?: number
): Ausgabe[] => {
    let filtered = [...expenses];

    // 1. FILTRU TIMP
    const today = new Date();
    today.setHours(23, 59, 59, 999); // Sfârșitul zilei de azi

    switch (zeitFilter) {
        case 'heute':
            const startOfToday = getStartOfToday();
            filtered = filtered.filter(exp => {
                const expDate = new Date(exp.datum);
                return expDate >= startOfToday && expDate <= today;
            });
            break;

        case 'woche':
            const startOfWeek = getStartOfWeek();
            filtered = filtered.filter(exp => {
                const expDate = new Date(exp.datum);
                return expDate >= startOfWeek && expDate <= today;
            });
            break;

        case 'monat':
            const startOfMonth = getStartOfMonth();
            filtered = filtered.filter(exp => {
                const expDate = new Date(exp.datum);
                return expDate >= startOfMonth && expDate <= today;
            });
            break;

        case 'jahr':
            const startOfYear = getStartOfYear();
            filtered = filtered.filter(exp => {
                const expDate = new Date(exp.datum);
                return expDate >= startOfYear && expDate <= today;
            });
            break;

        case 'custom':
            if (vonDatum) {
                const von = new Date(vonDatum);
                von.setHours(0, 0, 0, 0);
                filtered = filtered.filter(exp => new Date(exp.datum) >= von);
            }
            if (bisDatum) {
                const bis = new Date(bisDatum);
                bis.setHours(23, 59, 59, 999);
                filtered = filtered.filter(exp => new Date(exp.datum) <= bis);
            }
            break;

        case 'alle':
        default:
            // Nu filtrăm după timp
            break;
    }

    // 2. FILTRU CATEGORIE
    if (kategorie !== 'Alle') {
        filtered = filtered.filter(exp => exp.kategorie === kategorie);
    }

    // 3. SORTARE după dată (cele mai recente primele)
    filtered.sort((a, b) => new Date(b.datum).getTime() - new Date(a.datum).getTime());

    // 4. LIMITĂ (doar primele N)
    if (limit && limit > 0) {
        filtered = filtered.slice(0, limit);
    }

    return filtered;
};