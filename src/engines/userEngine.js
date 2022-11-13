const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require("../models/User");
// Creates a new JWT token and update in User model
const updateToken = async (id) => {
    // generate token
    const token = await jwt.sign({ id }, process.env.JWT_TOKEN_KEY, {expiresIn: '30d',})
    // update user token in DB
    const updateUser = await User.findOneAndUpdate(
        { _id: id, },{$set: {token: token}})
    return token;
}

// Create a new user
const createUser = async (body) => {
    const { firstname, lastname, email, password } = body;
    if(!firstname || !lastname || !email || !password){
        throw new Error(`Not all required fields were informed.[firstname, lastname, email, password]`);
    }
    const emailExists = await User.findOne({email:email})
    if(emailExists) {
        throw new Error('User already exists.');
    }
    else
    {
        const crypt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,crypt)
        const newUser = new User({
            firstname: firstname,
            lastname: lastname,
            gender: body.gender,
            birthdate: body.birthdate,
            email: email,
            phone: body.phone,
            bio: body.bio,
            photo: body.photo,
            password: hashedPassword,
            document: body.document,
            validemail: body.validemail,
            validphone: body.validphone,
            validdoc: body.validdoc,
            doctype: body.doctype,
            fblink: body.fblink,
            accounttype: body.accounttype,
            accountstatus: 'CREATED'
        });
        const createdUser = await newUser.save();
        if(createdUser){
            // generate token
            const token = await updateToken(createdUser.id);
            // send object
            return ({
                _id: createdUser._id,
                name: createdUser.name,
                email: createdUser.email,
                token: token,
            });
        }
        else{
            throw new Error('Invalid user data.');
        }
    }
}

// return all users
const viewAllUsers = async () => { return await User.find().select('-password')}

// return a user given an id
const viewUser = async (id) => {
    const user = await User.findById(id).select('-password');
    if(!user){
        throw new Error('User not found!');
    }
    return user;
}

// authenticates a user
const loginUser = async (body) => {
    const user = await User.findOne({email:body.email});
    if(!user){
        throw new Error('Email incorrect. Please try again!');
    }
    else{
        const checkPass = await bcrypt.compare(
            body.password,
            user.password
        );
        if(!checkPass) {
            throw new Error('Password incorrect. Please try again!');
        }
        else{
            // generate token
            const token = await updateToken(user._id);
            // send object
            return ({
                _id: user._id,
                name: user.name,
                email: user.email,
                token: token,
            });
        }
    }
}

// deletes a user given an ID
const deleteUser = async (body) => { 
    await User.findOneAndUpdate({ _id: body._id, },{$set: {accountstatus: "DEACTIVATED"}});
    return ('User deactivated');
}

// update a user
const updateUser = async (body) => {
    const currentUser = await User.findById(body._id);
    const password = currentUser.password;
    if(body.password){
        const crypt = await bcrypt.genSalt(10);
        password = await bcrypt.hash(password,crypt)
    }
    const update = await User.findByIdAndUpdate(
        currentUser._id, 
        {
          $set: {
                firstname: (body.firstname || currentUser.firstname),
                lastname: (body.lastname || currentUser.lastname),
                gender: (body.gender || currentUser.gender || ""),
                birthdate: (body.birthdate || currentUser.birthdate || ""),
                email: (body.email || currentUser.email),
                phone: (body.phone || currentUser.phone),
                bio: (body.bio || currentUser.bio || ""),
                photo: (body.photo || currentUser.photo || ""),
                password: password,
                document: (body.document || currentUser.document || ""),
                validemail: (body.validemail || currentUser.validemail),
                validphone: (body.validphone || currentUser.validphone),
                validdoc: (body.validdoc || currentUser.validdoc),
                doctype: (body.doctype || currentUser.doctype || ""),
                fblink: (body.fblink || currentUser.fblink || ""),
                accounttype: (body.accounttype || currentUser.accounttype || ""),
                accountstatus: (body.accountstatus || currentUser.accountstatus),
          }
        },
        {
          upsert: false
        }
      )
      return ('User updated');
}

module.exports = {
    createUser,
    viewAllUsers,
    viewUser,
    loginUser,
    deleteUser,
    updateUser,
};