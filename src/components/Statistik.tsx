import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { KATEGORIEN } from '../types/types';
import { formatCurrency } from '../utils/formatCurrency';

const Statistik = () => {
    const { ausgaben, budget } = useContext(AppContext);
    
    const total = ausgaben.reduce((sum, a) => sum + a.kostet, 0);
    const geblieben = budget - total;

    // Ausgaben pro Kategorie
    const perKategorie = KATEGORIEN.map(kat => {
        const summe = ausgaben
            .filter(a => a.kategorie === kat)
            .reduce((sum, a) => sum + a.kostet, 0);
        const prozent = budget > 0 ? (summe / budget) * 100 : 0;
        return { kategorie: kat, summe, prozent };
    }).filter(item => item.summe > 0);

    // Farben wie im Original
    const getColor = (kategorie: string): string => {
        const colors: { [key: string]: string } = {
            'Unterkunft': '#17a2b8',
            'Verpflegung': '#28a745',
            'Transport': '#ffc107',
            'Aktivitäten': '#007bff',
            'Einkäufe': '#6c757d',
            'Sonstiges': '#343a40'
        };
        return colors[kategorie] || '#6c757d';
    };

    return (
        <div className="card">
            <div className="card-header">
                <strong>Statistische Übersicht</strong>
            </div>
            <div className="card-body">
                <p className="mb-1">
                    <span>Gesamtausgaben: </span>
                    <strong>{formatCurrency(total)}</strong>
                </p>
                <p className="mb-1">
                    <span>Budget: </span>
                    <strong>{formatCurrency(budget)}</strong>
                </p>
                <p className="mb-3">
                    <span>Verbleibendes Budget: </span>
                    <strong className={geblieben >= 0 ? 'text-success' : 'text-danger'}>
                        {formatCurrency(geblieben)}
                    </strong>
                </p>

                {perKategorie.length > 0 && (
                    <>
                        <p className="mb-2"><strong>Meine Ausgaben nach Kategorie:</strong></p>
                        {perKategorie.map(({ kategorie, summe, prozent }) => (
                            <div key={kategorie} className="mb-3">
                                <div className="d-flex justify-content-between">
                                    <span>{kategorie}</span>
                                    <span>{formatCurrency(summe)} ({prozent.toFixed(2)}%)</span>
                                </div>
                                <div className="progress" style={{ height: '20px' }}>
                                    <div 
                                        className="progress-bar"
                                        style={{
                                            width: `${Math.min(prozent, 100)}%`,
                                            backgroundColor: getColor(kategorie)
                                        }}
                                    >
                                        {prozent >= 10 && `${prozent.toFixed(0)}%`}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </>
                )}
            </div>
        </div>
    );
};

export default Statistik;