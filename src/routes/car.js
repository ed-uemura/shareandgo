const router = require("express").Router();
const User = require("../models/User");

//add car
router.post("/add", async (request,response) => {
    try{
        const crypt = await bcrypt.genSalt(13);
        const password = await bcrypt.hash(request.body.password,crypt)
        const newUser = new User({
            firstname: request.body.firstname,
			lastname: request.body.lastname,
			gender: request.body.gender,
			birthdate: request.body.birthdate,
			email: request.body.email,
			phone: request.body.phone,
			bio: request.body.bio,
			photo: request.body.photo,
      password: password,
			document: request.body.document,
			validemail: request.body.validemail,
			validphone: request.body.validphone,
			validdoc: request.body.validdoc,
			doctype: request.body.doctype,
			fblink: request.body.fblink,
			accounttype: request.body.accounttype,
			accountstatus: 'CREATED'
        });
        const user = await newUser.save();
        response.status(200).json(user._id);
    }
    catch(error) {
        response.status(500).json(error);
    }
});

//return all users
router.get("/viewall", async (request,response) => {
    try{
        const users = await User.find();
        response.status(200).json(users);
    }
    catch(error) {
        response.status(500).json(error);
    }
});

//authenticate user

router.post("/viewone", async (request,response) => {
    try{
        const user = await User.findOne({email:request.body.email});
        if(!user){
            response.status(404).json({"message":"Email incorrect. Please try again!"});
        }
        else{
            const checkPass = await bcrypt.compare(
                request.body.password,
                user.password
            );
            if(!checkPass) {
                response.status(403).json({"message":"Password incorrect. Please try again!"});
            }
            else{
                console.log(user);
                response.status(200).json({ "_id": user._id, "email": user.email });
                console.log("ok2");
            }
        }
    }
    catch(error) {
        response.status(500).json(error);
    }
})

//delete a user
router.delete("/delete", async (request,response) => {

    try{
        const savedSpot = await User.deleteOne(
            { _id: req.body._id }
          );
        response.status(200).json('User deleted');
    }
    catch(error) {
        response.status(500).json(error);
    }
});

//update a user
router.put("/update", async (request,response) => {

    try{
        const spots = await User.findOneAndUpdate(
            { _id: req.body._id, },
            {
              $set: {
					firstname: request.body.firstname,
					lastname: request.body.lastname,
					gender: request.body.gender,
					birthdate: request.body.birthdate,
					email: request.body.email,
					phone: request.body.phone,
					bio: request.body.bio,
					photo: request.body.photo,
					password: password,
					document: request.body.document,
					validemail: request.body.validemail,
					validphone: request.body.validphone,
					validdoc: request.body.validdoc,
					doctype: request.body.doctype,
					fblink: request.body.fblink,
					accounttype: request.body.accounttype,
					accountstatus: request.body.accountstatus,
              }
            },
            {
              upsert: true
            }
          )
        response.status(200).json('User updated');
    }
    catch(error) {
        response.status(500).json(error);
    }
});
module.exports = router; 