# Tor Ips

## Table of Contents

1. [Instructions](#instructions)
    1. [Config](#config)
    2. [Installation](#installation)
    3. [Test](#test)
    4. [API Docs](#api-docs)
2. [API](#api)    
    1. [Folder Structure](#folder-structure)
    2. [Scripts](#scripts)
    3. [Dependencies](#dependencies)
    4. [Dev-Dependencies](#dev-dependencies)

## Instructions

### Config

View/edit enviornment varables configurations.

```bash
cat .env
nano .env
```

### Installation

This will use an sqllite database `without` docker.

```bash
cd app
npm install
npm run dev
```

This will spin up a external mysql database `with` docker.

```bash
# Start
docker-compose up -d --build

# Stop
docker-compose down
```

### Test

Run static code coverage

```bash
cd api
npm install
npm run lint
npm run test
```

### API Docs

View API documentation

```bash
cd api
npm install
npm run dev

http://localhost:3000/docs
```

## API

### Folder Structure

```bash
- /api - Api source code
    - /lib - Libary for source code
        - /data - Database config/orm/schema
        - /docs - Swagger docs module
        - /ingest - Fetch external sources
        - /parse - Handle html
        - /service - Core API logic
        - /validate - Verfiy ingest data is valid
        - server.js - Express api framework
    - /test - Jest unit tests
        - /__MOCK__ - Used for testing/mocking
    - Docekerfile - Containerize the node.js api
    - index.js - Main app startup
```

### Scripts

- `lint` - Run eslint for code style convention
- `start` - Start API
- `dev` - Listen for changes and re-start API
- `test` - Run unit tests for code coverage

### Dependencies

- `cheerio` - HTML parsing
- `dotenv` - Inject Enviroment variable from files
- `express` - API framework
- `mysql2` - Database connector
- `node-fetch` - Fetch Data from external sources
- `sequelize` - ORM for SQL
- `swagger-jsdoc` - Parse express routes jsdocs
- `swagger-ui-express` - Converts Docs into swagger ui

### Dev-Dependencies

- `eslint` - Code style convention
- `jest` - Unit testing
- `nodemon` - File listener
- `sqlite3` - Dev SQL database
- `supertest` - Mock Express API

