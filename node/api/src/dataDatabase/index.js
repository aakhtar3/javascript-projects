const { isValidRequest, isValidBody, convertToString } = require('./validate');
const { setObject, getObject, deleteObject } = require('./service');

module.exports = {
    isValidRequest, isValidBody, convertToString,
    setObject, getObject, deleteObject
};
