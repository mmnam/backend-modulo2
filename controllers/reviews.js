const Review = require('../models/reviews');
const User = require('../models/users')
const canDeleteReview = require('../config/auth')

async function createReview(req, res) {

    const body = req.body;
    if(!body.UserId){
        res.status(400).json({Error:'UserId:null'})
        }
    try{   
        const review = await Review.create(body)
            res.status(201).json(review)

    }catch (err) {
        if (["SequelizeForeignKeyConstraintError",'SequelizeValidationError'].includes(err.name) ) {
            return res.status(400).json({
                error: err.name
            })
        }
        else {
            throw err;
        }
    }
   
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
    const user = await User.findOne({where:{usuario:req.body.usuario}})
    const review = await Review.findByPk(id);
    if(review){
        if(user.id==review.UserId){
            const deleted = Review.destroy(
                {where: {id} }
            );
            res.status(200).json(deleted);
        }
        else{
            res.status(400).json({Error:"This user is not the owner of this review"});

        }  
    }
    else{
        res.status(204).json();
    }
}

async function updateReview(req, res) {
    const id = req.params.id;
    const order = req.body;
    const review = await Review.findByPk(id);
    if(review){
    await Review.update(order, {where: {id}});
    const review_updated = await Review.findByPk(id);
    res.status(200).json(review_updated);}
    else{
        res.status(204).json();
    }
}


module.exports = {createReview,deleteReview,updateReview,getReview,getReviews}