import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { Ausgabe } from '../types/types';

/**
 * Export der Ausgaben in eine Excel-Datei
 */
export const exportToExcel = async (
    ausgaben: Ausgabe[],
    filename: string = 'Ausgaben'
): Promise<void> => {
    // Hier erstelle ich eine neue Arbeitsmappe und ein Arbeitsblatt
    const workbook = new ExcelJS.Workbook();
    workbook.creator = 'Budget Tracker';
    workbook.created = new Date();

    // Erstelle ein Arbeitsblatt
    const worksheet = workbook.addWorksheet('Ausgaben', {
        headerFooter: {
            firstHeader: 'Budget Tracker - Ausgabenübersicht'
        }
    });

    // Definiere die Spalten
    worksheet.columns = [
        { header: 'Datum', key: 'datum', width: 15 },
        { header: 'Name', key: 'name', width: 30 },
        { header: 'Kategorie', key: 'kategorie', width: 20 },
        { header: 'Betrag (€)', key: 'betrag', width: 15 },
        { header: 'Beschreibung', key: 'beschreibung', width: 40 }
    ];

    // Style den Header
    worksheet.getRow(1).font = { bold: true, size: 12 };
    worksheet.getRow(1).fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FF4472C4' }  // Blau
    };
    worksheet.getRow(1).font = { bold: true, color: { argb: 'FFFFFFFF' } };

    // Füge die Daten hinzu
    ausgaben.forEach(ausgabe => {
        worksheet.addRow({
            datum: new Date(ausgabe.datum).toLocaleDateString('de-DE'),
            name: ausgabe.name,
            kategorie: ausgabe.kategorie,
            betrag: ausgabe.kostet,
            beschreibung: ausgabe.beschreibung || ''
        });
    });

    // Formatiere die Spalte Betrag als Währung
    worksheet.getColumn('betrag').numFmt = '#,##0.00 €';
    worksheet.getColumn('betrag').alignment = { horizontal: 'right' };

    // Füge die Summe am Ende hinzu
    const totalRow = worksheet.addRow({
        datum: '',
        name: '',
        kategorie: 'GESAMT:',
        betrag: ausgaben.reduce((sum, ausgabe) => sum + ausgabe.kostet, 0),
        beschreibung: ''
    });
    totalRow.font = { bold: true };
    totalRow.getCell('kategorie').alignment = { horizontal: 'right' };

    // Füge Rahmen zu allen Zellen hinzu
    worksheet.eachRow((row, rowNumber) => {
        row.eachCell((cell) => {
            cell.border = {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' }
            };
        });
    });

    // Abwechselnde Farben für Zeilen (Zebra-Streifen)
    worksheet.eachRow((row, rowNumber) => {
        if (rowNumber > 1 && rowNumber < worksheet.rowCount) {
            if (rowNumber % 2 === 0) {
                row.fill = {
                    type: 'pattern',
                    pattern: 'solid',
                    fgColor: { argb: 'FFF2F2F2' }
                };
            }
        }
    });

    // Generiere die Datei und lade sie herunter
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { 
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' 
    });
    
    // Dateiname mit Datum
    const today = new Date().toISOString().split('T')[0];
    saveAs(blob, `${filename}_${today}.xlsx`);
};