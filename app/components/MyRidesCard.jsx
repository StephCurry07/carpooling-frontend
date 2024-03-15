import React from "react";

const MyRidesCard = ({ ride }) => {
  return (
    <div>
      Ride Id : {ride.rideId.toString()}
      <ul>
        <li>Ride Fare : {ride.rideFare.toString()}</li>
        <li>Max Passengers : {ride.mPassengers.toString()}</li>
        <li>Current Passengers : {ride.passengers.toString()}</li>
        <li>Trip Details : {ride.tDetails.toString()}</li>
      </ul>
    </div>
  );
};

export default MyRidesCard;
