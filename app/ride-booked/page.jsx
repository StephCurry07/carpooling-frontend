
import React from 'react';
import Link from 'next/link';
import styles from '../styles/ride-booked.module.css'; // Import the CSS file

const RideBooked = () => {
  return (
    <div className={styles.container}> {/* Apply styles to the container */}
      <h1>Congratulations! Your ride is booked.</h1>
      <Link href="/my-rides">
        <button>Show My Rides</button>
      </Link>
    </div>
  );
};

export default RideBooked;
