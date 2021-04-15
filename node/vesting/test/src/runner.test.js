jest.mock('fs', () => ({
    readFileSync: () => 'VEST,E001,Alice Smith,ISO-001,2020-01-01,1000.5\nCANCEL,E001,Alice Smith,ISO-001,2021-01-01,700.75'
}));

const { init } = require('../../src/runner');

describe('runner ', () => {
    afterEach(() => {
        jest.restoreAllMocks()
        jest.resetModules()
    });

    describe('When invoking init', () => {
        it('Then it should return the example outputs', () => {
            let fileName = 'example3.csv';
            let date = '2021-01-01';
            let fractionPercision = 1;
            let output = init([ fileName, date, fractionPercision ]);

            expect(output.split(',')[3]).toBe('299.8');
        });

        it('Then it should return an error', () => {
            try {
                const fileName = 'example3.csv';
                const date = '2021-01-01';
                const fractionPercision = 7;
                init([ fileName, date, fractionPercision ]);
            } catch (error) {
                expect(error.message).toBe('Invalid Percision: Range needs to be 0 - 6');
            }
        });
    });
});
