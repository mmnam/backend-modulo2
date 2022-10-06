const Review = require('../models/reviews');

function createReview(req, res) {
    const body = req.body;
    Review.create(body).then(review => {
        res.status(201).json(review);
    });
}


module.exports = {createReview}