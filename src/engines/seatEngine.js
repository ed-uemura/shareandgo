const Ride = require("../models/Ride");

// Create a new seat request for a ride
const createSeat = async (rideid, body) => {
    const { user, date } = body;
    if(!user || !date ){
        throw new Error(`Not all required fields were informed.[user, date]`);
    }
    else
    {
        const createdSeat = await Ride.updateOne(
            { _id: rideid },
            { $push: { seat: body } },
        );
        if(createdSeat){
            return ('Seat request created');
        }
        else{
            throw new Error('Invalid seat request data.');
        }
    }
}

// return all seat requests of a given ride
const viewAllSeats = async (rideid) => { return await (Ride.findOne({_id:rideid}, {seat:1})) || []}

// return a seat given an ride id and a seat id
const viewSeat = async (rideid,seatid) => { return await Ride.findOne({_id:rideid},{seat:{$elemMatch:{_id:seatid}}}) || []}

// deletes a seat given an ride id and a seat id
const deleteSeat = async (rideid,seatid) => { 
    await Ride.updateOne({ _id: rideid, },{$pull: {seat:{_id:seatid}}});
    return ('Seat deleted');
}

// update a seat:
const updateSeat = async (rideid,seatid,body) => {
    const rideObj = await Ride.findOne({_id:rideid},{seat:{$elemMatch:{_id:seatid}}})
    const currentSeat = rideObj.seat[0]
    const update = await Ride.findOneAndUpdate(
        { _id: rideid,
          "seat._id": seatid},
        {
            "seat.$.user": ( body.user || currentSeat.user),
            "seat.$.message": (body.message || currentSeat.message),
            "seat.$.date": (body.date || currentSeat.date),
            "seat.$.status": (body.status || currentSeat.status),
            "seat.$.reply_message": (body.reply_message || currentSeat.reply_message)
        }
      )
      return ("Seat request updated.");
}

module.exports = {
    createSeat,
    viewAllSeats,
    viewSeat,
    deleteSeat,
    updateSeat,
};