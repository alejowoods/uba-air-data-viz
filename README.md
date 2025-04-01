# UBA Air Data Visualizer

Single Page Application (SPA) zur Visualisierung von Immissionsdaten vom Umweltbundesamt (UBA).

## Technologien

- Nuxt 3
- Vue 3 (Composition API)
- TailwindCSS
- Chart.js
- Vue I18n (Mehrsprachigkeit)
- @vuepic/vue-datepicker
- CSV-Export (manuell erstellt)
- API-Proxy via `server/api` (für CORS-Schutz)

---

## Funktionsfluss und Komponenten

1. **Nutzer wählt einen Zeitraum aus (DateSelector.vue).**  
   Daten werden lokal überprüft (Startdatum < Enddatum). Danach wird ein Event `datesSelected` an das Hauptmodul gesendet.

2. **Ausgewählten Daten werden in App.vue verarbeitet.**  
   App.vue übernimmt die zentrale Logik der Anwendung. Es empfängt die Daten vom DateSelector, erstellt eine URL für die API-Anfrage und steuert den Ladezustand (`isLoading`) sowie den Anzeigemodus (Tabelle oder Diagramm).

3. **Anfrage wird an eine lokale API weitergeleitet (`server/api/airdata.js`).**  
   Diese Middleware verhindert CORS-Probleme im Browser. Sie nimmt die Parameter entgegen, macht die Anfrage an das Umweltbundesamt und gibt die JSON-Daten an die App zurück.

4. **Die Daten werden je nach Ansicht dargestellt:**

   - `OzoneChart.vue`: Zeigt die Ozonwerte in einem Liniendiagramm (Chart.js).
   - `OzoneTable.vue`: Stellt die Messwerte als Tabelle dar (Stundenmittelwert).

---

## Komponentenübersicht

| Komponente         | Funktion                                                             |
|--------------------|----------------------------------------------------------------------|
| `App.vue`          | Hauptlogik, empfängt Daten, verwaltet Ladezustand & Ansicht         |
| `DateSelector.vue` | Auswahl & Validierung von Start- und Enddatum                       |
| `OzoneChart.vue`   | Zeigt die Ozonwerte als Diagramm, mit Download (PNG)                |
| `OzoneTable.vue`   | Tabellarische Anzeige der Messdaten, Download als CSV               |
| `Header.vue`       | Titel + Sprachumschaltung (i18n), responsive Design                 |
| `Footer.vue`       | Autorenhinweis, GitHub & LinkedIn, mit Fade-In-Effekt               |
| `server/api/airdata.js` | Proxy zur UBA API, um Browser-CORS zu umgehen                   |

---

## Improvements (Zukunft)

- Auswahl anderer Messstationen (nicht nur Radebeul)
- Mehr Auswahlmöglichkeiten für andere Schadstoffe (NO₂, PM10, etc.)
- Filteroptionen nach Uhrzeit oder Tageszeit
- Sortierfunktion in der Tabelle
- Fehlerbehandlung bei leeren oder unvollständigen Daten
- Kleine Ladeanimation statt Text beim Warten auf Daten

---

## Entwickler

Alejandro Moreno  
[LinkedIn](https://www.linkedin.com/in/lamorenos/) | [GitHub](https://github.com/alejowoods)

Mit Unterstützung von Chico 🐾


# uba-air-data-viz
Anwendung zur Anzeige der API-Informationen des Umweltbundesamtes an einer bestimmten Station.
# Nuxt Minimal Starter

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
