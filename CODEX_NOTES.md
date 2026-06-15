# PollApp - Codex Arbeitsgrundlage

Dieses README ist die interne Arbeitsbasis fuer die Umsetzung der Poll-App. Erstes Ziel ist Struktur, Design, Responsive-Verhalten und Mobile-Version. Fachlogik, echte Datenpersistenz und dynamische Abstimmungslogik kommen spaeter.

## Projektstand

- Angular-Projekt: `pollApp`
- Package-Name: `poll-app`
- Angular CLI: `21.2.11`
- Start: `npm start`
- Build: `npm run build`
- Test: `npm test`

## Quellen

Gelesene Basisdokumente:

- `Coding Convention HTML (1).pdf`
- `Coding Konvention TypeScript (1).pdf`
- `Poll-App Checkliste.pdf`

Design-Vorlagen:

- `design/Home.svg`
- `design/Create Survey.svg`
- `design/Create Survey added quistion.svg`
- `design/Single survey view  + results.svg`
- `design/Single survey view  -  no results yet.svg`

Offene Referenz:

- `basic_project/product_list` wurde im aktuellen Workspace und unter `D:\Developer 2025` nicht gefunden. Sobald der Ordner verfuegbar ist, soll die Komponenten- und Styling-Struktur daran angeglichen werden.

## Design-Richtung

Die SVGs sind die visuelle Grundlage. Die App soll sich daran orientieren:

- Dunkles Violett als zentrale App-Flaeche.
- Heller Seiten-/Aussenhintergrund.
- Warme Apricot-Akzente fuer Buttons, Tabs, aktive Elemente und Highlights.
- Grosse, ruhige Layout-Flaechen mit klaren Kanten.
- Keine Marketing-Landingpage, sondern direkt die nutzbare Poll-App.
- Alle Bilder und grafischen Assets als SVG verwenden.
- Hintergruende und Effekte duerfen die volle Breite nutzen.
- Inhaltliche App-Container maximal auf `120rem` begrenzen, was bei `1rem = 16px` der gewuenschten Breite von `1920px` entspricht.

## Responsive-Regeln

- Keine festen Groessen in `px` fuer Layout, Abstaende, Schrift oder Komponenten verwenden.
- Stattdessen `rem`, `%`, `fr`, `vw/vh`, `clamp()`, `min()`, `max()` oder containerbasierte Werte nutzen.
- Keine Schrift kleiner als `1rem`.
- Layout zuerst fuer Desktop sauber strukturieren, dann Tablet und Mobile ableiten.
- Desktop: Abstimmung und Ergebnisbereich koennen nebeneinander stehen.
- Mobile: Bereiche untereinander stapeln, Navigation und Aktionen bleiben gut erreichbar.
- Text darf nicht ueberlaufen oder andere Inhalte ueberdecken.
- Wiederkehrende UI-Elemente bekommen stabile Dimensionen, damit Hover, Labels oder Statuswechsel kein Layout-Springen erzeugen.

## UI-Pflichtregeln

- Jeder Button bekommt einen sichtbaren Hover-Effekt.
- Interaktive Elemente bekommen zusaetzlich klare Focus-States.
- Buttons enthalten bei passenden Aktionen Icons, bevorzugt aus einer bestehenden Icon-Library, falls spaeter eine eingebunden wird.
- Keine sichtbaren Erklaertexte im UI, die nur beschreiben, wie die App funktioniert.
- Keine verschachtelten Cards.
- Cards nur fuer einzelne wiederholte Items, Modals oder klar abgegrenzte Tools.
- Keine reinen Deko-Orbs, Bokeh-Flecken oder generischen Gradient-Dekorationen.
- Farbpalette nicht einfarbig halten: dunkles Violett und Apricot sind Kernfarben, aber Neutrals und Statusfarben muessen bewusst eingesetzt werden.

## Geplante App-Struktur

Erster Fokus: Komponenten, Layout und responsives Design ohne echte Business-Logik.

- `home`: Homescreen mit dringenden Umfragen, Tabs und Survey-Liste.
- `survey-card`: Wiederverwendbare Karte fuer einzelne Umfragen.
- `survey-detail`: Detailansicht mit Frage, Antwortoptionen und Ergebnisbereich.
- `survey-results`: Visuelle Ergebnisdarstellung, auch fuer "noch keine Ergebnisse".
- `create-survey`: Formular oder Modal zum Erstellen einer Umfrage.
- `question-editor`: UI fuer hinzugefuegte Fragen und Antwortoptionen.
- `layout/header`: App-Kopfbereich mit Logo/Brand und Hauptaktionen.
- `shared/ui`: spaeter kleine UI-Bausteine wie Button, Tab, Badge, Input, Card.

