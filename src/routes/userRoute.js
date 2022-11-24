const router = require("express").Router();
const { wrapWithTryCatch } = require('./commonLib')
const { verifyToken, verifyAdmin } = require('../middleware/auth')
const { createUser, viewAllUsers, viewUser, loginUser, deleteUser, updateUser } = require('../engines/userEngine');

// @desc   Create a new user
// @route  POST /api/user/create {User}
// @access Public
router.post("/create", async (request,response) => wrapWithTryCatch(response, () => createUser(request.body,response)));

// @desc   Return all users
// @route  GET /api/user/viewall 
// @access Admin
router.get("/viewall", verifyToken, verifyAdmin, async (request,response) => wrapWithTryCatch(response, () => viewAllUsers()));

// @desc   Return one user
// @route  GET /api/user/viewone
// @access Protected
router.get("/viewone/:id", verifyToken, async (request,response) => wrapWithTryCatch(response, () => viewUser(request.params.id)));

// @desc   Authenticate user
// @route  POST /api/user/login {email, password}
// @access Public
router.post("/login", async (request,response) => wrapWithTryCatch(response, () => loginUser(request.body)));

// @desc   Delete user
// @route  POST /api/user/delete {id}
// @access Protected
router.delete("/delete/:id", verifyToken, async (request,response) => wrapWithTryCatch(response, () => deleteUser(request.params.id)));

// @desc   Update a user
// @route  POST /api/user/update {User}
// @access Protected
router.put("/update", verifyToken, async (request,response) => wrapWithTryCatch(response, () => updateUser(request.body)));

// @desc   Return one user
// @route  GET /api/user/viewone
// @access Protected
router.get("/evaluation/:id", verifyToken, async (request,response) => wrapWithTryCatch(response, () => viewUserEvaluation(request.params.id)));

module.exports = router; 
