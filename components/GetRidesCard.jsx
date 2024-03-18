
import React from "react";
import styles from "../styles/get-rides.module.css";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const GetRidesCard = ({ ride }) => {
  const tripDetailsArray = ride.tDetails.split(" + ");
  const searchParams = useSearchParams();
  const connectedAccount = searchParams.get("connectedAccount");
  const balance = searchParams.get("balance");

  let source = "";
  let destination = "";
  let carDetails = "";
  let driverDetails = "";
  let pickUpPoint = "";
  let distance = "";
  let gasPrice = "";

  tripDetailsArray.forEach((item) => {
    const [key, value] = item.split(": ");
    switch (key) {
      case "Source":
        source = value;
        break;
      case "Destination":
        destination = value;
        break;
      case "Car Details":
        carDetails = value;
        break;
      case "Driver Details":
        driverDetails = value;
        break;
      case "Pick up point":
        pickUpPoint = value;
        break;
      case "Distance":
        distance = value;
        break;
      case "Gas Price":
        gasPrice = value;
        break;
      default:
        break;
    }
  });

  const handleBookRide = () => {
    // Implement booking logic here
    alert("Booking ride with ID: " + ride.rideId);
  };

  return (
    <div className={styles.card}>
      <p>Ride Id: {ride.rideId.toString()}</p>
      <ul className={styles.details}>
        <li>Ride Fare: {ride.rideFare.toString()}</li>
        <li>Max Passengers: {ride.mPassengers.toString()}</li>
        <li>Current Passengers: {ride.passengers.toString()}</li>
        <li>Source: {source}</li>
        <li>Destination: {destination}</li>
        <li>Car Details: {carDetails}</li>
        <li>Driver Details: {driverDetails}</li>
        <li>Pick Up Point: {pickUpPoint}</li>
        <li>Distance: {distance}</li>
        <li>Gas Price: {gasPrice}</li>
        </ul>
        <Link
          href={{
            pathname: "/ride-booked",
            query: {
              connectedAccount: connectedAccount,
              balance: balance,
              role: "passenger",
            },
          }}
        >
          <button className={styles.bookButton} onClick={handleBookRide}>Book</button>
        </Link>
    </div>
  );
};

export default GetRidesCard;
