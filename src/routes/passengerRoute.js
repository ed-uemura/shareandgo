const router = require("express").Router();
const { wrapWithTryCatch } = require('./commonLib')
const { verifyToken } = require('../middleware/auth')
const { createPassenger, viewAllPassengers, viewPassenger, deletePassenger, updatePassenger } = require('../engines/passengerEngine');

// @desc   Create a new passenger record for a ride
// @route  POST /api/passenger/create/:User._id {Passenger}
// @access Protected
router.post("/create/:rideid", verifyToken, async (request,response) => wrapWithTryCatch(response, () => createPassenger(request.params.rideid, request.body)));

// @desc   Return all passengers of one ride
// @route  GET /api/passenger/viewall/:User._id
// @access Protected
router.get("/viewall/:rideid", verifyToken, async (request,response) => wrapWithTryCatch(response, () => viewAllPassengers(request.params.rideid)));

// @desc   Return one passenger
// @route  GET /api/passenger/viewone/:User._id/Passenger._id
// @access Protected
router.get("/viewone/:rideid/:passengerid", verifyToken, async (request,response) => wrapWithTryCatch(response, () => viewPassenger(request.params.rideid,request.params.passengerid)));

// @desc   Delete passenger
// @route  POST /api/passenger/delete/:User._id/Passenger._id {id}
// @access Protected
router.delete("/delete/:rideid/:passengerid", verifyToken, async (request,response) => wrapWithTryCatch(response, () => deletePassenger(request.params.rideid,request.params.passengerid)));

// @desc   Update a passenger
// @route  POST /api/passenger/update/:User._id/Passenger._id {Passenger}
// @access Protected
router.put("/update/:rideid/:passengerid", verifyToken, async (request,response) => wrapWithTryCatch(response, () => updatePassenger(request.params.rideid,request.params.passengerid,request.body)));

module.exports = router; 
