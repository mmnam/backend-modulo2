const Review = require('../models/reviews');

function createReview(req, res) {
    const body = req.body;
    Review.create(body).then(review => {
        res.status(201).json(review);
    });
}
async function getReview(req, res) {
    const id = req.params.id;
    const review = await Review.findByPk(id);
    res.status(200).json(review);
}

async function getReviews(req, res) {
    const reviews = await Review.findAll();
    res.status(200).json(reviews);    
}

async function deleteReview(req, res) {
    const id = req.params.id;
    const deleted = Review.destroy(
        {where: {id} }
    );
    res.status(200).json(deleted);
}

async function updateReview(req, res) {
    const id = req.params.id;
    const order = req.body;
    await Review.update(order, {where: {id}});
    const review_updated = await Review.findByPk(id);
    res.status(200).json(review_updated);
}


module.exports = {createReview,deleteReview,updateReview,getReview,getReviews}