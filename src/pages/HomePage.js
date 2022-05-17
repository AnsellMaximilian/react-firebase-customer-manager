import React, { useState, useEffect } from "react";
import PulseLoader from "react-spinners/PulseLoader";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "../config/firebase";
import { Header } from "../components/Header";
import { CustomerList } from "../components/CustomerList";

export const HomePage = () => {
  const [customers, setCustomers] = useState([]);
  const [regions, setRegions] = useState([]);

  useEffect(() => {
    const unsubCustomers = onSnapshot(
      query(collection(db, "customers"), orderBy("name")),
      (customersSnapshot) => {
        const customers = customersSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCustomers(customers);
      }
    );
    const unsubRegions = onSnapshot(
      collection(db, "regions"),
      (regionsSnapshot) => {
        const regions = regionsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setRegions(regions);
      }
    );
    return () => {
      unsubCustomers();
      unsubRegions();
    };
  }, []);

  return (
    <div>
      <Header />
      <div className="px-4 mt-4 container mx-auto">
        {customers.length === 0 || regions.length === 0 ? (
          <div>
            <div className="font-bold text-2xl mb-4">Loading customers...</div>
            <PulseLoader color="rgb(21 128 61)" size={25} />
          </div>
        ) : (
          <CustomerList customers={customers} regions={regions} />
        )}
      </div>
    </div>
  );
};
