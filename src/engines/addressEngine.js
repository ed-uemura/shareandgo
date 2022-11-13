const User = require("../models/User");

// Create a new address
const createAddress = async (userid, body) => {
    const { name, address, city, province, zip } = body;
    if(!name || !address || !city || !province || !zip ){
        throw new Error(`Not all required fields were informed.[name, address, city, province, zip]`);
    }
    const query = await User.findOne({_id:userid},{address:{$elemMatch:{name:name}}})
    if(query.address.length) {
        throw new Error('An address with the same name already exists.');
    }
    else
    {
        const createdAddress = await User.updateOne(
            { _id: userid },
            { $push: { address: body } },
        );
        if(createdAddress){
            return ('Address created');
        }
        else{
            throw new Error('Invalid address data.');
        }
    }
}

// return all addresses of a given user
const viewAllAddresses = async (userid) => { return await (User.findOne({_id:userid}, {address:1})) || []}

// return a address given an user id and a address id
const viewAddress = async (userid,addressid) => { return await User.findOne({_id:userid},{address:{$elemMatch:{_id:addressid}}}) || []}

// deletes a address given an user id and a address id
const deleteAddress = async (userid,addressid) => { 
    await User.updateOne({ _id: userid, },{$pull: {address:{_id:addressid}}});
    return ('Address deleted');
}

// update a address:
const updateAddress = async (userid,addressid,body) => {
    const userObj = await User.findOne({_id:userid},{address:{$elemMatch:{_id:addressid}}})
    const currentAddress = userObj.address[0]
    const update = await User.findOneAndUpdate(
        { _id: userid,
          "address._id": addressid},
        {
            "address.$.name": ( body.name || currentAddress.name),
            "address.$.address": (body.address || currentAddress.address),
            "address.$.address2": (body.address2 || currentAddress.address2),
            "address.$.city": (body.city || currentAddress.city),
            "address.$.province": (body.province || currentAddress.province),
            "address.$.zip": (body.zip || currentAddress.zip),
            "address.$.isdefault": (body.isdefault || currentAddress.isdefault)
        }
      )
      return ("Address updated.");
}

module.exports = {
    createAddress,
    viewAllAddresses,
    viewAddress,
    deleteAddress,
    updateAddress,
};