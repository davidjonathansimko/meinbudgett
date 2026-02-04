import React,{useState} from "react";

interface BudgetBearbeitenProps {
    budget: number; // Das aktuelle Budget wird als Prop übergeben.
    onSpeichereBudgetClick: (neuesBudgetWert: number) => void; // Mit Diesesn Funktion wird das neue Budget gespeichert.
}

const BudgetBearbeiten = ({budget, onSpeichereBudgetClick}: BudgetBearbeitenProps) => {
    const [neuesBudgetWert, setNeuesBudget] = useState<number>(budget); // Lokaler State für das neue Budget

    return (
        <>
            <input 
                required
                type="number" 
                className="form-control mr-3" 
                value={neuesBudgetWert} 
                onChange={(e) => setNeuesBudget(parseFloat(e.target.value) || 0)}  // 0 Damit es nicht NaN wird. Soll ein Zahl sein. 
            />
            <button 
                type="button" 
                className="btn btn-primary"
                onClick={() => onSpeichereBudgetClick(neuesBudgetWert)} // Ruft die Funktion auf, um das neue Budget zu speichern.
            >
                Speichern
            </button>
        </>
    )
}
export default BudgetBearbeiten;