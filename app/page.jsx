"use client";

import { useEffect, useState } from "react";
import PrimaryButton from "./components/PrimaryButton";
import Link from "next/link";
import Image from "next/image";
// import abi from "../utils/CarPooling.json";
//import { ethers } from "ethers";

const HomePage = () => {
  const [ethereum, setEthereum] = useState(undefined);
  const [connectedAccount, setConnectedAccount] = useState(undefined);
  // const [rides, setRides] = useState([]);

  // const contractAddress = "0x31Fb98F3FB93daA385Ee2c62dC8DB88d0Fbd8cAF";
  // const contractABI = abi.abi;

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

  // const getRides = async () => {
  //   if (ethereum && connectedAccount) {
  //     const provider = new ethers.BrowserProvider(ethereum);
  //     const signer = await provider.getSigner();
  //     const CarPoolingContract = new ethers.Contract(
  //       contractAddress,
  //       contractABI,
  //       signer
  //     );

  //     const rides = await CarPoolingContract.getAllRides();
  //     //console.log("Retrieved Rides...", rides);
  //     setRides(rides);
  //   }
  // };
  // useEffect(() => {
  //   getRides();
  // }, [connectedAccount]);

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

  return (
    <div className="imageContainer">
      <Image
        src="/images/carpooling.svg"
        alt="Carpooling home page image"
        width={200}
        height={200}
        className="image"
      />
      {!connectedAccount ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "center",
          }}
        >
          <h1>Welcome to Ride Sharing Platform</h1>
          <p>
            Want to do something nice for the environment and also save some
            money ? <br />
            Don't worry we got you !! But before we begin we need to connect
            your <br />
            metamask wallet so go ahead and do that and we'll see you on the
            other side.
          </p>
          <PrimaryButton onClick={connectAccount}>
            Connect MetaMask Wallet
          </PrimaryButton>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "center",
          }}
        >
          <h1>Welcome to Ride Sharing Platform</h1>
          <p>
            Great! Now you can click on the link below to Register yourselves{" "}
            <br />
            as either a Driver or a Passenger for the current session and get
            started.
          </p>
          <p>Connected Account: {connectedAccount}</p>
          <Link href="/register">Register yourselves for the session</Link>
        </div>
      )}
    </div>
  );
};

export default HomePage;
