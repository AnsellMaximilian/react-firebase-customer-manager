import React, { useState, useEffect, useContext, useRef } from "react";
import PulseLoader from "react-spinners/PulseLoader";
import { onSnapshot, collection, query, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";
import { Header } from "../components/Header";
import { CustomerList } from "../components/CustomerList";
import { SnackbarContext } from "../contexts/SnackbarContext";

export const HomePage = () => {
  const [customers, setCustomers] = useState([]);
  const [regions, setRegions] = useState([]);
  const snackbarContextRef = useRef(useContext(SnackbarContext));

  useEffect(() => {
    const customerQuery = query(collection(db, "customers"));
    const addressQuery = query(collection(db, "addresses"));
    const phoneNumberQuery = query(collection(db, "phoneNumbers"));

    let isListeningToSnapshot = false;
    let isMounted = true;

    const getCustomers = async () => {
      console.log("getting customers...");
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

    const handleOnSnapshot = async () => {
      if (!isListeningToSnapshot) {
        isListeningToSnapshot = true;
        await getCustomers(customerQuery);
        isListeningToSnapshot = false;
      }
    };

    const handleOnSnapshotError = (err) => {
      snackbarContextRef.current.openSnackbar(err.message, "danger");
    };

    const unsubCustomerSnapshot = onSnapshot(
      customerQuery,
      handleOnSnapshot,
      handleOnSnapshotError
    );
    const unsubAddressSnapshot = onSnapshot(
      addressQuery,
      handleOnSnapshot,
      handleOnSnapshotError
    );
    const unsubPhoneNumberSnapshot = onSnapshot(
      phoneNumberQuery,
      handleOnSnapshot,
      handleOnSnapshotError
    );

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
