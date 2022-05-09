
const express = require('express');
const router = express.Router();


const userCtrl = require('../controllers/user');// Import the userCtrl file
const { validate, checkValidation } = require('../middleware/validator');
// Import the validator middleware controler in order to check the user input

router.post('/signup', validate, checkValidation, userCtrl.signup);
router.post('/login', validate, checkValidation, userCtrl.login);

module.exports = router;