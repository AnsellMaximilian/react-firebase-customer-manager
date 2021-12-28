import React, { useState, useEffect } from "react";
import PropagateLoader from "react-spinners/PropagateLoader";
import {
  onSnapshot,
  collection,
  limit,
  query,
  getDocs,
} from "firebase/firestore";
import { db } from "../config/firebase";
import { Header } from "../components/Header";
import { CustomerList } from "../components/CustomerList";

export const HomePage = () => {
  const [customers, setCustomers] = useState([]);
  const [regions, setRegions] = useState([]);

  useEffect(() => {
    const customerQuery = query(collection(db, "customers"), limit(5));
    const unsub = onSnapshot(customerQuery, async (querySnapshot) => {
      // console.log("On snapshotting....");
      const [regionsSnapshot, addressesSnapshot, phoneNumbersSnapshot] =
        await Promise.all([
          getDocs(collection(db, "regions")),
          getDocs(collection(db, "addresses")),
          getDocs(collection(db, "phoneNumbers")),
        ]);
      const regions = regionsSnapshot.docs.map((region) => ({
        id: region.id,
        ...region.data(),
      }));

      const addresses = addressesSnapshot.docs.map((address) => ({
        id: address.id,
        ...address.data(),
      }));

      const phoneNumbers = phoneNumbersSnapshot.docs.map((phoneNumber) => ({
        id: phoneNumber.id,
        ...phoneNumber.data(),
      }));

      const customerArray = [];
      for (const customerDoc of querySnapshot.docs) {
        const address = addresses.find(
          (address) => address.id === customerDoc.id
        );
        const phoneNumber = phoneNumbers.find(
          (phoneNumber) => phoneNumber.id === customerDoc.id
        );
        const customer = {
          id: customerDoc.id,
          ...customerDoc.data(),
          address,
          phone: phoneNumber,
        };
        customerArray.push(customer);
      }
      setCustomers(customerArray);
      setRegions(regions);
    });

    return () => unsub();
  }, []);

  return (
    <div>
      <Header />
      <div className="px-4 mt-4 container mx-auto">
        {customers.length === 0 || regions.length === 0 ? (
          <PropagateLoader />
        ) : (
          <CustomerList customers={customers} regions={regions} />
        )}
      </div>
    </div>
  );
};
