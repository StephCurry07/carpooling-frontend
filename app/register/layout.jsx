"use client";
import React from "react";
import Header from "../components/Header";
import { useSearchParams } from "next/navigation";

const registerlayout = ({ children }) => {
  const searchParams = useSearchParams();
  const connectedAccount = searchParams.get("connectedAccount");
  return (
    <div>
      <Header connectedAccount={connectedAccount} />
      {children}
    </div>
  );
};

export default registerlayout;
