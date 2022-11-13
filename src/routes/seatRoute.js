const router = require("express").Router();
const { wrapWithTryCatch } = require('./commonLib')
const { verifyToken } = require('../middleware/auth')
const { createSeat, viewAllSeats, viewSeat, deleteSeat, updateSeat } = require('../engines/seatEngine');

// @desc   Create a new seat request for a ride
// @route  POST /api/seat/create/:Ride._id {Seat}
// @accees Protected
router.post("/create/:rideid", verifyToken, async (request,response) => wrapWithTryCatch(response, () => createSeat(request.params.rideid, request.body)));

// @desc   Return all seats requests of one ride
// @route  GET /api/seat/viewall/:Ride._id
// @accees Protected
router.get("/viewall/:rideid", verifyToken, async (request,response) => wrapWithTryCatch(response, () => viewAllSeats(request.params.rideid)));

// @desc   Return one seat request
// @route  GET /api/seat/viewone/:Ride._id/Seat._id
// @accees Protected
router.get("/viewone/:rideid/:seatid", verifyToken, async (request,response) => wrapWithTryCatch(response, () => viewSeat(request.params.rideid,request.params.seatid)));

// @desc   Delete seat
// @route  POST /api/seat/delete/:Ride._id/Seat._id {id}
// @accees Protected
router.delete("/delete/:rideid/:seatid", verifyToken, async (request,response) => wrapWithTryCatch(response, () => deleteSeat(request.params.rideid,request.params.seatid)));

// @desc   Update a seat
// @route  POST /api/seat/update/:Ride._id/Seat._id {Seat}
// @accees Protected
router.put("/update/:rideid/:seatid", verifyToken, async (request,response) => wrapWithTryCatch(response, () => updateSeat(request.params.rideid,request.params.seatid,request.body)));

module.exports = router; 
