# node_schedule

Een Node.js/Express-applicatie die taken (jobs) inplant en uitvoert met behulp van een scheduler. De applicatie biedt een API om de scheduler te beheren, logs op te vragen en query-routes aan te roepen.

## Inhoudsopgave

- [Functionaliteit](#functionaliteit)
- [Vereisten](#vereisten)
- [Installatie](#installatie)
- [Configuratie](#configuratie)
- [Gebruik](#gebruik)
- [API-endpoints](#api-endpoints)
- [Projectstructuur](#projectstructuur)
- [Licentie](#licentie)

## Functionaliteit

- Plannen en uitvoeren van periodieke taken via de scheduler
- Overzicht van de status en de geplande jobs
- Logs van uitgevoerde jobs opvragen
- Starten en annuleren van jobs via de API
- Query-routes voor contracten, NPS-gegevens en de database

## Vereisten

- [Node.js](https://nodejs.org/) (aanbevolen: een recente LTS-versie)
- npm
- Toegang tot de externe services die in de configuratie worden gebruikt (bijv. Salesforce)

## Installatie

```bash
# Clone de repository
git clone https://github.com/JohnGorter/node_schedule.git
cd node_schedule

# Installeer de dependencies
npm install
```

De frontend in de map `client` installeer je apart:

```bash
npm run client-i
```

## Configuratie

De applicatie gebruikt omgevingsvariabelen die via een `.env`-bestand geladen worden met [dotenv](https://www.npmjs.com/package/dotenv).

| Variabele    | Beschrijving                              | Standaard |
|--------------|-------------------------------------------|-----------|
| `PORT`       | Poort waarop de server draait             | `5000`    |
| `NODE_ENV`   | Zet op `production` voor productiemodus   | -         |

Daarnaast vereisen de configuratiebestanden in de map `config` (zoals de Salesforce-verbinding) de benodigde inloggegevens. Voeg deze **nooit** toe aan de repository.

## Gebruik

Start de server:

```bash
npm start
```

Start de server met automatische herstart bij wijzigingen (nodemon):

```bash
npm run server
```

Start de server én de client tegelijk in ontwikkelmodus:

```bash
npm run dev
```

Bij het opstarten logt de server `Server started on port <PORT>`, logt in op Salesforce en start daarna de scheduler.

## API-endpoints

| Methode | Route            | Beschrijving                                      |
|---------|------------------|---------------------------------------------------|
| GET     | `/logs`          | Geeft de logs van de scheduler terug              |
| GET     | `/jobs`          | Geeft de status en de jobs van de scheduler terug |
| POST    | `/cancel`        | Annuleert alle geplande jobs                      |
| GET     | `/start`         | Start de scheduler                                |
| *       | `/contract_query`| Routes voor contractgegevens                      |
| *       | `/nps_query`     | Routes voor NPS-gegevens                          |
| *       | `/db_query`      | Routes voor databasequery's                       |

## Projectstructuur

```
node_schedule/
├── client/         # Frontend-applicatie
├── config/         # Configuratie (bijv. jsforce/Salesforce)
├── jobs/           # Definities van de uit te voeren taken
├── routes/         # Express-routes (contractQuery, npsQuery, dbQuery)
├── scheduler/      # Scheduler-logica
├── index.js        # Startpunt van de applicatie
├── package.json
└── package-lock.json
```

## Licentie

Dit project is gelicentieerd onder de ISC-licentie.
