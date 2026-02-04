
import React,{useContext, useState} from "react";
import AusgabeItem from "./AusgabeItem";
import{KATEGORIEN, Kategorie, Ausgabe, ZeitFilter} from "../types/types";
import { AppContext } from "../context/AppContext";
import AusgabeBearbeitenModal from "./AusgabeBearbeitenModal";
import { filterAusgaben } from "../utils/filterAusgaben";
import AusgabeFilter from "./AusgabeFilter";
import { exportToExcel } from '../utils/exportExcel';


const AusgabeListe = () => {

   const { ausgaben } = useContext(AppContext);

   // State oder Zustand für Filterung nach Kategorie:
   const [zeitFilter, setZeitFilter] = useState<ZeitFilter>('alle');
    const [kategorie, setKategorie] = useState<Kategorie | 'Alle'>('Alle');
    const [vonDatum, setVonDatum] = useState<string>('');
    const [bisDatum, setBisDatum] = useState<string>('');
    const [showLimit, setShowLimit] = useState<number>(6); // Arată doar 6 implicit
    const [showAll, setShowAll] = useState<boolean>(false);
    

    const [filterKategorie, setFilterKategorie] = useState<Kategorie | 'Alle'>('Alle');

    const [ausgabeInBearbeitung, setAusgabeInBearbeitung] = useState<Ausgabe | null>(null);
   
    
    // APLICĂ FILTRELE
    const filteredAusgaben = filterAusgaben(
        ausgaben,
        zeitFilter,
        kategorie,
        vonDatum,
        bisDatum,
        showAll ? undefined : showLimit // Dacă showAll e true, nu limitează
    );

    // Totalul cheltuielilor filtrate
    const filteredTotal = filteredAusgaben.reduce((sum, exp) => sum + exp.kostet, 0);

    // Ich erstelle Zwei neue Funktionen, um das Bearbeiten zu handhaben.

    // 01. Funktion um die Ausgabe zu setzen, die bearbeitet wird.
    const wirdBearbeitet = (ausgabe: Ausgabe) => {
        setAusgabeInBearbeitung(ausgabe);           // Bearbeitung Modal wird mit dieses Ausgabe geöffnet.
    }

    // 02. Funktion um die Bearbeitung zu schließen.
    const schliesseBearbeitung = () => {
        setAusgabeInBearbeitung(null);              // Ausgabe in Bearbeitung wird auf null gesetzt, also keine Ausgabe wird bearbeitet.
                                                    // Schliesst das Modal.
    }

    const handleExport = async () => {
    try {
        // Folosește toate cheltuielile filtrate (nu doar primele 6)
        const alleGefilterte = filterAusgaben(
            ausgaben,
            zeitFilter,
            kategorie,
            vonDatum,
            bisDatum
            // Fără limit pentru export
        );
        
        // Generează un nume descriptiv
        let filename = 'Ausgaben';
        if (zeitFilter !== 'alle') {
            const zeitNames: Record<ZeitFilter, string> = {
                'alle': 'Alle',
                'heute': 'Heute',
                'woche': 'Diese_Woche',
                'monat': 'Dieser_Monat',
                'jahr': 'Dieses_Jahr',
                'custom': `${vonDatum}_bis_${bisDatum}`
            };
            filename += `_${zeitNames[zeitFilter]}`;
        }
        if (kategorie !== 'Alle') {
            filename += `_${kategorie}`;
        }
        
        await exportToExcel(alleGefilterte, filename);
    } catch (error) {
        console.error('Export fehlgeschlagen:', error);
        alert('Export fehlgeschlagen. Bitte versuchen Sie es erneut.');
    }
};



    return (
    <div>
            {/* FILTERKOMPONENTE */}
            <AusgabeFilter
                zeitFilter={zeitFilter}
                kategorie={kategorie}
                vonDatum={vonDatum}
                bisDatum={bisDatum}
                onZeitFilterChange={setZeitFilter}
                onKategorieChange={setKategorie}
                onVonDatumChange={setVonDatum}
                onBisDatumChange={setBisDatum}
            />

            {/* INFO: Anzahl der Ergebnisse und Gesamtbetrag */}
            <div className="mb-2 d-flex justify-content-between align-items-center">
                <span className="text-muted">
                    {filteredAusgaben.length} von {ausgaben.length} Ausgaben 
                    {!showAll && filteredAusgaben.length > showLimit && ` (zeige ${showLimit})`}
                </span>
                
                <div>
                     <button 
                    className="btn btn-success btn-sm ms-2"
                    onClick={handleExport}
                    disabled={filteredAusgaben.length === 0}
                >
                ➜] Exportiere zu Excel
            </button>
                </div>
                <span className="badge" style={{backgroundColor: 'rgba(5, 68, 65, 1)'}}>

                    Gefiltert: {filteredTotal.toLocaleString('de-DE', {style: 'currency', currency: 'EUR'})}
                </span>
                
                
            </div>

            {/* AUSGABENLISTE */}
            {filteredAusgaben.length === 0 ? (
                <div className="alert alert-info">
                    Keine Ausgaben für die ausgewählten Filter gefunden.
                </div>
            ) : (
                <ul className="list-group">
                    {filteredAusgaben.map((ausgabe) => (
                        <AusgabeItem 
                            key={ausgabe.id}
                            ausgabe={ausgabe}
                            wirdBearbeitet={wirdBearbeitet}
                            
                        /> 
                    ))}
                </ul>
            )}

            {/* BUTTON: Alle anzeigen / Nur begrenzte Anzahl anzeigen */}
            {ausgaben.length > showLimit && (
                <div className="text-center mt-3">
                    <button 
                        className="btn btn-outline-secondary btn-sm"
                        onClick={() => setShowAll(!showAll)}
                    >
                        {showAll ? `Nur ${showLimit} anzeigen` : 'Alle anzeigen'}
                    </button>
                </div>
            )}

            {/* MODAL ZUM BEARBEITEN */}
            {ausgabeInBearbeitung && (
                <AusgabeBearbeitenModal 
                    ausgabe={ausgabeInBearbeitung}
                    onClose={schliesseBearbeitung}
                />
            )}

                    
            
        </div>

    )
}

export default AusgabeListe;
