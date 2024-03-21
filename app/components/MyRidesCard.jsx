import React from "react";
import "../styles/my-rides-card.css";
import { green } from "@mui/material/colors";

const MyRidesCard = ({ ride, cancelRide, completed }) => {
  const [source, destination, carDetails, driverDetails, pickPoint, distance, gasPrice] =
    ride.tDetails.toString().split(' + ');

  const cancelRideHandler = async () => {
    await cancelRide(ride.rideId);
  };

  const completedHandler = async () => {
    await completed(ride.rideId);
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
        <p>{source}</p>
        <p>{destination}</p>
      </div>
      <div className="card-item">
        <p>{driverDetails}</p>
        <p>{carDetails}</p>
      </div>
      <div className="card-item">
        <p>{pickPoint}</p>
      </div>
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row-reverse",
        }}
      >
        <button
          className="btn"
          style={{ backgroundColor: "red" }}
          onClick={cancelRideHandler}
        >
          Cancel Ride
        </button>
        <button
          className="btn"
          style={{ backgroundColor: "green" }}
          onClick={completedHandler}
        >
          Completed
        </button>
      </div>
    </div>
  );
};

export default MyRidesCard;
