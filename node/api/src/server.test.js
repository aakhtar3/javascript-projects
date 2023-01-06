/* Refactored and added unit tests */

const supertest = require('supertest');
const server = require('./server.js');

const putRequest = async (path, data, type = 'text/plain', status = 201) => await supertest(server)
    .put(path)
    .send(data)
    .set('Content-Type', type)
    .set('Accept', 'application/json')
    .expect(status);

const getRequest = async (path, status = 200) => await supertest(server)
    .get(path)
    .expect(status);

const deleteRequest = async (path, status = 200) => await supertest(server)
    .delete(path)
    .expect(status);

describe('data-storage-api-node', () => {
    describe('When invoking PUT /data/:repository', () => {
        describe('When body is valid text', () => {
            describe('When repo has two distinct objects', () => {
                it('Then it should expect 201', async () => {
                    const putResult1 = await putRequest('/data/my-repo', 'something', 'text/plain');
                    expect(putResult1.body.oid).toEqual('something');
                    expect(putResult1.body.size).toEqual(9);

                    const putResult2 = await putRequest('/data/my-repo', 'other', 'text/plain');
                    expect(putResult2.body.oid).toEqual('other');
                    expect(putResult2.body.size).toEqual(5);

                    expect(putResult1.body.oid).not.toBe(putResult2.body.oid);
                });
            });

            describe('When body is JSON or String', () => {
                describe('When repo has one distinct object', () => {
                    it('Then it should expect 201', async () => {
                        const putResult1 = await putRequest('/data/my-repo', { key: 'value' }, 'application/json');
                        const getResult1 = await getRequest(`/data/my-repo/${ putResult1.body.oid }`);
                        expect(getResult1.body.oid).toEqual('{"key":"value"}');

                        const putResult2 = await putRequest('/data/my-repo', JSON.stringify({ key: 'value' }), 'text/plain');
                        const getResult2 = await getRequest(`/data/my-repo/${ putResult1.body.oid }`);
                        expect(getResult2.body.oid).toEqual('{"key":"value"}');

                        expect(putResult1.body.oid).toEqual(putResult2.body.oid);
                    });
                });
            });
        });

        describe('When body is invalid text', () => {
            it('Then it should expect 400', async () => {
                await putRequest('/data/my-repo', '', 'text/plain', 400);
            });
        });
    });

    describe('When invoking GET /data/:repository/:objectID', () => {
        describe('When objectID is in a repository', () => {
            it('Then it should expect 200', async () => {
                const putResult = await putRequest('/data/my-repo', 'something');
                const getResult = await getRequest(`/data/my-repo/${ putResult.body.oid }`);

                expect(getResult.body.oid).toEqual('something');
            });
        });

        describe('When objectID is missing from repository', () => {
            it('Then it should expect 404', async () => {
                await getRequest('/data/my-repo/missing', 404);
            });
        });
    });

    describe('When invoking DELETE /data/:repository/:objectID', () => {
        describe('When objectID is deleted from repository', () => {
            describe('When objectID is duplicated across another repository', () => {
                it('Then it should expect 200', async () => {
                    const putResult = await putRequest('/data/my-repo', 'something');
                    const hash = putResult.body.oid;

                    const dupResult = await putRequest('/data/other-repo', 'something');
                    const dupHash = dupResult.body.oid;

                    await deleteRequest(`/data/my-repo/${ hash }`);
                    await getRequest(`/data/my-repo/${ hash }`, 404);

                    const getResult = await getRequest(`/data/other-repo/${ dupHash }`);
                    expect(getResult.body.oid).toEqual('something');
                });
            });
        });

        describe('When objectID is missing from repository', () => {
            test('Then it should expect 404', async () => {
                await deleteRequest('/data/my-repo/missing', 404);
            });
        });
    });
});
