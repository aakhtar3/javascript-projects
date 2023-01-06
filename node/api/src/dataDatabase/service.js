const database = require('./database');

/**
 * Formats response data to string
 * Assumption - Provided tests are expecting a string and not a JSON
 * Assumption - README API contract is expecting JSON
 * @param {string} repository
 * @param {string} objectID
 * @returns {object} data
 */
const getObject = (repository, objectID) => {
    const data = { oid: objectID };

    console.log('getObject', { repository, objectID, data });

    return data;
};

/**
 * Fetches repository, objects, and appends unique object to database
 * Formats response data
 * @param {string} repository
 * @param {string} body
 * @returns {object} data
 */
const setObject = (repository, body) => {
    const data = { oid: body, size: body.length };
    const _repository = (database.get(repository) || new Set());

    _repository.add(body);
    database.set(repository, _repository);

    console.log('setObject', { repository, body, database, data });

    return data;
};

/**
 * Removes object from repository by querying the database
 * @param {string} repository 
 * @param {string} body 
 */
const deleteObject = (repository, body) => {
    database.get(repository).delete(body);

    console.log('deleteObject', { repository, body, database });
};

module.exports = {
    getObject,
    setObject,
    deleteObject
};
