const router = require("express").Router();
const { wrapWithTryCatch } = require('./commonLib')
const { verifyToken } = require('../middleware/auth')
const { createReview, getRating, viewAllReviews, viewReview, updateReview, deleteReview } = require('../engines/reviewEngine');

// @desc   Create a new review record
// @route  POST /api/review/create {Review}
// @accees Protected
router.post("/create", verifyToken, async (request,response) => wrapWithTryCatch(response, () => createReview(request.body)));

// @desc   Get an average rating of a user
// @route  GET /api/review/getrating/:Review._id
// @accees Protected
router.post("/getrating", verifyToken, async (request,response) => wrapWithTryCatch(response, () => getRating(request.params.userid)));

// @desc   List all reviews of one user
// @route  GET /api/review/viewall/:Review._id
// @accees Protected
router.get("/viewall/:userid", verifyToken, async (request,response) => wrapWithTryCatch(response, () => viewAllReviews(request.params.userid)));

// @desc   Return a review
// @route  GET /api/review/view/:Review._id
// @accees Protected
router.get("/viewreview/:reviewid", verifyToken, async (request,response) => wrapWithTryCatch(response, () => viewReview(request.params.reviewid)));

// @desc   Delete review message
// @route  POST /api/review/delete/:Review._id/Review._id {id}
// @accees Protected
router.delete("/delete/:reviewid", verifyToken, async (request,response) => wrapWithTryCatch(response, () => deleteReview(request.params.reviewid)));

// @desc   Update a review
// @route  POST /api/review/update/:Ride._id/Review._id {Review}
// @accees Protected
router.put("/update/:reviewid", verifyToken, async (request,response) => wrapWithTryCatch(response, () => updateReview(request.params.reviewid,request.body)));

module.exports = router; 
