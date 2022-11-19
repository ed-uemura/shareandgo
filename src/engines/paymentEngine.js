const User = require("../models/User");

// Create a new payment method
const createPayment = async (userid, body) => {
    const { type, pan, name, expiration, transit, institution } = body;
    if(!type)
        throw new Error('Please add a payment type');
    else if(type === 'card' && ( !pan || !name || !expiration ))
        throw new Error(`Not all required fields were informed.[pan, name, expiration]`);
    else if(type === 'bank' && ( !pan || !transit || !institution ))
        throw new Error(`Not all required fields were informed.[institution, transit, pan]`);

    const query = await User.findOne({_id:userid},{payment_method:{$elemMatch:{pan:pan}}})
    if(query.payment_method.length) {
        throw new Error('A payment_method with this number already exists.');
    }
    else
    {
        const createdPayment = await User.updateOne(
            { _id: userid },
            { $push: { payment_method: body } },
        );
        if(createdPayment){
            return ('Payment created');
        }
        else{
            throw new Error('Invalid payment method data.');
        }
    }
}

// return all payment_methods of a given user
const viewAllPayments = async (userid) => { 
    const payInfo = await (User.findOne({_id:userid}, {payment_method:1})) || [];
    if(payInfo.payment_method.length) {
        for(let i=0;i<payInfo.payment_method.length;i++){
            payInfo.payment_method[i].pan = "**** "+payInfo.payment_method[i].pan.substring(12);
        }
    }
    return payInfo;
}

// return a payment_method given an user id and a payment_method id
const viewPayment = async (userid,paymentid) => { 
    const payInfo = await User.findOne({_id:userid},{payment_method:{$elemMatch:{_id:paymentid}}}) || []
    if(payInfo.payment_method.length) {
        payInfo.payment_method[0].pan = "**** "+payInfo.payment_method[0].pan.substring(12);
    }
    return payInfo;
}

// deletes a payment given an user id and a payment id
const deletePayment = async (userid,paymentid) => { 
    await User.updateOne({ _id: userid, },{$pull: {payment_method:{_id:paymentid}}});
    return ('Payment deleted');
}

// update a payment method:
const updatePayment = async (userid,paymentid,body) => {
    const userObj = await User.findOne({_id:userid},{payment_method:{$elemMatch:{_id:paymentid}}})
    const currentPayment = userObj.payment_method[0]
    const update = await User.findOneAndUpdate(
        { _id: userid,
          "payment_method._id": paymentid},
        {
            "payment_method.$.type": ( body.type || currentPayment.type),
            "payment_method.$.pan": (body.pan || currentPayment.pan),
            "payment_method.$.name": (body.name || currentPayment.name),
            "payment_method.$.expiration": (body.expiration || currentPayment.expiration),
            "payment_method.$.isdefault": (body.isdefault || currentPayment.isdefault),
            "payment_method.$.addressid": (body.addressid || currentPayment.addressid)
        }
      )
      return ("Payment updated.");
}

module.exports = {
    createPayment,
    viewAllPayments,
    viewPayment,
    deletePayment,
    updatePayment,
};