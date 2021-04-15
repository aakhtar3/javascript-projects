const {
    processOutput,
    flattenEvents,
    flattenNextEvent,
    flattenAward,
    sortByIds,
    convertToCSV
} = require('../../src/output');

describe('output ', () => {

    describe('When invoking processOutput', () => {
        it('Then it should return a csv string', () => {
            const employeeEvents = new Map([
                [ 'employeeId-1', { name: 'name-1', awards: new Map([['awardId-1', 100.55555999999]]) }],
                [ 'employeeId-2', { name: 'name-2', awards: new Map([['awardId-2', 100]]) }]
            ]);
            const fractionPercision = 6;
            const output = processOutput(employeeEvents, fractionPercision);
            const rows = output.split('\n');

            expect(typeof output).toBe('string');
            expect(rows.length).toBe(2);
            expect(rows[0].split(',')[3]).toBe('100.555560');
            expect(rows[1].split(',')[3]).toBe('100.000000');
        });
    });

    describe('When invoking flattenEvents', () => {
        const employeeId = 'employeeId';
        const name = 'name';
        const awards = new Map([
            ['awardId', 100.55555999999]
        ]);
        const event = [ employeeId, { name, awards }];
        const fractionPercision = 6;
        const flatEvents = flattenEvents([], event, fractionPercision);

        expect(flatEvents.length).toBe(1);
        expect(flatEvents[0].shares).toBe('100.555560');
    });

    describe('When invoking flattenNextEvent', () => {
        const awards = new Map([
            ['awardId', 100.55555999999]
        ])
        const employeeId = 'employeeId';
        const name = 'name';
        const fractionPercision = 6;
        const flatEvent = flattenNextEvent(awards, employeeId, name, fractionPercision);

        expect(Array.isArray(flatEvent)).toBe(true);
        expect(flatEvent[0].shares).toBe('100.555560');
    })

    describe('When invoking flattenAward', () => {
        it('Then it should return a flatten award object', () => {
            const employeeId = 'employeeId';
            const name = 'name';
            const awardId = '1';

            let fractionPercision = 0;
            let shares = 100;
            let award = flattenAward(employeeId, name, fractionPercision, [ awardId, shares ]);
            expect(award.shares).toBe('100');

            fractionPercision = 6;
            shares = 100.55555999999;
            award = flattenAward(employeeId, name, fractionPercision, [ awardId, shares ]);
            expect(award.shares).toBe('100.555560');
        });
    });

    describe('When invoking sortByIds', () => {
        it('Then it should sort by the employeeId', () => {
            const input = [
                { employeeId: '2', awardId: '2'},
                { employeeId: '1', awardId: '1'},
            ].sort(sortByIds);

            expect(input[0].employeeId).toBe('1');
        });

        it('Then it should sort by the awardId', () => {
            const input = [
                { employeeId: '1', awardId: '2'},
                { employeeId: '1', awardId: '1'},
            ].sort(sortByIds);

            expect(input[0].awardId).toBe('1');
        });
    });

    describe('When invoking convertToCSV', () => {
        it('Then it should return string with comma delimter', () => {
            const input = { employeeId: 'employeeId', name: 'name', awardId: 'awardId', shares: 'shares'}
            const output = convertToCSV(input);

            expect(typeof output).toBe('string');
            expect(output.split(',').length).toBe(4);
        });
    });
});
