const router = require("express").Router();
const { wrapWithTryCatch } = require('./commonLib')
const { verifyToken } = require('../middleware/auth')
const { uploadImage } = require('../engines/uploadEngine');

// @desc   Upload an image
// @route  POST /api/upload/image/:User._id
// @access Protected
router.post("/image/:userid", verifyToken, async (request, response) => wrapWithTryCatch(response, () => uploadImage(request,request.params.userid,response)));

// @desc   Return image file path
// @route  GET /api/upload/image/:User._id
// @access Protected
router.get("/image/:userid", verifyToken, async (request,response) => wrapWithTryCatch(response, () => getImage(request.params.userid)));

module.exports = router; 