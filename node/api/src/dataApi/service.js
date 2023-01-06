const { 
    isValidRequest, isValidBody, convertToString,
    setObject, getObject, deleteObject
} = require('../dataDatabase');

/**
 * Attempts to checks if data is in DB and returns error or object
 * @param {request} req
 * @param {response} res
 * @returns {object}
 */
const getData = ({ params }, res) => {
    const { repository, objectID: oid } = params;

    if (!isValidRequest(repository, oid)) return res.sendStatus(404);

    const data = getObject(repository, oid);

    res.json(data);
};

/**
 * Attempts to validate input as a string and save on DB, if invalid payload throw error
 * @param {request} req
 * @param {response} res
 * @returns {object}
 */
const putData = ({ params, body: oid }, res) => {
    const { repository } = params;

    oid = convertToString(oid);

    if (!isValidBody(oid)) return res.sendStatus(400);

    const data = setObject(repository, oid);

    res.status(201).json(data);
};

/**
 * Attempts to checks if data is in DB and returns error or deletes object
 * @param {request} req
 * @param {response} res
 * @returns {status}
 */
const deleteData = ({ params }, res) => {
    const { repository, objectID: oid } = params;

    if (!isValidRequest(repository, oid)) return res.sendStatus(404);

    deleteObject(repository, oid);

    res.sendStatus(200);
};

module.exports = {
    getData,
    putData,
    deleteData
};
