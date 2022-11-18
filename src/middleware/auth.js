const jwt = require("jsonwebtoken");
const User = require("../models/User");

const verifyToken = (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    res.status(403).json("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_TOKEN_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json('Invalid Token');
  }
  next();
};

const verifyAdmin = async (req, res, next) => {
  //check admin privileges
  const isAdmin = await User.findOne({"_id": req.user.id,"accounttype": "admin"});
  if(!isAdmin){
    res.status(403).json("Sorry! No admin privileges!");
  }
  else{
    next();
  }
}

module.exports = { verifyToken , verifyAdmin };