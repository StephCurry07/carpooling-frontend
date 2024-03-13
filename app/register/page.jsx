import React from "react";
import Image from "next/image";
import connectedAccount from "../page";
import Header from "../components/Header";

const registerPage = () => {
  return (
    <div className="registerContainer">
      <Header
        role={"not chosen"}
        connectedAccount={connectedAccount}
        balance={50}
      />
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
        ></p>
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
          Registering as a passenger will give you access to list of all the
          available rides to choose from along with the filters to find the
          right ride for you. Booking ride will immediately deduct the
          dynamically set ride fare amount from your account. Once completed the
          ride's status can be updated to completed.
        </p>

        <button className="btn-connect" style={{ marginTop: "auto" }}>
          Register as Passenger
        </button>
      </div>
    </div>
  );
};

export default registerPage;
