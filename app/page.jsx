"use client";

import { useEffect, useState } from "react";
import PrimaryButton from "./components/PrimaryButton";
import abi from "../utils/CarPooling.json";
import { ethers } from "ethers";

const HomePage = () => {
  const [ethereum, setEthereum] = useState(undefined);
  const [connectedAccount, setConnectedAccount] = useState(undefined);
  const [rides, setRides] = useState([]);

  const contractAddress = "0x31Fb98F3FB93daA385Ee2c62dC8DB88d0Fbd8cAF";
  const contractABI = abi.abi;

  const handleAccounts = (accounts) => {
    if (accounts.length > 0) {
      const account = accounts[0];
      console.log("We have an authorized account: ", account);
      setConnectedAccount(account);
    } else {
      console.log("No authorized accounts yet");
    }
  };

  const getConnectedAccount = async () => {
    if (window.ethereum) {
      setEthereum(window.ethereum);
    }

    if (ethereum) {
      const accounts = await ethereum.request({ method: "eth_accounts" });
      handleAccounts(accounts);
    }
  };
  useEffect(() => {
    getConnectedAccount();
  }, []);

  const getRides = async () => {
    if (ethereum && connectedAccount) {
      const provider = new ethers.BrowserProvider(ethereum);
      const signer = await provider.getSigner();
      const CarPoolingContract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );

      const rides = await CarPoolingContract.getAllRides();
      //console.log("Retrieved Rides...", rides);
      setRides(rides);
    }
  };
  useEffect(() => {
    getRides();
  }, [connectedAccount]);

  const connectAccount = async () => {
    if (!ethereum) {
      alert("MetaMask is required to connect an account");
      return;
    }

    const accounts = await ethereum.request({ method: "eth_requestAccounts" });
    handleAccounts(accounts);
  };

  if (!ethereum) {
    return <p>Please install MetaMask to connect to this site</p>;
  }

  if (!connectedAccount) {
    return (
      <PrimaryButton onClick={connectAccount}>
        Connect MetaMask Wallet
      </PrimaryButton>
    );
  }

  return (
    <div>
      <p>Connected Account: {connectedAccount}</p>
      {rides.map((ride) => console.log(ride))}
    </div>
  );
};

export default HomePage;
