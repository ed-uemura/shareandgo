const Ride = require("../models/Ride");

// Create a new passenger for a ride
const createPassenger = async (rideid, body) => {
    const { user, passenger_status } = body;
    if(!user || !passenger_status ){
        throw new Error(`Not all required fields were informed.[user, passenger_status]`);
    }
    else
    {
        const createdPassenger = await Ride.updateOne(
            { _id: rideid },
            { $push: { passenger: body } },
        );
        if(createdPassenger){
            return ('Passenger successfully registered');
        }
        else{
            throw new Error('Invalid passenger data.');
        }
    }
}

// return all passengers of a given ride
const viewAllPassengers = async (rideid) => { return await (Ride.findOne({_id:rideid}, {passenger:1})) || []}

// return a passenger given a ride id and a passenger id
const viewPassenger = async (rideid,passengerid) => { return await Ride.findOne({_id:rideid},{passenger:{$elemMatch:{_id:passengerid}}}) || []}

// delete a passenger given a ride id and a passenger id
const deletePassenger = async (rideid,passengerid) => { 
    await Ride.updateOne({ _id: rideid, },{$pull: {passenger:{_id:passengerid}}});
    return ('Passenger deleted');
}

// update a passenger:
const updatePassenger = async (rideid,passengerid,body) => {
    const userObj = await Ride.findOne({_id:rideid},{passenger:{$elemMatch:{_id:passengerid}}})
    const currentPassenger = userObj.passenger[0]
    const update = await Ride.findOneAndUpdate(
        { _id: rideid,
          "passenger._id": passengerid},
        {
            "passenger.$.user": ( body.user || currentPassenger.user),
            "passenger.$.passenger_status": (body.passenger_status || currentPassenger.passenger_status),
            "passenger.$.payment": (body.payment || currentPassenger.type),
            "passenger.$.amount": (body.amount || currentPassenger.amount),
            "passenger.$.driver_status": (body.driver_status || currentPassenger.driver_status),
            "passenger.$.payment_status": (body.payment_status || currentPassenger.payment_status)
        }
      )
      return ("Passenger data updated.");
}

module.exports = {
    createPassenger,
    viewAllPassengers,
    viewPassenger,
    deletePassenger,
    updatePassenger,
};