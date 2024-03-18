"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { ethers } from "ethers";
import MyRidesCard from "@app/components/MyRidesCard";
import abi from "../../utils/CarPooling.json";

const MyRides = () => {
  const [myRides, setMyRides] = useState([]);
  const searchParams = useSearchParams();
  const connectedAccount = searchParams.get("connectedAccount");
  const role = searchParams.get("role");

  const contractAddress = "0x561002b9991332045E465440b981a32914F935c9";
  const contractABI = abi.abi;
  const getMyRides = async () => {
    if (window.ethereum && connectedAccount) {
      const provider = new ethers.BrowserProvider(ethereum);
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

      // let rideFiltered = [];

      // if (role === "driver") {
      //   rideFiltered = rideConverted.filter(
      //     (ride) => ride.driver === connectedAccount
      //   );
      // } else {
      //   rideFiltered = rideConverted.filter((ride) =>
      //     connectedAccount.match(ride.driver)
      //   );
      // }

      // console.log(rideFiltered);

      setMyRides(rideConverted);
    }
  };

  const cancelRide = async (rideId) => {
    const provider = new ethers.BrowserProvider(ethereum);
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

  const updateStatus = async (rideId) => {};

  const rideCompleted = async (rideId) => {};
  useEffect(() => {
    getMyRides();
  }, [connectedAccount]);

  return (
    <div>
      <h1>My rides:</h1> <br />
      {role === "not chosen" ? (
        <h1>Please either register as a driver or a passenger first</h1>
      ) : (
        myRides.map((ride) => (
          <MyRidesCard key={ride.rideId} ride={ride} cancelRide={cancelRide} />
        ))
      )}
    </div>
  );
};

export default MyRides;
