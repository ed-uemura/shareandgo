const router = require("express").Router();
const { wrapWithTryCatch } = require('./commonLib')
const { verifyToken } = require('../middleware/auth')
const { createRide, viewAllRides, viewRide, deleteRide, updateRide } = require('../engines/rideEngine');

// @desc   Create a new ride record for a driver
// @route  POST /api/ride/create {Ride}
// @accees Protected
router.post("/create", verifyToken, async (request,response) => wrapWithTryCatch(response, () => createRide(request.body)));

// @desc   Return all rides of one driver
// @route  GET /api/ride/viewall/:User._id
// @accees Protected
router.get("/viewall/:userid", verifyToken, async (request,response) => wrapWithTryCatch(response, () => viewAllRides(request.params.userid)));

// @desc   Return one ride
// @route  GET /api/ride/viewone/:Ride._id
// @accees Protected
router.get("/viewone/:rideid", verifyToken, async (request,response) => wrapWithTryCatch(response, () => viewRide(request.params.rideid)));

// @desc   Delete ride
// @route  POST /api/ride/delete/:Ride._id {id}
// @accees Protected
router.delete("/delete/:rideid", verifyToken, async (request,response) => wrapWithTryCatch(response, () => deleteRide(request.params.rideid)));

// @desc   Update a ride
// @route  POST /api/ride/update/:Ride._id {Ride}
// @accees Protected
router.put("/update/:rideid", verifyToken, async (request,response) => wrapWithTryCatch(response, () => updateRide(request.params.rideid,request.body)));

module.exports = router; 
