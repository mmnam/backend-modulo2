const router = require('express').Router();
const { createReview, deleteReview,updateReview,getReview,getReviews } = require('../controllers/reviews');
const auth = require('../config/auth');
const passport = require('passport');


router.post('/createReview', auth.isBuyer,createReview);
router.patch('/:id', auth.isBuyer,updateReview);
router.delete('/:id',passport.authenticate('local', {session: false, assignProperty: 'user'}),deleteReview)
router.get('/',getReviews)
router.get('/:id',getReview)
module.exports = router;