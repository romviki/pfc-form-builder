const express = require('express');
const router = express.Router();

// import form controllers
const formControllers = require('../controllers/form');

router.post('/addForm', formControllers.addForm);

router.delete('/deleteForm', formControllers.deleteForm);

module.exports = router;
