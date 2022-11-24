const router = require("express").Router();
const { wrapWithTryCatch } = require('./commonLib')
const { verifyToken } = require('../middleware/auth')
const { uploadImage } = require('../engines/uploadEngine');

// @desc   Upload an image
// @route  POST /api/upload/image/:id
// @access Protected
router.post("/image", verifyToken, async (request, response) => wrapWithTryCatch(response, (id) => uploadImage(id,request,response)));

module.exports = router; 