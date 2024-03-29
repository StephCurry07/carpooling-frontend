"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { ethers } from "ethers";
import MyRidesCard from "@app/components/MyRidesCard";
import abi from "../../utils/CarPooling.json";
import { ErrorDecoder } from "ethers-decode-error";

const MyRides = () => {
  const [myRides, setMyRides] = useState([]);
  const [exchangeRate, setExchangeRate] = useState({});
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

      const response = await fetch(
        "https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD&api_key=4baa560324eaf1de14b1960925c15ee24180733839c0772f85a0f939d293c5f1"
      );

      const jsonData = await response.json();
      console.log(jsonData.USD);
      setExchangeRate(jsonData);
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

  const completed = async (rideId, startTime) => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const CarPoolingContract = new ethers.Contract(
      contractAddress,
      contractABI,
      signer
    );
    console.log(rideId, startTime);

    const currentDateTime = new Date(Date.now());
    const currentDateTimeUTC = new Date(
      currentDateTime.getTime() + currentDateTime.getTimezoneOffset() * 60000
    );

    const currentTimeSeconds = Math.floor(currentDateTimeUTC.getTime() / 1000);
    if (currentTimeSeconds - Number(startTime) < 0) {
      alert("You can only perform this action after the ride is started");
      return;
    }

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

  useEffect(() => {
    getMyRides();
  }, [connectedAccount]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {role === "not chosen" ? (
        <h1>Please either register as a driver or a passenger first</h1>
      ) : (
        myRides.map((ride) => (
          <MyRidesCard
            key={ride.rideId}
            ride={ride}
            cancelRide={cancelRide}
            completed={completed}
            role={role}
            exchangeRate={exchangeRate}
          />
        ))
      )}
    </div>
  );
};

export default MyRides;
