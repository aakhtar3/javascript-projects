# Load Monitoring API

## Table of Contents

1. [Set Up](#set-up)
2. [Scripts](#scripts)
3. [Folder Structure](#folder-structure)
4. [NPM Dependencies](#npm-dependencies)
    1. [Dependencies](#dependencies)
    2. [Dev-Dependencies](#dev-dependencies)

## Set Up

Install dependencies

```js
npm i
```

Run on port localhost:3000

```js
npm start
```

Test Endpoint

```bash
http://localhost:3000/averageLoad
```

## Scripts

Unit test

```js
npm t
```

Lint code style check

```js
npm run lint
```

## Folder Structure

```bash
- /lib
  - /monitor
    - controller.js - Controlles the flow of sync/async code
    - os.js - Operating system
    - router.js - Index point for all monitor rotues
    - service.js - Bussines logic
    - time.js - Moment logic
  - server.js - Express server application
- /node_modules - NPM dependencies
- /test - Unit Tests
- app.js - Starting point of application
- package.json - Package information
```

## NPM Dependencies

I am using express dependency to serve up a RESTful API server.

Using the dev dependencies for unit tests, mocking, hot reloading, and lint.

### Dependencies

- express - RESTful web API to get metric from server
  - cors - Enables CORS
- moment-timezone - Date helper

### Dev-Dependencies

- eslint - Code style check
- mocha - Unit test runner
  - chai - Assertion library
  - sinon - Mocking helper
  - supertest - RESTful unit test helper
- nodemon - Server hot reloader
