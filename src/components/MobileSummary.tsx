import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { ThemeContext } from '../context/ThemeContext';
import { formatCurrency } from '../utils/formatCurrency';

const MobileSummary = () => {
    const { ausgaben, budget, setBudget } = useContext(AppContext);
    const { theme } = useContext(ThemeContext);
    const [editingBudget, setEditingBudget] = useState(false);
    const [newBudget, setNewBudget] = useState(budget);

    const totalAusgegeben = ausgaben.reduce((sum, a) => sum + a.kostet, 0);
    const geblieben = budget - totalAusgegeben;

    // Farbe für Rest
    const restColor = totalAusgegeben > budget 
        ? 'text-danger' 
        : totalAusgegeben > budget - 250 
            ? 'text-warning' 
            : 'text-success';

    const cardClass = theme === 'dark' 
        ? 'bg-dark border-secondary' 
        : 'bg-light';

    const handleSaveBudget = () => {
        setBudget(newBudget);
        setEditingBudget(false);
    };

    return (
        <div className={`mobile-summary-card card ${cardClass} mb-3`}>
            <div className="card-body py-2 px-3">
                {/* ROW 1: Budget und Bearbeiten */}
                <div className="d-flex justify-content-between align-items-center mb-2">
                    {editingBudget ? (
                        <div className="d-flex align-items-center gap-2 flex-grow-1">
                            <input
                                type="number"
                                className="form-control form-control-sm"
                                value={newBudget}
                                onChange={(e) => setNewBudget(parseFloat(e.target.value) || 0)}
                                style={{ maxWidth: '120px' }}
                            />
                            <button 
                                className="btn btn-success btn-sm"
                                onClick={handleSaveBudget}
                            >
                                ✓
                            </button>
                            <button 
                                className="btn btn-secondary btn-sm"
                                onClick={() => setEditingBudget(false)}
                            >
                                ✕
                            </button>
                        </div>
                    ) : (
                        <>
                            <div>
                                <small className="text-muted">Budget</small>
                                <div className="fw-bold">{formatCurrency(budget)}</div>
                            </div>
                            <button 
                                className="btn btn-outline-primary btn-sm"
                                onClick={() => {
                                    setNewBudget(budget);
                                    setEditingBudget(true);
                                }}
                            >
                                ✏️
                            </button>
                        </>
                    )}
                </div>

                {/* ROW 2: Ausgegeben und Rest */}
                <div className="d-flex justify-content-between">
                    <div className="text-center flex-grow-1">
                        <small className="text-muted d-block">Ausgegeben</small>
                        <span className="text-primary fw-bold">
                            {formatCurrency(totalAusgegeben)}
                        </span>
                    </div>
                    <div className="border-start mx-2"></div>
                    <div className="text-center flex-grow-1">
                        <small className="text-muted d-block">Rest</small>
                        <span className={`fw-bold ${restColor}`}>
                            {formatCurrency(geblieben)}
                        </span>
                    </div>
                </div>

                {/* PROGRESS BAR */}
                <div className="progress mt-2" style={{ height: '6px' }}>
                    <div 
                        className={`progress-bar ${totalAusgegeben > budget ? 'bg-danger' : 'bg-success'}`}
                        style={{ width: `${Math.min((totalAusgegeben / budget) * 100, 100)}%` }}
                    />
                </div>
            </div>
        </div>
    );
};

export default MobileSummary;