"use client";
import React from 'react';
import Link from 'next/link';
import styles from '../styles/ride-booked.module.css';
import { useSearchParams } from "next/navigation";

const RideBooked = () => {
  const searchParams = useSearchParams();
  const connectedAccount = searchParams.get("connectedAccount");
  const balance = searchParams.get("balance");
  return (
    <div className={styles.container}>
      <h1>Congratulations! Your ride is booked.</h1>
      <Link
          href={{
            pathname: "/my-rides",
            query: {
              connectedAccount: connectedAccount,
              balance: balance,
              role: "passenger",
            },
          }}
        >
          <button>Show my Rides</button>
        </Link>
    </div>
  );
};

export default RideBooked;
