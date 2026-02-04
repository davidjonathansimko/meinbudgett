// Eine einfache Komponente, die das Budget anzeigt und den Bearbeiten BUtton.

import react from 'react';
import { formatCurrency } from '../utils/formatCurrency';   

// Wird definiert was diese Komponente als Props(Eigenschaften) bekommt.
interface BudgetSehenProps {
    budget: number;             // Das Budget wird angezeigt, als Prop übergeben.
    onEditBudget: () => void;   // Funktion für den Bearbeiten Button.
}

const BudgetSehen = ({budget, onEditBudget}: BudgetSehenProps) => {
    return (
        <>
        <span>Budget: {formatCurrency(budget)}</span>

        <button
            type='button'
            className='btn btn-primary'
            onClick={onEditBudget}
        >Bearbeiten</button>
        </>
    )
}
export default BudgetSehen;

