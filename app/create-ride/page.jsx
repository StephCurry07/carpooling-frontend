"use client";

import React from "react";
import { useState, useEffect } from "react";
import styles from "../styles/user-registration.module.css";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { LocalizationProvider } from "@mui/x-date-pickers";
import DateTimePicker from "@app/components/DateTimePicker";

import { ethers } from "ethers";
import abi from "../../utils/CarPooling.json";
import { waitUntilSymbol } from "next/dist/server/web/spec-extension/fetch-event";
import SelectInput from "@mui/material/Select/SelectInput";
import { CLIENT_STATIC_FILES_RUNTIME_MAIN_APP } from "next/dist/shared/lib/constants";

const contractAddress = abi.contractAddress;
const contractABI = abi.abi;

const createRide = () => {
  const [selectedTime, setSelectedTime] = useState("");
  const [tripDetails, setTripDetails] = useState("");
  const [acNonAc, setAcNonAc] = useState("AC");
  const [maxPassengers, setMaxPassengers] = useState(0);
  const [formData, setFormData] = useState("");
  const [value, setValue] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [flag, setFlag] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleChangePass = (e) => {
    const inputValue = parseInt(e.target.value);
    if (inputValue == 1) {
      setFlag(1);
    }
    if (
      (inputValue <= 1 && flag == 1) ||
      (inputValue >= formData.carCapacity && flag == 1)
    ) {
      setErrorMessage("Value must be between 1 and max capacity");
    } else {
      setErrorMessage("");
      setValue(inputValue);
    }
    setValue(parseInt(e.target.value));
    setFormData({ ...formData, [e.target.name]: inputValue });
  };

  const handleChangeRad = (e) => {
    setAcNonAc(e.target.value);
  };

  const handleTimeChange = (e) => {
    console.log(parseInt(e.target.value));
    setSelectedTime(e.target.value);
  };

  useEffect(() => {
    if (!formData) {
      const params = new URLSearchParams(window.location.search);
      const formDataParam = params.get("formData");
      if (formDataParam) {
        setFormData(JSON.parse(formDataParam));
      }
    }
  }, []);

  useEffect(() => {
    if (formData) {
      setMaxPassengers(formData.carCapacity);
    }
  }, [formData, tripDetails]);

  useEffect(() => {
    // This effect will run whenever myVariable changes
    if (tripDetails != "") {
      // Perform actions here once myVariable changes to true
      createNewRide();
    }
  }, [tripDetails]);

  const createNewRide = async () => {
    try {
      // const provider = new ethers.JsonRpcProvider('http://localhost:8545')
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const CarPoolingContract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );
      //console.log(selectedTime);
      console.log(tripDetails);
      await CarPoolingContract.createRide(
        maxPassengers,
        // formData.rideFare,
        1, // to be implemented
        BigInt(selectedTime),
        tripDetails
      );
      alert("Ride created successfully!");
    } catch (error) {
      console.log("Error creating ride:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Car details
    const newCarDetails = `${formData.carName} ${
      formData.maxPassengers || maxPassengers
    } Seater ${acNonAc}`;
    // setCarDetails(newCarDetails);
    // console.log('Car details:', newCarDetails);

    // Trip details
    const newTripDetails = `Source: ${formData.source} + Destination: ${formData.destination} + Car Details: ${newCarDetails} + Driver Details: ${formData.name}-${formData.age}-${formData.gender} + PickupPoint: TBD + Distance: 2km + Gas Price: 100`;

    setTripDetails(newTripDetails);
    //console.log('Trip details:', newTripDetails);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <div className={styles.container}>
        <h1>Confirm Ride details:</h1>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Name:</label>
            <input
              type="text"
              name="name"
              defaultValue={formData.name}
              disabled
              className={styles.inputField}
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Age:</label>
            <input
              type="text"
              name="age"
              defaultValue={formData.age}
              disabled
              className={styles.inputField}
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Gender:</label>
            <input
              type="text"
              name="gender"
              defaultValue={formData.gender}
              disabled
              className={styles.inputField}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Phone:</label>
            <input
              type="text"
              name="phone"
              defaultValue={formData.phone}
              disabled
              className={styles.inputField}
            />
          </div>
          <div className={styles.carInput}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Car:</label>
              <input
                type="text"
                name="car"
                defaultValue={formData.carName}
                disabled
                className={styles.inputField}
              />
            </div>
            <div className={styles.acNonAc}>
              <input
                type="radio"
                name="acNonAc"
                value="AC"
                defaultChecked={true}
                onChange={handleChangeRad}
              />{" "}
              AC
              <input
                type="radio"
                name="acNonAc"
                value="Non-AC"
                onChange={handleChangeRad}
              />{" "}
              Non-AC
            </div>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}> Seats Available </label>
            <input
              type="number"
              name="maxPassengers"
              defaultValue={formData.carCapacity}
              min={1}
              max={formData.carCapacity}
              onChange={handleChangePass}
              className={styles.inputField}
            />
            {errorMessage && (
              <p style={{ color: "red", fontSize: "12px" }}>{errorMessage}</p>
            )}
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Source:</label>
            <input
              type="text"
              name="source"
              className={styles.inputField}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Destination:</label>
            <input
              type="text"
              name="destination"
              className={styles.inputField}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <DateTimePicker value={selectedTime} onChange={handleTimeChange} />
          </div>
          <br />
          <button type="submit" className={`${styles.submitButton}`}>
            Submit
          </button>
        </form>
      </div>
    </LocalizationProvider>
  );
};

export default createRide;
