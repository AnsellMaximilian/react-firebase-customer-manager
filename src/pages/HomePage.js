import React, { useState } from "react";
import { useEffect } from "react/cjs/react.development";
import { CustomerTable } from "../components/CustomerTable";

export const HomePage = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {}, []);

  return (
    <div>
      <h1>Home Page</h1>
      <CustomerTable />
    </div>
  );
};
