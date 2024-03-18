"use client";
import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import GetRidesCard from "@app/components/GetRidesCard";
import abi from "../../utils/CarPooling.json";
import styles from "../styles/get-rides.module.css";



const GetRides = () => {
  const [allRides, setAllRides] = useState([]);
  const contractAddress = "0x561002b9991332045E465440b981a32914F935c9";
  const contractABI = abi.abi;
  

  const getAllRides = async () => {
    if (window.ethereum) {
      const provider = new ethers.BrowserProvider(ethereum);
      const signer = await provider.getSigner();
      const CarPoolingContract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );

      const rides = await CarPoolingContract.getAllRides();
      let rideConverted = [];
      for (var i = 0; i < rides[0].length; i++) {
        const ride = {
          driver: rides[0][i],
          passengers: rides[1][i],
          mPassengers: rides[2][i],
          rideFare: rides[3][i],
          rideId: rides[4][i],
          time: rides[5][i],
          tDetails: rides[6][i],
        };
        rideConverted.push(ride);
      }

      setAllRides(rideConverted);
    }
  };

  useEffect(() => {
    getAllRides();
  }, []);

  

  return (
    <div className={styles.pageContainer}>
      {allRides.map((ride) => (
        <GetRidesCard key={ride.rideId} ride={ride} />
      ))}
    </div>
  );
};

export default GetRides;

