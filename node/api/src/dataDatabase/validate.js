const database = require('./database');

/**
 * Validates the url Path Params by doing a database lookup
 * @param {string} repository
 * @param {string} objectID
 * @returns {boolean} isValid
 */
const isValidRequest = (repository, objectID) => {
    const isValidParams = ((0 < repository.length) && ( 0 < objectID.length));
    const hasRepository = database.has(repository);
    const hasObjectId = (hasRepository && database.get(repository).has(objectID));
    const isValid = (isValidParams && hasRepository && hasObjectId);

    console.log('isValidRequest', { repository, objectID, isValid });

    return isValid;
};

/**
 * Attempts to convert JSON to string
 * @param {object | string} body
 * @returns {string} body
 */
const convertToString = (body) => {
    const isObject = (typeof body === 'object');
    if (isObject) return JSON.stringify(body);

    return body;
};

/**
 * Validates body is a string
 * @param {string} body
 * @returns {boolean}
 */
const isValidBody = (body) => ((typeof body === 'string') && (0 < body.length));

module.exports = {
    isValidRequest,
    isValidBody,
    convertToString,
};
