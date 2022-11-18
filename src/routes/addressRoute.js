const router = require("express").Router();
const { wrapWithTryCatch } = require('./commonLib')
const { verifyToken } = require('../middleware/auth')
const { createAddress, viewAllAddresses, viewAddress, deleteAddress, updateAddress } = require('../engines/addressEngine');

// @desc   Create a new address record for a user
// @route  POST /api/address/create/:User._id {Address}
// @access Protected
router.post("/create/:userid", verifyToken, async (request,response) => wrapWithTryCatch(response, () => createAddress(request.params.userid, request.body)));

// @desc   Return all addresses of one user
// @route  GET /api/address/viewall/:User._id
// @access Protected
router.get("/viewall/:userid", verifyToken, async (request,response) => wrapWithTryCatch(response, () => viewAllAddresses(request.params.userid)));

// @desc   Return one address
// @route  GET /api/address/viewone/:User._id/Address._id
// @access Protected
router.get("/viewone/:userid/:addressid", verifyToken, async (request,response) => wrapWithTryCatch(response, () => viewAddress(request.params.userid,request.params.addressid)));

// @desc   Delete address
// @route  POST /api/address/delete/:User._id/Address._id {id}
// @access Protected
router.delete("/delete/:userid/:addressid", verifyToken, async (request,response) => wrapWithTryCatch(response, () => deleteAddress(request.params.userid,request.params.addressid)));

// @desc   Update a address
// @route  POST /api/address/update/:User._id/Address._id {Address}
// @access Protected
router.put("/update/:userid/:addressid", verifyToken, async (request,response) => wrapWithTryCatch(response, () => updateAddress(request.params.userid,request.params.addressid,request.body)));

module.exports = router; 
