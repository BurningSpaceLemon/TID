# TID – Arbeitszeit-Tracker

Vollständige statische Progressive Web App für GitHub Pages. Alle Arbeitszeitdaten werden ausschließlich im Browser des verwendeten Geräts in IndexedDB gespeichert.

## GitHub Pages bereitstellen

1. Neues GitHub-Repository erstellen, zum Beispiel `tid`.
2. **Den Inhalt dieses Ordners** in das Stammverzeichnis des Repositorys hochladen. `index.html` muss direkt im Repository-Stamm liegen.
3. In GitHub **Settings → Pages** öffnen.
4. Unter **Build and deployment** die Quelle **Deploy from a branch** auswählen.
5. Branch `main` und Ordner `/(root)` auswählen und speichern.
6. Nach dem Deployment die von GitHub angezeigte HTTPS-Adresse öffnen.

Die relativen Pfade funktionieren sowohl auf einer Benutzerseite als auch in einem Projekt-Unterordner wie `https://burningspacelemon.github.io/tid/`.

## Auf dem iPhone installieren

1. Die GitHub-Pages-Adresse in **Safari** öffnen.
2. Auf **Teilen** tippen.
3. **Zum Home-Bildschirm** auswählen.
4. Den Namen `TID` bestätigen.

## Updates veröffentlichen

Bei jeder Veröffentlichung müssen diese Stellen dieselbe semantische Version enthalten:

- `APP_VERSION` in `index.html`
- `APP_VERSION` in `sw.js`
- `version` in `version.json`

Beispiel: `0.1.0` → `0.1.1`.

Bei Änderungen an der lokalen Datenstruktur außerdem erhöhen:

- `SCHEMA_VERSION` in `index.html`
- `schemaVersion` in `version.json`

Vor einer Schema-Migration legt TID im lokalen Datensatz automatisch eine Sicherung an. Der Service Worker behält zusätzlich eine vorherige Cache-Version als Rückfallebene.

## Wichtige Hinweise

- Das Löschen von Safari-Websitedaten löscht auch die lokalen TID-Daten.
- Vor einem Gerätewechsel oder dem Löschen der Website-Daten ein Backup exportieren.
- Der aktuelle Backup-Export ist gemäß Spezifikation unverschlüsselt und enthält persönliche Daten im Klartext.
- PDF-Ausgabe erfolgt über den iOS-Druckdialog. Dort kann die Druckvorschau als PDF über das Teilen-Menü gespeichert werden.
- Feiertage werden online aktualisiert und anschließend lokal zwischengespeichert. Ein lokaler Bayern-Kalender dient als Offline-Rückfall.
