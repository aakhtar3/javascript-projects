const { readFileSync } = require('fs');

const { convertToDate } = require('./date');

const processInput = ([ fileName, date, fractionPercision = 0 ]) => {
    const file = readFile(fileName);
    const events = mapFileToEvents(file);

    const targetDate = convertToDate(date);

    validateFractionPercision(fractionPercision);

    return { events, targetDate, fractionPercision };
};

const readFile = (fileName, options = { encoding:'utf8' }) => readFileSync(fileName, options);

const mapFileToEvents = (file) => file
    .split('\n')
    .map(splitOnColumnDelimter)
    .filter(hasValidColumnLength)
    .map(mapEvent);

const splitOnColumnDelimter = (line) => line.split(defaultDelimter());
const defaultDelimter = (delimiter = ',') => delimiter;

const hasValidColumnLength = ({ length }) => length === maxColumnLength();
const maxColumnLength = (max = 6) => max;

const mapEvent = (([ eventType, employeeId, name, awardId, date, quantity ]) => ({ 
    eventType, employeeId, name, awardId, date: convertToDate(date), quantity: Number(quantity)
}));

const validateFractionPercision = (fractionPercision, lowerBound = 0, upperBound = 6) => {
    if (isInvalidPercision(fractionPercision, lowerBound, upperBound)) {
        throw Error(`Invalid Percision: Range needs to be ${lowerBound} - ${upperBound}`);
    }
};


const isInvalidPercision = (fractionPercision, lowerBound, upperBound) => {
    const hasValidLowerBound = lowerBound <= fractionPercision;
    const hasValidUpperBound = fractionPercision <= upperBound;
    const hasValidBound = hasValidLowerBound && hasValidUpperBound;

    return !hasValidBound;
};

module.exports = {
    processInput,
    readFile,
    splitOnColumnDelimter,
    hasValidColumnLength,
    mapFileToEvents,
    mapEvent,
    validateFractionPercision,
    isInvalidPercision
};
