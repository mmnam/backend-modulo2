const router = require('express').Router();
const { createReview, deleteReview,updateReview,getReview,getReviews } = require('../controllers/reviews');
const auth = require('../config/auth')


router.post('/createReview', auth.isBuyer,createReview);
router.patch('/:id', auth.isBuyer,updateReview);
router.delete('/:id',auth.isBuyer,deleteReview)
router.get('/',getReviews)
router.get('/:id',getReview)
module.exports = router;