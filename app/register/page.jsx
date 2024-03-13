"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

const RegisterPage = () => {
  return (
    <div className="registerContainer">
      <div className="register-card">
        <Image
          src="/images/driver.jpg"
          alt="Driver image"
          width={180}
          height={150}
        />
        <p
          style={{
            textAlign: "justify",
            paddingLeft: "10px",
            paddingRight: "10px",
          }}
        >
          Register yourself as a driver and provide details for your ride like
          source and destination ,max passengers, car details etc. The ride fare
          will be calculated automatically using source and destination
          distance. Money will be credited into your account once the ride is
          successfully marked completed by each passenger.
        </p>
        <button className="btn-connect" style={{ marginTop: "auto" }}>
          Register as Driver
        </button>
      </div>
      <div className="register-card">
        <Image
          src="/images/passenger.jpg"
          alt="Passenger image"
          width={150}
          height={150}
        />
        <p
          style={{
            textAlign: "justify",
            paddingLeft: "10px",
            paddingRight: "10px",
          }}
        >
          Registering as a passenger will give you access to a list of all the
          available rides to choose from along with filters to find the right
          ride for you. Booking a ride will immediately deduct the dynamically
          set ride fare amount from your account. Once completed, the ride's
          status can be updated to completed.
        </p>
        <button className="btn-connect" style={{ marginTop: "auto" }}>
          Register as Passenger
        </button>
        </Link>
      </div>
    </div>
  );
};

export default RegisterPage;
