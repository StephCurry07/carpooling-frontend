"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { ethers } from "ethers";
import MyRidesCard from "@app/components/MyRidesCard";
import abi from "../../utils/CarPooling.json";
import { ErrorDecoder } from "ethers-decode-error";

const MyRides = () => {
  const [myRides, setMyRides] = useState([]);
  const searchParams = useSearchParams();
  const connectedAccount = searchParams.get("connectedAccount");
  const role = searchParams.get("role");

  const contractAddress = abi.contractAddress;
  const contractABI = abi.abi;
  const errorDecoder = ErrorDecoder.create([contractABI]);
  const getMyRides = async () => {
    if (window.ethereum && connectedAccount) {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const CarPoolingContract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );

      const rides = await CarPoolingContract.getUserRides();
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

      let rideFiltered = [];

      if (role === "driver") {
        rideFiltered = rideConverted.filter(
          (ride) => connectedAccount === ride.driver.toLowerCase()
        );
      } else {
        rideFiltered = rideConverted.filter(
          (ride) => connectedAccount !== ride.driver.toLowerCase()
        );
      }

      setMyRides(rideFiltered);
    }
  };

  const cancelRide = async (rideId) => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const CarPoolingContract = new ethers.Contract(
      contractAddress,
      contractABI,
      signer
    );
    console.log(rideId);
    const txn = await CarPoolingContract.cancelRide(rideId);
    console.log(txn.toString());
  };

  useEffect(() => {
    getMyRides();
  }, [connectedAccount]);

  const completed = async (rideId) => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const CarPoolingContract = new ethers.Contract(
      contractAddress,
      contractABI,
      signer
    );
    console.log(rideId);

    if (role === "driver") {
      try {
        const txn = await CarPoolingContract.rideCompleted(rideId);
        await txn.wait();
        console.log(txn);
      } catch (err) {
        const decodedError = await errorDecoder.decode(err);
        alert(decodedError.args[0]);
      }
    } else {
      const txn = await CarPoolingContract.updateStatus(rideId);
      console.log(txn);
    }
  };

  return (
    <div>
      {role === "not chosen" ? (
        <h1>Please either register as a driver or a passenger first</h1>
      ) : (
        myRides.map((ride) => (
          <MyRidesCard
            key={ride.rideId}
            ride={ride}
            cancelRide={cancelRide}
            completed={completed}
          />
        ))
      )}
    </div>
  );
};

export default MyRides;
