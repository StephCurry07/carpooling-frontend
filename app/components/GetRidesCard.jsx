"use client";
import { useSearchParams } from "next/navigation";
import styles from "../styles/get-rides.module.css";
import Link from "next/link";


const GetRidesCard = ({ ride, bookRide }) => {
  const [source, destination, carDetails, driverDetails, pickPoint, distance, gasPrice] = ride.tDetails.toString().split(' + ');
  const searchParams = useSearchParams();
  const connectedAccount = searchParams.get("connectedAccount");
  const balance = searchParams.get("balance");

  const BookRideHandler = async () => {
    await bookRide(ride.rideId,  ride.rideFare.toString() );
  };
  
  
  return (
    <div className={styles.card}>
      <p>Ride Id: {ride.rideId.toString()}</p>
      <ul className={styles.details}>
        <li>Ride Fare: {ride.rideFare.toString()}</li>
        <li>Max Passengers: {ride.mPassengers.toString()}</li>
        <li>Current Passengers: {ride.passengers.toString()}</li>
        <li>{source}</li>
        <li>{destination}</li>
        <li>{carDetails}</li>
        <li>{driverDetails}</li>
        <li>{pickPoint}</li>
        <li>{distance}</li>
        <li>{gasPrice}</li>
        </ul>
        
          <button className={styles.bookButton} onClick={BookRideHandler}>Book</button>
    
    </div>
  );
};

export default GetRidesCard;
