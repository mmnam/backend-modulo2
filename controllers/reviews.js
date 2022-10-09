const Review = require('../models/reviews');
const User = require('../models/users')
const canDeleteReview = require('../config/auth')

async function createReview(req, res) {

    if (Object.keys(req.body).length == 0) {
        res.status(400).json({error: "null data"});
    } else{
        const body = req.body;
        if(!body.UserId && !body.usuario){
            res.status(400).json({Error:'UserId:null'})
            }else{
                try{   
                    const user = await User.findOne({where:{usuario:req.body.usuario}})
                    body.UserId = user.id
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
    }
}

async function getReview(req, res) {
    const id = req.params.id;
    if(Number(id)){
        const review = await Review.findByPk(id);
        res.status(200).json(review);
    } else {
        res.status(400).json({Error:"enter a correct ID type"});
    }
}

async function getReviews(req, res) {
    const reviews = await Review.findAll();
    res.status(200).json(reviews);    
}

async function deleteReview(req, res) {
    const id = req.params.id;
    if(Number(id)){
        const user = await User.findOne({where:{usuario:req.body.usuario}})
        const review = await Review.findByPk(id);
        if(review){
            if(user.id==review.UserId){
                const deleted = Review.destroy(
                    {where: {id} }
                );
                res.status(200).json({deleted: "Review eliminada"});
            }
            else{
                res.status(400).json({Error:"This user is not the owner of this review"});
            }  
        }
        else{
            res.status(204).json();
        }
    }else {
        res.status(400).json({Error:"enter a correct ID type"});
    }
}

async function updateReview(req, res) {
    const id = req.params.id;
    if(Number(id)){
        const user = await User.findOne({where:{usuario:req.body.usuario}})
        const order = req.body;
        const review = await Review.findByPk(id);
        if(review){
            if(user.id==review.UserId){
                await Review.update(order, {where: {id}});
                const review_updated = await Review.findByPk(id);
                res.status(200).json(review_updated);
            } else{
                res.status(400).json({Error:"This user is not the owner of this review"});
            }
        }else{
            res.status(204).json();
            }
    } else {
        res.status(400).json({Error:"enter a correct ID type"});
    }
}


module.exports = {createReview,deleteReview,updateReview,getReview,getReviews}