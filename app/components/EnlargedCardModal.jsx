// EnlargedCardModal.jsx

import React from 'react';
import styles from "../styles/enlarged-card-modal.module.css";
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

const EnlargedCardModal = ({ ride, onClose }) => {
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
      
      const dateTime = new Date(time);
      const formattedDate = dateTime.toLocaleDateString();
      const formattedTime = dateTime.toLocaleTimeString();
  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <h2>Ride Details</h2>
        <div className={styles.ridedetails}>
        <ul>
          <li><PlaceIcon /> {source}</li>
          <li><CalendarTodayIcon /> {formattedDate}</li>
          <li><HomeIcon /> {destination}</li>
          <li><AccessTimeIcon /> {formattedTime}</li>
          <li><LocalGasStationIcon /> {gasPrice}</li>
          
        </ul>
      </div>

      <div className={styles.ridedetails}>
        <ul>
          <li><DirectionsCarIcon /> {carDetails}</li>
          <li><LocaltaxiIcon /> {driverDetails}</li>
          <li><HailIcon /> {pickPoint}</li>
          <li><StraightIcon /> {distance}</li>
          <li><GroupIcon /> Max Passengers:{ride.mPassengers.toString()}</li>
        </ul>
      </div>
        <button className={styles.closeButton} onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default EnlargedCardModal;
