const router = require("express").Router();
const { wrapWithTryCatch } = require('./commonLib')
const { verifyToken } = require('../middleware/auth')
const { uploadImage } = require('../engines/uploadEngine');

// @desc   Upload an imagr
// @route  POST /api/upload/image
// @accees Protected
router.post("/image", verifyToken, (request, response) => wrapWithTryCatch(response, () => uploadImage(request,response)));

module.exports = router; 