"use client";
import React from "react";
import Header from "../components/Header";
import { useSearchParams } from "next/navigation";

const registerlayout = ({ children }) => {
  const searchParams = useSearchParams();
  var connectedAccount = searchParams.get("connectedAccount");
  connectedAccount =
    connectedAccount.substring(0, 7) + "..." + connectedAccount.substring(37);
  const balance = searchParams.get("balance") + " ETH";
  const role = searchParams.get("role");
  return (
    <div>
      <Header
        connectedAccount={connectedAccount}
        balance={balance}
        role={role}
      />
      {children}
    </div>
  );
};

export default registerlayout;
