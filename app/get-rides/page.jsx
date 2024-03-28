"use client";
import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import GetRidesCard from "@app/components/GetRidesCard";
import abi from "../../utils/CarPooling.json";
import styles from "../styles/get-rides.module.css";
import { useSearchParams } from "next/navigation";
import { ErrorDecoder } from "ethers-decode-error";

const GetRides = () => {
  const [allRides, setAllRides] = useState([]);
  const [exchangeRate, setExchangeRate] = useState({});
  const [filteredRides, setFilteredRides] = useState([]);
  const [sourceFilter, setSourceFilter] = useState("");
  const [destinationFilter, setDestinationFilter] = useState("");
  const contractAddress = abi.contractAddress;
  const contractABI = abi.abi;
  const searchParams = useSearchParams();
  const connectedAccount = searchParams.get("connectedAccount");
  const balance = searchParams.get("balance");
  const errorDecoder = ErrorDecoder.create([contractABI]);

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
      setFilteredRides(rideConverted);

      const response = await fetch(
        "https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD&api_key=4baa560324eaf1de14b1960925c15ee24180733839c0772f85a0f939d293c5f1"
      );

      const jsonData = await response.json();
      console.log(jsonData.USD);
      setExchangeRate(jsonData);
    }
      
  };

  useEffect(() => {
    getAllRides();
  }, []);

  const extractSourceAndDestination = (details) => {
    const keyValuePairs = details.split(" + ");
    let source = "";
    let destination = "";
    keyValuePairs.forEach((pair) => {
      const [key, value] = pair.split(": ");
      if (key === "Source") {
        source = value;
      } else if (key === "Destination") {
        destination = value;
      }
    });
    return { source, destination };
  };

  useEffect(() => {
    const filtered = allRides.filter((ride) => {
      const { source, destination } = extractSourceAndDestination(
        ride.tDetails
      );
      return (
        (!sourceFilter || source === sourceFilter) &&
        (!destinationFilter || destination === destinationFilter)
      );
    });
    setFilteredRides(filtered);
  }, [sourceFilter, destinationFilter, allRides]);

  const bookRide = async (rideId, rideFare) => {
    try {
      const provider = new ethers.BrowserProvider(ethereum);
      const signer = await provider.getSigner();
      const CarPoolingContract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );
      console.log(rideId);
      const value = rideFare.toString();
      const txn = await CarPoolingContract.bookRide(rideId, { value });
      await txn.wait();
      console.log(txn.toString());

      if (txn) {
        alert("Transaction successful");
        window.location.href = `/ride-booked?connectedAccount=${connectedAccount}&balance=${balance}&role=passenger`;
      }
    } catch (error) {
      const decodedError = await errorDecoder.decode(error);
      alert(decodedError.args[0]);
    }
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.filterContainer}>
        <div>
          <label htmlFor="sourceFilter"><strong>Source:</strong></label>
          <select
            id="sourceFilter"
            value={sourceFilter}
            onChange={(e) => setSourceFilter(e.target.value)}
          >
            <option value="">Select Source</option>
            {allRides.map((ride) => {
              const { source } = extractSourceAndDestination(ride.tDetails);
              return (
                <option key={source} value={source}>
                  {source}
                </option>
              );
            })}
          </select>
        </div>
        <div>
          <label htmlFor="destinationFilter"><strong>Destination</strong></label>
          <select
            id="destinationFilter"
            value={destinationFilter}
            onChange={(e) => setDestinationFilter(e.target.value)}
          >
            <option value="">Select Destination</option>
            {allRides.map((ride) => {
              const { destination } = extractSourceAndDestination(
                ride.tDetails
              );
              return (
                <option key={destination} value={destination}>
                  {destination}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <div className={styles.cardContainer}>
        {filteredRides.map((ride) => (
          <GetRidesCard key={ride.rideId} ride={ride} bookRide={bookRide} exchangeRate={exchangeRate}/>
        ))}
      </div>
    </div>
  );
};

export default GetRides;
