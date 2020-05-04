# Load Monitoring UI

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

Run Build

```js
npm run build
```

Run on port localhost:8080

```js
npm start
```

Test Endpoint

```bash
http://localhost:8080
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
- /coverage - Test coverage results
- /dist - Output directory of application
- /node_modules - NPM dependencies
- /src
  - /components
    - Alert.js - Toast notfication helper
    - App.js - Holds the application component
    - Graph.js - Scatter Plot Graph
    - Root.js - Links Redux, Router, and React all togther
    - TimeSeris.js - Time Seris Graph
  - /constants
    - appConstant.js - Constants for the app component
    - eventConstant.js - Constants for the event component
    - timeConstant.js - Constants for the time component
  - /reducers - Reducers for updating State
    - appReducer.js - Application reducers
    - eventReducer.js - Event reducers
    - index.js - Entry point to all reducers
  - /service
    - /request
      - fetchLoadAverageRequest.js - AJAX service to get load average from API
    - index.js - Entery point to all services
  - /store - Contains Redux logic
  - index.html - Root react HTML
  - index.js - Root react application
- /test - Unit Tests
  - /e2e - End to End Test
  - /mock - Mock files
  - /unit - Unit Test
- babel.config.js - Transpiler configuration
- package.json - Package information
- webpack.config.js - Webpack config to build SPA
```

## NPM Dependencies

The web application will be using React, Redux, React-Router for the main framework. React-Timeseries-Charts will be the main library to display the monitoring widget. React-Tositfy will be used for displaying alert notifications.

Using the dev dependencies for unit tests, mocking, hot reloading, and lint.

### Dependencies

- react - React application
  - react-dom - React Dom
  - prop-types - Prop tpye validator
- react-timeseries-charts - Graph components
  - pondjs - Time series
  - d3-format - Tooltip
- react-toastify - Toast Notification
- redux - State managment
  - react-redux - State Provider
- react-router - Routing
  - react-router-dom - React router dom
  - connected-react-router - Connects react to router
  - history - History for SPA
- superagent - AJAX request

### Dev-Dependencies

- babel - Javascript Transpiler
  - @babel/cli
  - @babel/core
  - @babel/node
  - @babel/plugin-proposal-class-properties
  - @babel/plugin-transform-runtime
  - @babel/preset-env
  - @babel/preset-es2015
  - @babel/preset-react
  - @babel/register
  - babel-eslint
- eslint - Style Check
  - eslint
  - eslint-config-airbnb
  - eslint-import-resolver-webpack
  - eslint-plugin-import
  - eslint-plugin-jsx-a11y
  - eslint-plugin-react
- jest - Testing Dependencies
  - enzyme
  - enzyme-adapter-react-16
  - jest
  - jest-cli
  - jsdom
  - react-jest
  - redux-test-utils
  - sinon
  - superagent-mock
- webpack - Applicaition Builder and Compiler
  - webpack
  - webpack-cli
  - webpack-dev-server
  - babel-loader
  - css-loader
  - file-loader
  - html-loader
  - html-webpack-plugin
  - mini-css-extract-plugin
  - style-loader