## User-Stories Als UI-Struktur

Die Checkliste wird aktuell nur strukturell und visuell vorbereitet:

- User Story 1: Ueber der allgemeinen Liste erscheint ein Bereich fuer bald endende Umfragen, sortiert nach fruehestem Enddatum.
- User Story 2: Homescreen zeigt alle Umfragen mit Reiter fuer laufende und abgeschlossene Umfragen. Jede Umfrage zeigt Titel, Kurzbeschreibung und Deadline.
- User Story 3: `New Survey` Button fuehrt zu Formular, Modal oder separater Erstellansicht. Pflichtfelder und optionale Felder sind visuell klar getrennt.
- User Story 4: Klick auf laufende Umfrage fuehrt zur Detailansicht. Beendete Umfragen wirken deaktiviert und gehoeren in `Past Survey`.
- User Story 5: Detailansicht zeigt Abstimmung links und Auswertung rechts auf Desktop. Auf Mobile wird daraus eine vertikale Reihenfolge.

## HTML-Konventionen

Aus der HTML-Konvention:

- Semantische Tags verwenden: `header`, `nav`, `main`, `section`, `article`, `aside`, `footer`.
- Heading-Hierarchie sauber halten: `h1` bis `h6` nur sinnvoll gestaffelt.
- `section` fuer thematische Bereiche, `article` fuer eigenstaendige Inhalte.
- `aside` fuer Zusatzinfos, nicht als Layout-Ersatz.
- Bilder mit Bedeutung als `figure` und `figcaption`.
- So wenig `div` wie moeglich, so viel wie noetig.
- Fliesstext in `p`, nicht in generische Container.
- Hervorhebungen mit `strong` oder `em`.
- Gute `alt`-Texte fuer Bilder.
- Navigation als Liste in `nav`.
- Tabellen, falls noetig, mit `caption`, `th` und logischer Struktur.
- Struktur und Darstellung trennen.

## TypeScript-Konventionen

Aus der TypeScript-Konvention:

- Dateinamen in `kebab-case`.
- Funktionen in `camelCase`.
- Klassen, Interfaces und Types in `PascalCase`.
- Konstanten in `UPPER_CASE`, wenn es echte globale Konstanten sind.
- Maximal etwa 14 Zeilen pro Funktion anstreben.
- Semikolons verwenden.
- Kein `any`, wenn ein exakter Typ oder `unknown` moeglich ist.
- Typen und Rueckgabewerte explizit angeben.
- Imports gruppieren: Standard/Framework, Drittanbieter, lokal.
- Eine Aufgabe pro Funktion.
- Keine Magic Numbers, stattdessen benannte Konstanten.
- Lesbare Bedingungen, z.B. `isSurveyActive` statt kryptischer Variablen.
- HTML nicht unnoetig inline in TypeScript erzeugen.
- TSDoc fuer Funktionen und Methoden, wenn die Absicht nicht sofort klar ist.

## CSS/SCSS-Leitlinien

- Globale Design-Tokens in `src/styles.scss` oder spaeter in dedizierten Styles-Dateien definieren.
- Farben, Spacing, Radius, Schatten und Typografie als Custom Properties halten.
- `box-sizing: border-box` global setzen.
- Basis-Schriftgroesse mindestens `1rem`.
- Containerbreite ueber `max-width: 120rem` und fluide Innenabstaende steuern.
- Komponenten-SCSS lokal halten, globale Utility-Klassen nur sparsam einsetzen.
- Zustaende wie `:hover`, `:focus-visible`, `:disabled`, `.is-active` und `.is-empty` konsequent gestalten.

## Erste Umsetzungsetappe

1. App-Shell und globale Design-Tokens einrichten.
2. Home-Screen nach `Home.svg` strukturieren.
3. Create-Survey-View nach beiden Create-SVGs bauen.
4. Survey-Detail fuer "mit Ergebnissen" und "noch keine Ergebnisse" vorbereiten.
5. Responsive Breakpoints und Mobile-Version pruefen.
6. Erst danach Logik, Datenmodelle und Interaktionen vertiefen.
