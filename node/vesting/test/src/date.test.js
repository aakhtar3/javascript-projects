const { convertToDate } = require('../../src/date');

describe('date ', () => {
    describe('When invoking convertToDate', () => {
        it('Then it should return a date object', () => {
            const date = convertToDate('2021-01-01');
            expect(date instanceof Date).toBe(true);
        })
    });
})
