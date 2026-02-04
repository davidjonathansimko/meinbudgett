import React, { useContext } from "react";
import { TiDelete } from "react-icons/ti";
import { FiEdit } from "react-icons/fi";
import { AppContext } from "../context/AppContext";
import { Ausgabe } from "../types/types";
import { formatCurrency } from "../utils/formatCurrency";

interface AusgabeItemProps {
    ausgabe: Ausgabe;
    wirdBearbeitet: (ausgabe: Ausgabe) => void;
}

const AusgabeItem = ({ ausgabe, wirdBearbeitet }: AusgabeItemProps) => {
    const { deleteAusgabe } = useContext(AppContext);

    const handleLoeschen = async () => {
        if (window.confirm(`"${ausgabe.name}" löschen?`)) {
            await deleteAusgabe(ausgabe.id);
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('de-DE');
    };

    // Kategoriefarben - wie im Original
    const getCategoryColor = (kategorie: string): string => {
        const colors: { [key: string]: string } = {
            'Unterkunft': 'bg-info',
            'Verpflegung': 'bg-success',
            'Transport': 'bg-warning text-dark',
            'Aktivitäten': 'bg-primary',
            'Einkäufe': 'bg-secondary',
            'Sonstiges': 'bg-dark',
        };
        return colors[kategorie] || 'bg-secondary';
    };

    return (
        <li className="list-group-item">
            <div className="d-flex justify-content-between align-items-center">
                {/* Links: Name, Datum, Beschreibung */}
                <div>
                    <strong>{ausgabe.name}</strong>
                    <br />
                    <small className="text-muted">
                        {formatDate(ausgabe.datum)}
                        {ausgabe.beschreibung && ` - ${ausgabe.beschreibung}`}
                    </small>
                </div>
                
                {/* Rechts: Kategorie, Betrag, Buttons */}
                <div className="d-flex align-items-center gap-2">
                    <span className={`badge ${getCategoryColor(ausgabe.kategorie)}`}>
                        {ausgabe.kategorie}
                    </span>
                    <span className="badge bg-primary rounded-pill">
                        {formatCurrency(ausgabe.kostet)}
                    </span>
                    <FiEdit 
                        size="1.2em"
                        style={{ cursor: 'pointer' }}
                        onClick={() => wirdBearbeitet(ausgabe)}
                    />
                    <TiDelete 
                        size="1.4em"
                        style={{ cursor: 'pointer', color: '#dc3545' }}
                        onClick={handleLoeschen}
                    />
                </div>
            </div>
        </li>
    );
};

export default AusgabeItem;