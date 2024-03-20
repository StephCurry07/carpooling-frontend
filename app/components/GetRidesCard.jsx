"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { ethers } from "ethers";
import { parseEther } from "ethers/utils";
import styles from "../styles/get-rides.module.css";
import Link from "next/link";
import abi from "../../utils/CarPooling.json";

const GetRidesCard = ({ ride }) => {
  const [locations, carDetails, driverDetails, pickPoint, distance, gasPrice] =
    ride.tDetails.toString().split("+");
  const searchParams = useSearchParams();
  const connectedAccount = searchParams.get("connectedAccount");
  const balance = searchParams.get("balance");
  const contractAddress = abi.contractAddress;
  const contractABI = abi.abi;

  const BookRide = async (rideId) => {
    const provider = new ethers.BrowserProvider(ethereum);
    const signer = await provider.getSigner();
    const CarPoolingContract = new ethers.Contract(
      contractAddress,
      contractABI,
      signer
    );
    console.log(rideId);
    const value = parseEther("0.01");
    const txn = await CarPoolingContract.bookRide(rideId, { value });
    console.log(txn.toString());
  };

  return (
    <div className={styles.card}>
      <p>Ride Id: {ride.rideId.toString()}</p>
      <ul className={styles.details}>
        <li>Ride Fare: {ride.rideFare.toString()}</li>
        <li>Max Passengers: {ride.mPassengers.toString()}</li>
        <li>Current Passengers: {ride.passengers.toString()}</li>
        <li>Locations: {locations}</li>
        <li>{carDetails}</li>
        <li>{driverDetails}</li>
        <li>{pickPoint}</li>
        <li>{distance}</li>
        <li>{gasPrice}</li>
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
        <button className={styles.bookButton} onClick={BookRide(ride.rideId)}>
          Book
        </button>
      </Link>
    </div>
  );
};

export default GetRidesCard;
