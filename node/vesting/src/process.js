const processEvents = (events, targetDate) => events
    .filter((event) => hasReachedTargetDate(event, targetDate))
    .reduce(mapAwardsToEmployee, new Map());

const hasReachedTargetDate = ({ date }, targetDate) => date <= targetDate;

const mapAwardsToEmployee = (map, event) => map.set(event.employeeId, updateEmployeeEvents(map, event));

const updateEmployeeEvents = (map, event) => {
    const { eventType, employeeId, awardId, quantity } = event;

    const employeeEvents = (map.get(employeeId) || defaultEmployeeEvent(event));
    const currentShares = (employeeEvents.awards.get(awardId) || 0);

    const updatedShares = calcualteShares(eventType, quantity, currentShares);
    employeeEvents.awards.set(awardId, updatedShares);

    return employeeEvents;
};

const defaultEmployeeEvent = ({ name, awards = new Map() }) => ({
    name, awards
});

const calcualteShares = (eventType, quantity, shares) => eventTypes.has(eventType)
    ? eventTypes.get(eventType)(shares, quantity)
    : shares;

const eventTypes = new Map ([
    ['VEST', (shares, quantity) => shares + quantity],
    ['CANCEL', (shares, quantity) => shares - quantity]
]);
    
module.exports = {
    processEvents,
    hasReachedTargetDate,
    mapAwardsToEmployee,
    updateEmployeeEvents,
    defaultEmployeeEvent,
    calcualteShares
};
