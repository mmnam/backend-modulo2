const router = require('express').Router();
const { signUp, logIn } = require('../controllers/users');

router.get('/signUp', signUp);


module.exports = router;