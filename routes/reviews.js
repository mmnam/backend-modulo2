const router = require('express').Router();
const { createReview } = require('../controllers/reviews');

router.post('/createReview', createReview);


module.exports = router;