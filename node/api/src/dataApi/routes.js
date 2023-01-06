const router = require('express').Router();
const { getData, putData, deleteData } = require('./index');

router
    .get('/data/:repository/:objectID', getData)
    .put('/data/:repository', putData)
    .delete('/data/:repository/:objectID', deleteData);

module.exports = router;
