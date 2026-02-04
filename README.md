### Mein Budget

Eine einfache App um mein Budget zu verwalten. Ich kann Ausgaben hinzufügen und sehen wie viel Geld ich noch habe. ***Mein Budget*** ist eine React-Anwendung zur Verwaltung persönlicher Finanzen. Die App ermöglicht es, ein Budget festzulegen, Ausgaben zu erfassen und zu kategorisieren, sowie eine statistische Übersicht über die Ausgabenverteilung zu erhalten. Alle Daten werden automatisch im Browser gespeichert.

---

## Technologien
| Technologie                   | Verwendungszweck

| **React**                     | Frontend-Framework für die Benutzeroberfläche |
| **TypeScript**                | Typisierung für bessere Code-Qualität und Fehlervermeidung |
| **Bootstrap 5**               | CSS-Framework für das responsive Design und Styling |
| **React Icons**               | Icons für die Bearbeiten- und Löschen-Buttons (TiEdit, TiDelete) |
| **UUID**                      | Generierung von eindeutigen IDs für jede Ausgabe |
| **Context API + useReducer**  | Globales State-Management der Anwendung |
| **LocalStorage**              | Persistente Datenspeicherung im Browser |



## Setup und Installation

### Voraussetzungen
- Node.js (Version 16 oder höher empfohlen)
- npm (wird mit Node.js mitgeliefert)


### Schritt-für-Schritt Installation

1. **Projektordner entpacken** (falls als ZIP erhalten)

2. **Terminal öffnen** und zum Projektordner navigieren:
   ```bash
   cd meinbudget
   ```

3. **Abhängigkeiten installieren:**
   ```bash
   npm install
   ```

