const Review = require("../models/Review");

// Create a new review
const createReview = async (body) => {
    const { author, reviewed, date, rating } = body;
    if(!author || !reviewed || !date || !rating){
        throw new Error(`Not all required fields were informed.[author, reviewed, date, rating]`);
    }
    const query = await Review.findOne({author:author},{reviewed:reviewed})
    if(query) {
        throw new Error('A review with same author and reviewed user already exists.');
    }
    else
    {
        const createdReview = await Review.create(body);
        if(createdReview){
            return ('Review created');
        }
        else{
            throw new Error('Invalid review data.');
        }
    }
}

// Get an average rating of a user
const getRating = async (userid) => {
    const result = await Review.aggregate([
        { $match: { reviewed: userid } },
        {
          $group: {
            _id: null,
            average_rating: { $avg: "$rating" }
          }
        }
    ], { allowDiskUse: true });
    return result;
}

// Return all reviews of one user
const viewReviews = async (userid) => { return await (Review.find({reviewed:userid})) || []}

// Return a review
const viewReview = async (reviewid) => { return await (Review.findOne({_id:reviewid})) || []}

// deletes a review given a review id
const deleteReview = async (reviewid) => { await Review.deleteOne({_id: reviewid})}

// update a review:
const updateReview = async (reviewid,body) => {
    const currentReview = await Review.findOne({_id:reviewid})
    const update = await Review.findOneAndUpdate(
        { _id: reviewid},
        {
            "review.$.author": ( body.author || currentReview.author),
            "review.$.rewiewed": (body.rewiewed || currentReview.rewiewed),
            "review.$.date": (body.date || currentReview.date),
            "review.$.comments": (body.comments || currentReview.comments),
            "review.$.rating": (body.rating || currentReview.rating)
        }
      )
      return ("Review updated.");
}

module.exports = {
    createReview,
    getRating,
    viewReview,
    viewReviews,
    deleteReview,
    updateReview,
};