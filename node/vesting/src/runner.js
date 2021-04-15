#!/usr/bin/env node

const { processInput } = require('./input');
const { processEvents } = require('./process');
const { processOutput } = require('./output');

const init = (cliArguments) => {
    try {
        return run(cliArguments);
    } catch (error) {
        handleError(error);
    }
};

const run = (cliArguments) => {
    const { events, targetDate, fractionPercision } = processInput(cliArguments);

    const processedEvents = processEvents(events, targetDate);

    const output = processOutput(processedEvents, fractionPercision);

    console.log(output);
    return output;
}

const handleError = (error) => {
    console.error(error);
};

module.exports = {
    init
};
