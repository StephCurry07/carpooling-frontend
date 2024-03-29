"use client";
import { useSearchParams } from "next/navigation";
import styles from "../styles/get-rides.module.css";
import Link from "next/link";

const GetRidesCard = ({ ride, bookRide, exchangeRate }) => {
  console.log(ride.tDetails.toString());
  const [
    source,
    destination,
    carDetails,
    driverDetails,
    pickPoint,
    distance,
    gasPrice,
    time,
  ] = ride.tDetails.toString().split(" + ");
  const searchParams = useSearchParams();
  const connectedAccount = searchParams.get("connectedAccount");
  const balance = searchParams.get("balance");

  const BookRideHandler = async () => {
    await bookRide(ride.rideId, ride.rideFare.toString());
  };

  const fareInUSD = Math.ceil(
    (parseFloat(ride.rideFare) / 1e18) * exchangeRate.USD
  );
  const dateTime = new Date(time);
  const formattedDate = dateTime.toLocaleDateString();
  const formattedTime = dateTime.toLocaleTimeString();

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
      {ride.mPassengers.toString() <= 4 ? (
          <img src="/images/car.png" alt="Small Car" className={styles.image} />
        ) : (
          <img src="/images/car2.png" alt="Big Car" className={styles.image} />
        )}
      </div>
      <div className={styles.ridedetails}>
        <p>Ride Details</p>
        <ul>
          <li>Ride Fare: {fareInUSD}$</li>
          <li>{source}</li>
          <li>{destination}</li>
          <li>{distance}</li>
          <li>Date: {formattedDate}</li>
          <li>Time: {formattedTime}</li>
        </ul>
      </div>
      <div className={styles.cardetails}>
        <p><strong>Car Details</strong></p>
        <ul>
          <li>Max Passengers: {ride.mPassengers.toString()}</li>
          <li>Current Passengers: {ride.passengers.toString()}</li>
          <li>{carDetails}</li>
          <li>{gasPrice}</li>
          <li>{driverDetails}</li>
          <li>{pickPoint}</li>
        </ul>
      </div>
      <button className={styles.bookButton} onClick={BookRideHandler}>
        BOOK
      </button>
    </div>
  );
};

export default GetRidesCard;

