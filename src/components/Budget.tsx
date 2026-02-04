import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { formatCurrency } from "../utils/formatCurrency";

const Budget = () => {
    const { budget, setBudget } = useContext(AppContext);
    const [wirdBearbeitet, setWirdBearbeitet] = useState(false);
    const [neuesBudget, setNeuesBudget] = useState(budget);

    const handleSpeichern = () => {
        setBudget(neuesBudget);
        setWirdBearbeitet(false);
    };

    return (
        <div className="alert alert-secondary d-flex justify-content-between align-items-center mb-2">
            {wirdBearbeitet ? (
                <>
                    <input 
                        type="number" 
                        className="form-control form-control-sm me-2"
                        style={{ maxWidth: '150px' }}
                        value={neuesBudget}
                        onChange={(e) => setNeuesBudget(parseFloat(e.target.value) || 0)}
                    />
                    <div>
                        <button className="btn btn-success btn-sm me-1" onClick={handleSpeichern}>✓</button>
                        <button className="btn btn-secondary btn-sm" onClick={() => setWirdBearbeitet(false)}>✕</button>
                    </div>
                </>
            ) : (
                <>
                    <span>Budget: {formatCurrency(budget)}</span>
                    <button 
                        className="btn btn-primary btn-sm"
                        onClick={() => {
                            setNeuesBudget(budget);
                            setWirdBearbeitet(true);
                        }}
                    >
                        Bearbeiten
                    </button>
                </>
            )}
        </div>
    );
};

export default Budget;