"use client";
import { useSearchParams } from "next/navigation";
import styles from "../styles/get-rides.module.css";
import PlaceIcon from '@mui/icons-material/Place';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import PersonIcon from '@mui/icons-material/Person';
import GroupIcon from '@mui/icons-material/Group';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import HailIcon from '@mui/icons-material/Hail';
import PaymentsIcon from '@mui/icons-material/Payments';
import LocaltaxiIcon from '@mui/icons-material/LocalTaxi';
import HomeIcon from '@mui/icons-material/Home';
import StraightIcon from '@mui/icons-material/Straight';




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
        <ul>
          <li><PaymentsIcon /> Cost: {fareInUSD}$</li>
          <li><PlaceIcon /> {source}</li>
          <li><HomeIcon /> {destination}</li>
          <li><StraightIcon /> {distance}</li>
          <li><CalendarTodayIcon /> {formattedDate}</li>
          <li><AccessTimeIcon /> {formattedTime}</li>
        </ul>
      </div>
      <div className={styles.cardetails}>
        <ul>
          <li><GroupIcon /> Max Passengers: {ride.mPassengers.toString()}</li>
          <li><PersonIcon /> Current Passengers: {ride.passengers.toString()}</li>
          <li><LocaltaxiIcon /> {carDetails}</li>
          <li><LocalGasStationIcon /> {gasPrice}</li>
          <li><CreditCardIcon /> {driverDetails}</li>
          <li><HailIcon /> {pickPoint}</li>
        </ul>
      </div>
      <button className={styles.bookButton} onClick={BookRideHandler}>
        BOOK
      </button>
    </div>
  );
};

export default GetRidesCard;

