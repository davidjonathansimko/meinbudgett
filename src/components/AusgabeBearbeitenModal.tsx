import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { KATEGORIEN, Kategorie, Ausgabe } from "../types/types";

interface AusgabeBearbeitenModalProps {
    ausgabe: Ausgabe;
    onClose: () => void;
}

const AusgabeBearbeitenModal = ({ ausgabe, onClose }: AusgabeBearbeitenModalProps) => {
    const { updateAusgabe } = useContext(AppContext);

    const [name, setName] = useState(ausgabe.name);
    const [kostet, setKostet] = useState(ausgabe.kostet);
    const [kategorie, setKategorie] = useState<Kategorie>(ausgabe.kategorie);
    const [datum, setDatum] = useState(ausgabe.datum);
    const [beschreibung, setBeschreibung] = useState(ausgabe.beschreibung || '');
    const [fehler, setFehler] = useState<string | null>(null);
    const [speichert, setSpeichert] = useState(false);

    const handleSpeichern = async () => {
        if (isNaN(kostet) || kostet <= 0) {
            setFehler("Bitte geben Sie einen gültigen Betrag ein.");
            return;
        }

        try {
            setSpeichert(true);
            await updateAusgabe(ausgabe.id, {
                name,
                kostet,
                kategorie,
                datum,
                beschreibung,
            });
            onClose();
        } catch (error) {
            setFehler("Fehler beim Speichern. Bitte versuchen Sie es erneut.");
        } finally {
            setSpeichert(false);
        }
    };

    return (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Ausgabe bearbeiten</h5>
                        <button type="button" className="btn-close" onClick={onClose}></button>
                    </div>
                    <div className="modal-body">
                        {fehler && <div className="alert alert-danger">{fehler}</div>}

                        <div className="mb-3">
                            <label>Ausgabe Titel</label>
                            <input
                                type="text"
                                className="form-control"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        <div className="mb-3">
                            <label>Betrag (€)</label>
                            <input
                                type="number"
                                className="form-control"
                                value={kostet}
                                onChange={(e) => setKostet(parseFloat(e.target.value))}
                            />
                        </div>

                        <div className="mb-3">
                            <label>Kategorie</label>
                            <select
                                className="form-control"
                                value={kategorie}
                                onChange={(e) => setKategorie(e.target.value as Kategorie)}
                            >
                                {KATEGORIEN.map((kat) => (
                                    <option key={kat} value={kat}>{kat}</option>
                                ))}
                            </select>
                        </div>

                        <div className="mb-3">
                            <label>Datum</label>
                            <input
                                type="date"
                                className="form-control"
                                value={datum}
                                onChange={(e) => setDatum(e.target.value)}
                            />
                        </div>

                        <div className="mb-3">
                            <label>Beschreibung</label>
                            <textarea
                                className="form-control"
                                value={beschreibung}
                                onChange={(e) => setBeschreibung(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary me-2" onClick={onClose}>
                            Abbrechen
                        </button>
                        <button 
                            type="button" 
                            className="btn btn-primary" 
                            onClick={handleSpeichern}
                            disabled={speichert}
                        >
                            {speichert ? 'Speichert...' : 'Speichern'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AusgabeBearbeitenModal;