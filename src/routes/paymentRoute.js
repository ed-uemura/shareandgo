const router = require("express").Router();
const { wrapWithTryCatch } = require('./commonLib')
const { verifyToken } = require('../middleware/auth')
const { createPayment, viewAllPayments, viewPayment, deletePayment, updatePayment } = require('../engines/paymentEngine');

// @desc   Create a new payment record for a driver
// @route  POST /api/payment/create/:User._id {Payment}
// @accees Protected
router.post("/create/:userid", verifyToken, async (request,response) => wrapWithTryCatch(response, () => createPayment(request.params.userid, request.body)));

// @desc   Return all payments of one driver
// @route  GET /api/payment/viewall/:User._id
// @accees Protected
router.get("/viewall/:userid", verifyToken, async (request,response) => wrapWithTryCatch(response, () => viewAllPayments(request.params.userid)));

// @desc   Return one payment
// @route  GET /api/payment/viewone/:User._id/Payment._id
// @accees Protected
router.get("/viewone/:userid/:paymentid", verifyToken, async (request,response) => wrapWithTryCatch(response, () => viewPayment(request.params.userid,request.params.paymentid)));

// @desc   Delete payment
// @route  POST /api/payment/delete/:User._id/Payment._id {id}
// @accees Protected
router.delete("/delete/:userid/:paymentid", verifyToken, async (request,response) => wrapWithTryCatch(response, () => deletePayment(request.params.userid,request.params.paymentid)));

// @desc   Update a payment
// @route  POST /api/payment/update/:User._id/Payment._id {Payment}
// @accees Protected
router.put("/update/:userid/:paymentid", verifyToken, async (request,response) => wrapWithTryCatch(response, () => updatePayment(request.params.userid,request.params.paymentid,request.body)));

module.exports = router; 
