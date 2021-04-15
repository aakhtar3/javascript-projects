const {
    processEvents,
    hasReachedTargetDate,
    mapAwardsToEmployee,
    updateEmployeeEvents,
    defaultEmployeeEvent,
    calcualteShares
} = require('../../src/process');

const { convertToDate } = require('../../src/date');

describe('process ', () => {
    describe('When invoking processEvents', () => {
        const events = [
            { eventType: 'VEST', employeeId: 'employeeId-1', name: 'name', awardId: 'awardId-1', quantity: 100.55559999, date: convertToDate('2020-01-01')  },
            { eventType: 'VEST', employeeId: 'employeeId-2', name: 'name', awardId: 'awardId-1', quantity: 100, date: convertToDate('2020-01-01') },
            { eventType: 'CANCEL', employeeId: 'employeeId-2', name: 'name', awardId: 'awardId-1', quantity: 100, date: convertToDate('2020-01-01') },
        ];
        const targetDate = convertToDate('2021-01-01');
        const output = processEvents(events, targetDate);

        expect(output.size).toBe(2);
        expect(output.get('employeeId-1').awards.get('awardId-1')).toBe(100.55559999);
        expect(output.get('employeeId-2').awards.get('awardId-1')).toBe(0);
    });

    describe('When invoking mapAwardsToEmployee', () => {
        it ('Then it should set the map with the employee id', () => {
            const map = new Map();
            const event = { eventType: 'VEST', employeeId: 'employeeId', name: 'name', awardId: 'awardId', quantity: 100.55559999 };
            mapAwardsToEmployee(map, event);
    
            expect(map.has('employeeId')).toBe(true);
        });
    });

    describe('When invoking updateEmployeeEvents', () => {
        it('Then it should return an award object mapped from the empoyee id', () => {
            const map = new Map();
            const event = { eventType: 'VEST', employeeId: 'employeeId', name: 'name', awardId: 'awardId', quantity: 100.55559999}
            const award = updateEmployeeEvents(map, event);
    
            expect(award.awards.size).toBe(1)
            expect([...award.awards.values()][0]).toBe(100.55559999);
        });
    });

    describe('When invoking defaultEmployeeEvent', () => {
        it('Then it should return the default output', () => {

            const name = 'name';
            const output = defaultEmployeeEvent(name);
            expect(output.awards instanceof Map).toBe(true);
        });
    });

    describe('When invoking calcualteShares', () => {
        it('Then it should do a caluclate based on the type', () => {
            const quantity = 100;

            let shares = 0;
            let eventType = 'VEST';
            shares = calcualteShares(eventType, quantity, shares);
            expect(shares).toBe(100);

            eventType = 'CANCEL';
            shares = calcualteShares(eventType, quantity, shares);
            expect(shares).toBe(0);

            eventType = 'INVALID';
            shares = calcualteShares(eventType, quantity, shares);
            expect(shares).toBe(0);
        })
    });
})
