const router = require("express").Router();
const { wrapWithTryCatch } = require('./commonLib')
const { verifyToken } = require('../middleware/auth')
const { createMessage, listPartners, viewMessages, deleteMessage } = require('../engines/chatEngine');

// @desc   Create a new chat record
// @route  POST /api/chat/create {Chat}
// @access Protected
router.post("/create", verifyToken, async (request,response) => wrapWithTryCatch(response, () => createMessage(request.body)));

// @desc   Return all chat partners of one user
// @route  GET /api/chat/partners/:User._id
// @access Protected
router.get("/partners/:userid", verifyToken, async (request,response) => wrapWithTryCatch(response, () => listPartners(request.params.userid)));

// @desc   Return all messages of two users
// @route  GET /api/chat/viewall/:User._id/:User._id
// @access Protected
router.get("/viewall/:userid/:user2id", verifyToken, async (request,response) => wrapWithTryCatch(response, () => viewMessages(request.params.userid,request.params.user2id)));

// @desc   Delete chat message
// @route  POST /api/chat/delete/:User._id/Chat._id {id}
// @access Protected
router.delete("/delete/:chatid", verifyToken, async (request,response) => wrapWithTryCatch(response, () => deleteMessage(request.params.chatid)));

module.exports = router; 
