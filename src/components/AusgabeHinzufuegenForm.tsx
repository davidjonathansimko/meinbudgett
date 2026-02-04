import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { KATEGORIEN, Kategorie } from "../types/types";

const AusgabeHinzufuegenForm = () => {
    const { addAusgabe } = useContext(AppContext);

    const [name, setName] = useState('');
    const [betrag, setBetrag] = useState<number>(0);
    const [kategorie, setKategorie] = useState<Kategorie>('Unterkunft');
    const [datum, setDatum] = useState(new Date().toISOString().split('T')[0]);
    const [beschreibung, setBeschreibung] = useState('');
    const [speichert, setSpeichert] = useState(false);
    const [fehler, setFehler] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!name.trim()) {
            setFehler("Bitte Namen eingeben.");
            return;
        }
        if (betrag <= 0) {
            setFehler("Bitte gültigen Betrag eingeben.");
            return;
        }

        try {
            setSpeichert(true);
            setFehler(null);
            await addAusgabe({ name, kostet: betrag, kategorie, datum, beschreibung });
            
            // Reset
            setName('');
            setBetrag(0);
            setKategorie('Unterkunft');
            setDatum(new Date().toISOString().split('T')[0]);
            setBeschreibung('');
        } catch (error) {
            setFehler(`Fehler: ${error instanceof Error ? error.message : 'Unbekannt'}`);
        } finally {
            setSpeichert(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mt-4">
            <h4>Füge eine neue Ausgabe hinzu</h4>
            
            {fehler && <div className="alert alert-danger py-2">{fehler}</div>}

            {/* Row 1: Titel + Betrag */}
            <div className="row mb-3">
                <div className="col-md-6 mb-2 mb-md-0">
                    <label className="form-label">Ausgabe Titel</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="z.b. Mittagessen"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="col-md-6">
                    <label className="form-label">Betrag (€) *</label>
                    <input
                        type="number"
                        className="form-control"
                        placeholder="0"
                        value={betrag || ''}
                        onChange={(e) => setBetrag(parseFloat(e.target.value) || 0)}
                    />
                </div>
            </div>

            {/* Kategorie */}
            <div className="mb-3">
                <label className="form-label">Kategorie *</label>
                <select
                    className="form-select"
                    value={kategorie}
                    onChange={(e) => setKategorie(e.target.value as Kategorie)}
                >
                    {KATEGORIEN.map((kat) => (
                        <option key={kat} value={kat}>{kat}</option>
                    ))}
                </select>
            </div>

            {/* Datum */}
            <div className="mb-3">
                <label className="form-label">Datum *</label>
                <input
                    type="date"
                    className="form-control"
                    value={datum}
                    onChange={(e) => setDatum(e.target.value)}
                />
            </div>

            {/* Beschreibung */}
            <div className="mb-3">
                <label className="form-label">Beschreibung (optional)</label>
                <textarea
                    className="form-control"
                    rows={2}
                    placeholder="Optionale Beschreibung..."
                    value={beschreibung}
                    onChange={(e) => setBeschreibung(e.target.value)}
                />
            </div>

            {/* Button */}
            <div className="text-center">
                <button 
                    type="submit" 
                    className="btn btn-primary"
                    disabled={speichert}
                >
                    {speichert ? 'Speichert...' : 'Ausgabe hinzufügen'}
                </button>
            </div>
        </form>
    );
};

export default AusgabeHinzufuegenForm;