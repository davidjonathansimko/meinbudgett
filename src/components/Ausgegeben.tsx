import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { formatCurrency } from "../utils/formatCurrency";

const Ausgegeben = () => {
    const { ausgaben, budget } = useContext(AppContext);

    const totalAusgegeben = ausgaben.reduce((sum, a) => sum + a.kostet, 0);

    const alertType = totalAusgegeben > budget ? 'alert-warning' : 'alert-primary';

    return (
        <div className={`alert ${alertType} mb-2`}>
            <span>Ausgegeben: {formatCurrency(totalAusgegeben)}</span>
        </div>
    );
};

export default Ausgegeben;