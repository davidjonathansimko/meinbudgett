

export const formatCurrency = (amount: number): string => {
    return amount.toLocaleString('de-DE', {
        style: 'currency',
        currency: 'EUR'
    });
};

/*
    001.
    Auf alle Ersten habe ich diesen Code geschrieben.
    Ich werde es in fast alle Komponenten importieren und verwenden.
    Und beim erstellen von neuen Komponenten werde ich es auch verwenden.
    Deshalb möchte ich keine Roter Markierung haben oder Fehlern beim testen von Hard Gecodeten Werten.
    Ich möchte immer eine saubere und fehlerfreie Codebasis haben.
*/