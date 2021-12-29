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
    const addressQuery = query(collection(db, "addresses"));
    const phoneNumberQuery = query(collection(db, "phoneNumbers"));

    let isListeningToSnapshot = false;
    let isMounted = true;

    const getCustomers = async () => {
      const [
        customersSnapshot,
        regionsSnapshot,
        addressesSnapshot,
        phoneNumbersSnapshot,
      ] = await Promise.all([
        getDocs(customerQuery),
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
      for (const customerDoc of customersSnapshot.docs) {
        const address = addresses.find(
          (address) => address.id === customerDoc.id
        );
        const phoneNumber = phoneNumbers.find(
          (phoneNumber) => phoneNumber.id === customerDoc.id
        );
        const customer = {
          id: customerDoc.id,
          ...customerDoc.data(),
          address: address ? address : {},
          phone: phoneNumber ? phoneNumber : {},
        };
        customerArray.push(customer);
      }
      if (isMounted) {
        setCustomers(customerArray);
        setRegions(regions);
      }
    };

    const unsubCustomerSnapshot = onSnapshot(customerQuery, async () => {
      if (!isListeningToSnapshot) {
        isListeningToSnapshot = true;
        await getCustomers(customerQuery);
        isListeningToSnapshot = false;
      }
    });
    const unsubAddressSnapshot = onSnapshot(addressQuery, async () => {
      if (!isListeningToSnapshot) {
        isListeningToSnapshot = true;
        await getCustomers(customerQuery);
        isListeningToSnapshot = false;
      }
    });
    const unsubPhoneNumberSnapshot = onSnapshot(phoneNumberQuery, async () => {
      if (!isListeningToSnapshot) {
        isListeningToSnapshot = true;
        await getCustomers(customerQuery);
        isListeningToSnapshot = false;
      }
    });

    return () => {
      isMounted = false;
      unsubCustomerSnapshot();
      unsubAddressSnapshot();
      unsubPhoneNumberSnapshot();
    };
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
