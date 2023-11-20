## Požadavky

- [NodeJS](https://nodejs.org) LTS (verze 18+)
- npm (TODO: odstranit yarn.lock)
- (Na Windows) [WSL 2](https://learn.microsoft.com/en-us/windows/wsl/install)
- [Docker](https://www.docker.com/) (pro odeslání)

## Instalace

1. `git clone https://github.com/Tour-de-App/expressjs-boilerplate tda-express`
2. `cd tda-express`
3. `npm install`

### Lokální spuštění

Lokální spuštění používá nodemon, který automaticky aktualizuje vaši aplikaci při změně v kódu.

#### Linux a macOS
```
ENV=development npm start
```

#### Windows (cmd)
```
set ENV=development & npm start
```

Aplikace ve výchozím stavu běží na [`http://localhost:3000`](http://localhost:3000)

### Docker spuštění
**Windows uživatelé spouštějte ve WSL terminálu**
```
docker build . -t tda-express
docker run -p 8080:80 tda-express
```

## Struktura

- Složka `public` obsahuje __statické__ soubory (CSS, JS apod.)
- Složka `views` obsahuje šablony stránek napsané v jazyce [Pug](https://pugjs.org/api/getting-started.html)
  - Pug nám umožňuje do stránek vkládat obah dynamicky z kódu, používat funkce nebo podmínky
  - Pro více info se podívejte na dokumentaci Pug
- Složka `routes` obsahuje všechny cesty, které vrací nějaký obsah
  - Soubor `index.js` obsahuje ukázku vyrenderování šablony `index.pug` (ve složce `views`) na cestě `/`, kde je nastaven parametr `title`
  - Soubor `users.js` obsahuje ukázku surového odeslání dat, zde prostého textu

Pro více informací si pročtěte [oficiální Express tutoriál](https://expressjs.com/en/guide/routing.html) (anglicky)

## Odevzdání

TODO: sepsat podle finální verze odevzdávacího systému
