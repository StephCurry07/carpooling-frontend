import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/available-rides.module.css';

const MyRides = () => {
  const [bookedRide, setBookedRide] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Retrieve the booked ride details from local storage
    const storedBookedRide = localStorage.getItem('bookedRide');
    if (storedBookedRide) {
      try {
        const parsedBookedRide = JSON.parse(storedBookedRide);
        setBookedRide(parsedBookedRide);
      } catch (error) {
        console.error('Error parsing booked ride data:', error);
        // Handle the error gracefully, e.g., by showing an error message
      }
    }
  }, []);

  const handleCancelRide = () => {
    // Clear the booked ride data from local storage
    localStorage.removeItem('bookedRide');
    // Update the state to reflect the cancellation
    setBookedRide(null);
    // Redirect to the ride-booked page
    router.push('/available-rides');
  };

  return (
    <div className={styles.container}>
      <h1>My Rides</h1>
      {bookedRide && (
        <div>
          <h2>Booked Ride Details</h2>
          <p>Driver: {bookedRide.driverName}</p>
          <p>Car: {bookedRide.car}</p>
          <p>Source: {bookedRide.source}</p>
          <p>Destination: {bookedRide.destination}</p>
          <p>Start Time: {bookedRide.startTime}</p>
          {/* Add more details as needed */}
          <button onClick={handleCancelRide}>Cancel Ride</button>
        </div>
      )}
    </div>
  );
};

export default MyRides;
