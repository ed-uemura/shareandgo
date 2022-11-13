const Ride = require("../models/Ride");

// Create a new ride
const createRide = async (body) => {
    const { origin, destination, direction, frequency, departure_date, seats, price, status, user, car } = body;
    if(!origin || !destination || !direction || !frequency || !departure_date || !seats || !price || !status || !user || !car){
        throw new Error(`Not all required fields were informed.[origin, destination, direction, frequency, departure_date, seats, price, status, user, car]`);
    }
    const createdRide = await Ride.create(body);
    if(createdRide){
        return ('Ride created');
    }
    else{
        throw new Error('Invalid ride data.');
    }
}

// return all rides of a given user
const viewAllRides = async (userid) => { return await (Ride.find({user:userid})) || []}

// return a ride given a ride id
const viewRide = async (rideid) => { return await Ride.findOne({_id:rideid}) || []}

// deletes a ride given a ride id
const deleteRide = async (rideid) => { await Ride.deleteOne({_id: rideid})}

// update a ride:
const updateRide = async (rideid,body) => {
    const currentRide = await Ride.findOne({_id:rideid})
    const update = await Ride.findOneAndUpdate(
        { _id: rideid},
        {
            "ride.$.origin": ( body.origin || currentRide.origin),
            "ride.$.destination": (body.destination || currentRide.destination),
            "ride.$.waypoint": (body.waypoint || currentRide.waypoint),
            "ride.$.direction": (body.direction || currentRide.direction),
            "ride.$.frequency": (body.frequency || currentRide.frequency),
            "ride.$.departure_date": (body.departure_date || currentRide.departure_date),
            "ride.$.returning_date": (body.returning_date || currentRide.returning_date),
            "ride.$.seats": (body.seats || currentRide.seats),
            "ride.$.description": (body.description || currentRide.description),
            "ride.$.price": (body.price || currentRide.price),
            "ride.$.status": (body.status || currentRide.status),
            "ride.$.user": (body.user || currentRide.user),
            "ride.$.car": (body.car || currentRide.car)
        }
      )
      return ("Ride updated.");
}

module.exports = {
    createRide,
    viewAllRides,
    viewRide,
    deleteRide,
    updateRide,
};