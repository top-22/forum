# TUC Forum

## Skripte
- `yarn dev`: Run a local development server
- `yarn tunnel`: start the tunnel to access the database on localhost
  - `cloudflared` must be installed
- `yarn testdata <user>`: Generiert SQL-Befehle um Testdaten in persönliches Schema zu kopieren
  - Befehle können im Anschluss optional ausgeführt werden
  - psql must be installedBefehle können im Anschluss optional ausgeführt werden
  - psql must be installed

## Testdaten
- Beiden Schemas müssen gleiche Version haben
- Dieser SQL-Befehl kopiert Testdaten aus dem `testdata`-Schema in ein anderes Schema
- alle aktuellen Daten werden dabei gelöscht!
```sql
DELETE FROM <schema>."<table>";
INSERT INTO <schema>."<table>" SELECT * FROM testdata"<table>";
```
- Basierend auf dem aktuellen Schema können mit dem script `yarn testdata` die Befehle automatisiert erstellt werden
