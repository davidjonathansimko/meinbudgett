import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { formatCurrency } from "../utils/formatCurrency";

const GebliebenesBudget = () => {
    const { ausgaben, budget } = useContext(AppContext);

    const totalAusgegeben = ausgaben.reduce((sum, a) => sum + a.kostet, 0);
    const geblieben = budget - totalAusgegeben;

    // Culori ca în design original
    const alertType = totalAusgegeben > budget 
        ? 'alert-danger'
        : totalAusgegeben > budget - 250 
            ? 'alert-warning'
            : 'alert-success';

    return (
        <div className={`alert ${alertType} mb-2`}>
            <span>Rest: {formatCurrency(geblieben)}</span>
        </div>
    );
};

export default GebliebenesBudget;