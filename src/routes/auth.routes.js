const router = require('express').Router();

const { createUser, loginUser } = require('../controllers/auth.controller.js');

router.post('/register', createUser);
router.post('/login', loginUser);

module.exports = router;