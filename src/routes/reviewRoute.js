const router = require("express").Router();
const { wrapWithTryCatch } = require('./commonLib')
const { verifyToken } = require('../middleware/auth')
const { createReview, getRating, viewAllReviews, viewReview, updateReview, deleteReview } = require('../engines/reviewEngine');

// @desc   Create a new review record
// @route  POST /api/review/create {Review}
// @access Protected
router.post("/create", verifyToken, async (request,response) => wrapWithTryCatch(response, () => createReview(request.body)));

// @desc   Get an average rating of a user
// @route  GET /api/review/getrating/:User._id
// @access Protected
router.get("/getrating/:userid", verifyToken, async (request,response) => wrapWithTryCatch(response, () => getRating(request.params.userid)));

// @desc   List all reviews of one user
// @route  GET /api/review/viewall/:User._id
// @access Protected
router.get("/viewall/:userid", verifyToken, async (request,response) => wrapWithTryCatch(response, () => viewAllReviews(request.params.userid)));

// @desc   Return a review
// @route  GET /api/review/view/:Review._id
// @access Protected
router.get("/viewreview/:reviewid", verifyToken, async (request,response) => wrapWithTryCatch(response, () => viewReview(request.params.reviewid)));

// @desc   Delete review
// @route  POST /api/review/delete/:Review._id/Review._id {id}
// @access Protected
router.delete("/delete/:reviewid", verifyToken, async (request,response) => wrapWithTryCatch(response, () => deleteReview(request.params.reviewid)));

// @desc   Update a review
// @route  POST /api/review/update/:Ride._id/Review._id {Review}
// @access Protected
router.put("/update/:reviewid", verifyToken, async (request,response) => wrapWithTryCatch(response, () => updateReview(request.params.reviewid,request.body)));

module.exports = router; 
