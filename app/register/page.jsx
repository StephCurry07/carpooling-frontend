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
          Welcome aboard! As a driver, you're in control of your journey. Register with us and provide essential details about your ride: the starting point and destination, the maximum number of passengers your vehicle can accommodate, and your car's specifications. Once registered, our system automatically calculates the fare based on the distance between your chosen source and destination. As passengers join your ride and mark it as completed, the corresponding fare is credited directly into your account. With our seamless process, you can focus on providing a safe and enjoyable journey while we handle the rest.
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
          Registering as a passenger will give you access to a list of all the available rides to choose from along with filters to find the right ride for you. Booking a ride will immediately deduct the dynamically set ride fare amount from your account. Once completed, the ride's status can be updated to completed.
        </p>

        <Link href="/passenger">
          <button className="btn-connect" style={{ marginTop: "auto" }}>
            Register as Passenger
          </button>
        </Link>
      </div>
    </div>
  );
};

export default RegisterPage;