4. **Anwendung starten:**
   ```bash
   npm start (oder npm run dev für Developer)

5. Die Anwendung öffnet sich automatisch im Browser unter [http://localhost:3000](http://localhost:3000)

---





## 📘 Nutzungshinweise

### Budget festlegen
- Klicken Sie auf **"Bearbeiten"** in der Budget-Karte (oben links)
- Geben Sie Ihr gewünschtes Budget ein
- Klicken Sie auf **"Speichern"**

### Ausgabe hinzufügen
- Füllen Sie das Formular "Füge eine neue Ausgabe hinzu" aus:
  - **Ausgabe Titel** (Pflichtfeld) - z.B. "Mittagessen"
  - **Betrag** (Pflichtfeld) - z.B. "12.50"
  - **Kategorie** - wählen Sie aus: Unterkunft, Verpflegung, Transport, Aktivitäten, Einkäufe, Sonstiges
  - **Datum** - wird automatisch auf heute gesetzt
  - **Beschreibung** (optional)
- Klicken Sie auf **"Ausgabe Hinzufügen"**

### Ausgaben verwalten
- **Bearbeiten:** Klicken Sie auf das 📝 Icon neben einer Ausgabe
- **Löschen:** Klicken Sie auf das ❌️ Icon (mit Bestätigung)
- **Filtern:** Nutzen Sie das Dropdown "Nach Kategorie filtern"

### Farbcodierung des Restbudgets
- 🟢 **Grün:** Budget ist ausreichend
- 🟡 **Gelb:** Weniger als 250€ verbleibend - Achtung!
- 🔴 **Rot:** Budget überschritten

### Datenspeicherung
Alle Daten werden automatisch im Browser (LocalStorage) gespeichert und bleiben auch nach dem Schließen des Browsers erhalten.

---


## </> Umgesetzte Features

### Grundfunktionen
- ✔ Budget festlegen und bearbeiten
- ✔ Ausgaben hinzufügen mit Formular-Validierung
- ✔ Ausgaben bearbeiten (über Modal-Dialog)
- ✔ Ausgaben löschen (mit Bestätigungsdialog)
- ✔ Übersicht: Budget, Restbudget, Gesamtausgaben
- ✔ Kategorisierung der Ausgaben (6 Kategorien)
- ✔ Filterung nach Kategorien
- ✔ Automatische Sortierung nach Datum (neueste zuerst)
- ✔ Statistische Auswertung mit Prozentbalken
- ✔ Persistente Datenspeicherung (LocalStorage)

### Zusätzliche Features
- ✔ Farbliche Budget-Warnung (Grün → Gelb → Rot)
- ✔ Formularvalidierung mit Fehlermeldungen
- ✔ Währungsformatierung im deutschen Format (1.234,56 €)
- ✔ Datumsformatierung im deutschen Format (TT.MM.JJJJ)
- ✔ Farbige Kategorie-Badges für bessere Übersichtlichkeit
- ✔ Responsive Design für verschiedene Bildschirmgrößen(Bootstrap-Grid passt sich an verschiedene Fensterbreiten an)
        



## ⿻ Screenshots

*Die Screenshots zeigen verschiedene Funktionen der Anwendung:*

1. **Hauptansicht** - Komplette Übersicht mit Budget, Restbudget und Ausgabenliste
2. **Ausgabe hinzufügen** - Das Formular mit Validierung
3. **Kategoriefilter** - Gefilterte Ansicht einer Kategorie
4. **Statistik** - Prozentuale Darstellung der Ausgaben pro Kategorie

---


## 🌐 Kurze Reflexion

### Was lief gut?

- Die **Strukturierung in Komponenten** (Budget, Remaining, Ausgegeben, ExpenseItem, Expenseliste, etc.) hat die Entwicklung übersichtlich gemacht. Jede Komponente hat eine klare Aufgabe.

- Die **schrittweise Entwicklung** - erst die statische Oberfläche (Hard-Coded), dann die dynamische Funktionalität - war sehr hilfreich zum Verstehen.

- **Bootstrap** hat das Styling enorm vereinfacht. Die vorgefertigten Klassen wie `alert`, `btn`, `form-control` sparen viel Zeit.

- Die **Context API mit useReducer** funktioniert gut für das State-Management. Alle Komponenten können auf die Daten zugreifen ohne Props-Drilling.

- Die **LocalStorage-Integration** mit useEffect war einfacher als gedacht - bei jeder State-Änderung wird automatisch gespeichert.


### Wo gab es Herausforderungen?

- Das Konzept von **Context, Reducer und Dispatch** war anfangs schwer zu verstehen. Die Analogie mit dem Bankautomat (State = Kontostand, Action = Knopfdruck, Reducer = Logik) hat geholfen.(Linie 83 bis 106 in App.tsx- Kommentiertes Beispiel)

- Bei **React Icons** gab es Importprobleme, die mit einer Typdefinition gelöst wurden.

- Ein **Tippfehler** bei der Locale-Einstellung ("de-DE " mit Leerzeichen) führte zu einem Fehler, der aber relativ einfach zu finden war.

### Was würde ich bei mehr Zeit noch umsetzen?

-  **ExcelJS Integration** - Export aller Ausgaben als Excel-Datei für bessere Dokumentation
-  **Supabase Authentication** - Benutzeranmeldung für mehr Sicherheit und Privatsphäre der Finanzdaten
-  **Dark/Light Theme** - Umschaltbares Design für bessere Benutzererfahrung
-  **Mehrsprachigkeit (i18n)** - Unterstützung für Deutsch, Englisch und andere Sprachen, damit die App international nutzbar ist
-  **Mobile Optimierung** - Noch besseres responsive Design für Smartphones
-  **Erweiterte Statistiken** - Diagramme mit Chart.js für bessere Visualisierung

---

## 🗁 Projektstruktur

```
meinbudget/
├── public/
│   ├── index.html              # HTML-Grundgerüst
│   └── manifest.json           # PWA-Konfiguration
├── src/
│   ├── components/
│   │   ├── AusgabeBearbeitenModal.tsx          # Modal zum Bearbeiten 
│   │   ├── AusgabeHinzufuegenForm.tsx          # Formular für neue Ausgaben
│   │   ├── AusgabeItem.tsx                     # Einzelne Ausgabe in der Liste
│   │   ├── AusgabeListe.tsx                    # Ausgabenliste mit Filter
│   │   ├── Ausgegeben.tsx                      # Gesamtausgaben-Anzeige
│   │   ├── Budget.tsx                          # Budget-Anzeige und Bearbeitung
│   │   ├── BudgetBearbeiten.tsx                # Budget-Bearbeitung (Edit-Mode)
│   │   ├── BUdgetSehen.tsx                     # Budget-Ansicht (View-Mode)
│   │   ├── GebliebenesBudget.tsx               # Restbudget-Anzeige mit Farbcodierung
│   │   └── Statistik.tsx                       # Statistische Auswertung
│   ├── context/
│   │   └── AppContext.tsx                      # Context + Reducer (State-Management)
│   ├── types/
│   │   └── types.tsx                        # TypeScript-Typdefinitionen
│   ├── utils/
│   │   └── formatCurrency.tsx               # Währungsformatierung
│   ├── App.tsx                              # Haupt-Komponente
│   └── index.tsx                            # React-Einstiegspunkt
├── package.json                             # Abhängigkeiten und Scripts
├── tsconfig.json                            # TypeScript-Konfiguration
└── README.md                                # Diese Dokumentation
```

---

## 🌐 Browser-Kompatibilität

Getestet und funktionsfähig in:
- ✔ Google Chrome (aktuell)
- ✔ Microsoft Edge (aktuell)
- ✔ Mozilla Firefox (aktuell)

---

## ℹ️ Hinweise

- Die Anwendung benötigt JavaScript im Browser
    - Obwohl es mit Typescript geschrieben würde, beim "npm start"-"npm run dev"-"npm run build" wird TypeScript
      automatisch zu normalem JavaScript umgewandelt. Das ist das, was dann im Browser läuft.
- Daten werden nur lokal im Browser gespeichert (LocalStorage)
- Beim Löschen des Browser-Cache werden die Daten gelöscht

---

**Vielen Dank für die Möglichkeit, dieses Projekt umzusetzen!** 🙏


