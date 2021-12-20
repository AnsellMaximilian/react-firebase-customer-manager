import React, { useState } from "react";
import { useEffect } from "react/cjs/react.development";
import { CustomerTable } from "../components/CustomerTable";
import PropagateLoader from "react-spinners/PropagateLoader";
import {
  onSnapshot,
  collection,
  limit,
  query,
  getDoc,
  doc,
} from "firebase/firestore";
import { db } from "../config/firebase";

export const HomePage = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const customerQuery = query(collection(db, "customers"), limit(20));
    const unsub = onSnapshot(customerQuery, async (querySnapshot) => {
      const customerArray = [];
      for (const customerDoc of querySnapshot.docs) {
        const addressDoc = await getDoc(
          doc(db, customerDoc.ref.path, "sensitive", "address")
        );
        const phoneDoc = await getDoc(
          doc(db, customerDoc.ref.path, "sensitive", "phone")
        );
        const customer = {
          id: customerDoc.id,
          ...customerDoc.data(),
          address: {
            ...addressDoc.data(),
          },
          phone: {
            ...phoneDoc.data(),
          },
        };
        customerArray.push(customer);
      }
      setCustomers(customerArray);
    });

    return () => unsub();
  }, []);

  return (
    <div>
      <h1>Home Page</h1>
      <div className="px-8">
        {customers.length === 0 ? (
          <PropagateLoader />
        ) : (
          <CustomerTable customers={customers} />
        )}
      </div>
    </div>
  );
};
