const express = require('express');
const router = express.Router();

const {login,register} = require('../controller/admin');

router.post('/create-user',register);
router.post('/login-user',login);



module.exports = router;