const processOutput = (employeeEvents, fractionPercision) => [...employeeEvents.entries()]
    .reduce((flatEvents, event) => flattenEvents(flatEvents, event, fractionPercision), [])
    .sort(sortByIds)
    .map(convertToCSV)
    .join('\n');

const flattenEvents = ((flatEvents, [ employeeId, { name, awards } ], fractionPercision) => ([
    ...flatEvents, 
    ...flattenNextEvent(awards, employeeId, name, fractionPercision)
]));

const flattenNextEvent = (awards, employeeId, name, fractionPercision) => [...awards.entries()]
    .map((entries) => flattenAward(employeeId, name, fractionPercision, entries));

const flattenAward = (employeeId, name, fractionPercision, [ awardId, shares ]) => ({ 
    employeeId, name, awardId, shares: shares.toFixed(fractionPercision) 
});

const sortByIds = (a, b) => {
    const canSortByEmployeeId = a.employeeId !== b.employeeId;
    return canSortByEmployeeId
        ? a.employeeId - b.employeeId
        : a.awardId - b.awardId;
};

const convertToCSV = (({ employeeId, name, awardId, shares }) => `${employeeId},${name},${awardId},${shares}`);

module.exports = {
    processOutput,
    flattenEvents,
    flattenNextEvent,
    flattenAward,
    sortByIds,
    convertToCSV
};
