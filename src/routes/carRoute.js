const router = require("express").Router();
const { wrapWithTryCatch } = require('./commonLib')
const { verifyToken } = require('../middleware/auth')
const { createCar, viewAllCars, viewCar, deleteCar, updateCar } = require('../engines/carEngine');

// @desc   Create a new car record for a driver
// @route  POST /api/car/create/:User._id {Car}
// @access Protected
router.post("/create/:userid", verifyToken, async (request,response) => wrapWithTryCatch(response, () => createCar(request.params.userid, request.body)));

// @desc   Return all cars of one driver
// @route  GET /api/car/viewall/:User._id
// @access Protected
router.get("/viewall/:userid", verifyToken, async (request,response) => wrapWithTryCatch(response, () => viewAllCars(request.params.userid)));

// @desc   Return one car
// @route  GET /api/car/viewone/:User._id/Car._id
// @access Protected
router.get("/viewone/:userid/:carid", verifyToken, async (request,response) => wrapWithTryCatch(response, () => viewCar(request.params.userid,request.params.carid)));

// @desc   Delete car
// @route  POST /api/car/delete/:User._id/Car._id {id}
// @access Protected
router.delete("/delete/:userid/:carid", verifyToken, async (request,response) => wrapWithTryCatch(response, () => deleteCar(request.params.userid,request.params.carid)));

// @desc   Update a car
// @route  POST /api/car/update/:User._id/Car._id {Car}
// @accees Protected
router.put("/update/:userid/:carid", verifyToken, async (request,response) => wrapWithTryCatch(response, () => updateCar(request.params.userid,request.params.carid,request.body)));

module.exports = router; 
