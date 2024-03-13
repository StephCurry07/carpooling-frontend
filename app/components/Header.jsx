import React from "react";
import Link from "next/link";

const Header = ({ role, balance, connectedAccount }) => {
  return (
    <header className="header">
      <div className="header-ele">
        <Link
          href="/"
          style={{ color: "yellow", textAlign: "center", fontWeight: "bold" }}
        >
          Home
        </Link>
      </div>
      <div className="header-ele">
        <Link
          href="/register"
          style={{ color: "yellow", textAlign: "center", fontWeight: "bold" }}
        >
          Change Role
        </Link>
      </div>
      <div className="header-ele">
        <Link
          href="/"
          style={{ color: "yellow", textAlign: "center", fontWeight: "bold" }}
        >
          My rides
        </Link>
      </div>
      <div className="header-ele">
        <p style={{ color: "yellow", textAlign: "center", fontWeight: "bold" }}>
          Role : {role}
        </p>
      </div>
      <div className="header-ele">
        <p style={{ color: "yellow", textAlign: "center", fontWeight: "bold" }}>
          Balance : {balance}
        </p>
      </div>
      <div className="header-ele">
        <p style={{ color: "yellow", textAlign: "center", fontWeight: "bold" }}>
          Connected Acc. : {connectedAccount}
        </p>
      </div>
    </header>
  );
};

export default Header;
