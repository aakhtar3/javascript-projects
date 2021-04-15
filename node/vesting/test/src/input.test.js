jest.mock('fs', () => ({
    readFileSync: () => 'VEST,E001,Alice Smith,ISO-001,2020-01-01,1000\nCANCEL,E001,Alice Smith,ISO-001,2021-01-01,700'
}));

const {
    processInput,
    readFile,
    mapFileToEvents,
    splitOnColumnDelimter,
    hasValidColumnLength,
    mapEvent,
    validateFractionPercision,
    isInvalidPercision
} = require('../../src/input');

describe('input ', () => {

    afterEach(() => {
        jest.restoreAllMocks()
        jest.resetModules()
    });

    describe('When invoking processInput', () => {
        it('Then it should return the proccessed arguments', () => {
            const fileName = '';
            const date = '2021-01-01';
            const output = processInput([ fileName, date ]);

            expect(output.events.length).toBe(2);
            expect(output.targetDate instanceof Date).toBe(true);
            expect(output.fractionPercision).toBe(0);
        })
    })

    describe('When invoking readFile', () => {
        it('Then it should return a string', () => {
            const fileName = '';
            const output = readFile(fileName);

            expect(typeof output).toBe('string');
        });
    });

    describe('When invoking mapFileToEvents', () => {
        it('Then it should return a map', () => {
            const input = 'VEST,E001,Alice Smith,ISO-001,2020-01-01,1000\nCANCEL,E001,Alice Smith,ISO-001,2021-01-01,700'
            const output = mapFileToEvents(input);
            
            expect(output.length).toBe(2);
            expect(output[0].eventType).toBe('VEST');
            expect(output[1].eventType).toBe('CANCEL');
        })
    })

    describe('When invoking splitOnColumnDelimter', () => {
        it('Then it should return an array of length 6', () => {
            const input = ['eventType', 'employeeId', 'name', 'awardId', 'date', 'quantity']
                .join(',');
            const output = splitOnColumnDelimter(input);
            
            expect(output.length).toBe(6);
        });
    })

    describe('When invoking hasValidColumnLength', () => {
        it('Then it should return boolean', () => {
            const input = ['eventType', 'employeeId', 'name', 'awardId', 'date', 'quantity'];
            
            expect(hasValidColumnLength(input)).toBe(true);
        });
    });

    describe('When invoking mapEvent', () => {
        it('Then it should return a event object', () => {
            const eventType = 'eventType';
            const employeeId = 'employeeId';
            const name = 'name';
            const awardId = 'awardId';
            const date = '2021-01-01';
            const quantity = 100;
            const output = mapEvent([ eventType, employeeId, name, awardId, date, quantity]);

            expect(output.quantity).toBe(100);
            expect(output.date instanceof Date).toBe(true);
        });
    });

    describe('When invoking validateFractionPercision', () => {
        it('Then it should throw an error', () => {
            validateFractionPercision(0);

            try {
                validateFractionPercision(7);
            } catch (error) {
                expect(error.message).toBe('Invalid Percision: Range needs to be 0 - 6');
            }
        });
    });

    describe('When invoking isInvalidPercision', () => {
        it('Then it should return a Boolean', () => {
            expect(isInvalidPercision(0, 0, 6)).toBe(false);
            expect(isInvalidPercision(7, 0, 6)).toBe(true);
        });
    });
})
