import React from "react";
import Link from "next/link";

const Header = ({ role, balance, connectedAccount }) => {
  const _connectedAccount =
    connectedAccount.substring(0, 7) + "..." + connectedAccount.substring(37);
  const _balance = balance + " ETH";

  return (
    <header className="header">
      <div className="header-ele">
        <div className="header-ele-links">
          <Link href="/" className="link-text">
            Home
          </Link>
        </div>
      </div>
      <div className="header-ele">
        <div className="header-ele-links">
          <Link
            href={{
              pathname: "/register",
              query: {
                connectedAccount: connectedAccount,
                balance: balance,
                role: role,
              },
            }}
            className="link-text"
          >
            Change Role
          </Link>
        </div>
      </div>
      <div className="header-ele">
        <div className="header-ele-links">
          <Link
            href={{
              pathname: "/my-rides",
              query: {
                connectedAccount: connectedAccount,
                balance: balance,
                role: role,
              },
            }}
            className="link-text"
          >
            My rides
          </Link>
        </div>
      </div>
      <div className="header-ele">
        <p style={{ color: "yellow", textAlign: "center", fontWeight: "bold" }}>
          Role : {role}
        </p>
      </div>
      <div className="header-ele">
        <p style={{ color: "yellow", textAlign: "center", fontWeight: "bold" }}>
          Balance : {_balance}
        </p>
      </div>
      <div className="header-ele">
        <p style={{ color: "yellow", textAlign: "center", fontWeight: "bold" }}>
          Connected Acc. : {_connectedAccount}
        </p>
      </div>
    </header>
  );
};

export default Header;
