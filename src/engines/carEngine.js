const User = require("../models/User");

// Create a new car
const createCar = async (userid, body) => {
    const { make, model, type, color, year, plate } = body;
    if(!make || !model || !type || !color || !year || !plate){
        throw new Error(`Not all required fields were informed.[make, model, type, color, year, plate]`);
    }
    const query = await User.findOne({_id:userid},{car:{$elemMatch:{plate:plate}}})
    if(query.car.length) {
        throw new Error('A car with this plate number already exists.');
    }
    else
    {
        const createdCar = await User.updateOne(
            { _id: userid },
            { $push: { car: body } },
        );
        if(createdCar){
            return ('Car created');
        }
        else{
            throw new Error('Invalid car data.');
        }
    }
}

// return all cars of a given user
const viewAllCars = async (userid) => { return await (User.findOne({_id:userid}, {car:1})) || []}

// return a car given an user id and a car id
const viewCar = async (userid,carid) => { return await User.findOne({_id:userid},{car:{$elemMatch:{_id:carid}}}) || []}

// deletes a car given an user id and a car id
const deleteCar = async (userid,carid) => { 
    await User.updateOne({ _id: userid, },{$pull: {car:{_id:carid}}});
    return ('Car deleted');
}

// update a car:
const updateCar = async (userid,carid,body) => {
    const userObj = await User.findOne({_id:userid},{car:{$elemMatch:{_id:carid}}})
    const currentCar = userObj.car[0]
    const update = await User.findOneAndUpdate(
        { _id: userid,
          "car._id": carid},
        {
            "car.$.make": ( body.make || currentCar.make),
            "car.$.model": (body.model || currentCar.model),
            "car.$.type": (body.type || currentCar.type),
            "car.$.color": (body.color || currentCar.color),
            "car.$.year": (body.year || currentCar.year),
            "car.$.plate": (body.plate || currentCar.plate),
            "car.$.feat_ac": (body.feat_ac || currentCar.feat_ac),
            "car.$.feat_ls": (body.feat_ls || currentCar.feat_ls),
            "car.$.feat_lm": (body.feat_lm || currentCar.feat_lm),
            "car.$.feat_ll": (body.feat_ll || currentCar.feat_ll),
            "car.$.feat_wf": (body.feat_wf || currentCar.feat_wf),
            "car.$.feat_bk": (body.feat_bk || currentCar.feat_bk),
            "car.$.feat_sk": (body.feat_sk || currentCar.feat_sk),
            "car.$.feat_pa": (body.feat_pa || currentCar.feat_pa)
        }
      )
      return ("Car updated.");
}

module.exports = {
    createCar,
    viewAllCars,
    viewCar,
    deleteCar,
    updateCar,
};