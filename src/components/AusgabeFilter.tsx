import React from 'react';
import { KATEGORIEN, Kategorie, ZeitFilter } from '../types/types';

interface AusgabeFilterProps {
    zeitFilter: ZeitFilter;
    kategorie: Kategorie | 'Alle';
    vonDatum: string;
    bisDatum: string;
    onZeitFilterChange: (value: ZeitFilter) => void;
    onKategorieChange: (value: Kategorie | 'Alle') => void;
    onVonDatumChange: (value: string) => void;
    onBisDatumChange: (value: string) => void;
}

const AusgabeFilter = ({
    zeitFilter,
    kategorie,
    vonDatum,
    bisDatum,
    onZeitFilterChange,
    onKategorieChange,
    onVonDatumChange,
    onBisDatumChange
}: AusgabeFilterProps) => {

    return (
        <div className="card mb-3">
            <div className="card-header">
                <h6>🔎︎ Filter</h6>
            </div>
            <div className="card-body">
                <div className="row">
                    {/* FILTRU TIMP */}
                    <div className="col-md-3 mb-2">
                        <label className="form-label">Zeitraum</label>
                        <select
                            className="form-select"
                            value={zeitFilter}
                            onChange={(e) => onZeitFilterChange(e.target.value as ZeitFilter)}
                        >
                            <option value="alle">Alle</option>
                            <option value="heute">Heute</option>
                            <option value="woche">Diese Woche</option>
                            <option value="monat">Dieser Monat</option>
                            <option value="jahr">Dieses Jahr</option>
                            <option value="custom">Benutzerdefiniert...</option>
                        </select>
                    </div>

                    {/* FILTRU CATEGORIE */}
                    <div className="col-md-3 mb-2">
                        <label className="form-label">Kategorie</label>
                        <select
                            className="form-control"
                            value={kategorie}
                            onChange={(e) => onKategorieChange(e.target.value as Kategorie | 'Alle')}
                        >
                            <option value="Alle">Alle Kategorien</option>
                            {KATEGORIEN.map((kat) => (
                                <option key={kat} value={kat}>{kat}</option>
                            ))}
                        </select>
                    </div>

                    {/* FILTRU CUSTOM: VON - BIS (apare doar când zeitFilter === 'custom') */}
                    {zeitFilter === 'custom' && (
                        <>
                            <div className="col-md-3 mb-2">
                                <label className="form-label">Von Datum</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    value={vonDatum}
                                    onChange={(e) => onVonDatumChange(e.target.value)}
                                />
                            </div>
                            <div className="col-md-3 mb-2">
                                <label className="form-label">Bis Datum</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    value={bisDatum}
                                    onChange={(e) => onBisDatumChange(e.target.value)}
                                />
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AusgabeFilter;