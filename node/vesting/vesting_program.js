#!/usr/bin/env node

const { init } = require('./src/runner');

init(process.argv.slice(2));