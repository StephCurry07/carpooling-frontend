import React from "react";
import "../styles/my-rides-card.css";

const MyRidesCard = ({ ride, cancelRide }) => {
  const [locations, carDetails, driverDetails, pickPoint, distance, gasPrice] =
    ride.tDetails.toString().split("+");

  const cancelRideHandler = async () => {
    await cancelRide(ride.rideId);
  };

  return (
    <div className="card">
      <div className="card-item">
        <p>Current Passengers : {ride.passengers.toString()}</p>
        <p>Max Passengers : {ride.mPassengers.toString()}</p>
      </div>
      <div className="card-item">
        <p>Ride Id : {ride.rideId.toString()}</p>
        <p>Ride Fare : {ride.rideFare.toString()}</p>
      </div>
      <div className="card-item">
        <p>{distance}</p>
        <p>{gasPrice}</p>
      </div>
      <div className="card-item">
        <p>{locations}</p>
        <p>{pickPoint}</p>
      </div>
      <div className="card-item">
        <p>{driverDetails}</p>
        <p>{carDetails}</p>
      </div>
      <button onClick={cancelRideHandler}>Cancel Ride</button>
    </div>
  );
};

export default MyRidesCard;
