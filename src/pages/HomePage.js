import React, {
  useState,
  useEffect,
  useContext,
  useRef,
  useCallback,
} from "react";
import PulseLoader from "react-spinners/PulseLoader";
import { collection, query, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";
import { Header } from "../components/Header";
import { CustomerList } from "../components/CustomerList";
import { SnackbarContext } from "../contexts/SnackbarContext";

export const HomePage = () => {
  const [customers, setCustomers] = useState([]);
  const [regions, setRegions] = useState([]);
  const snackbarContextRef = useRef(useContext(SnackbarContext));

  const getCustomers = useCallback(async () => {
    try {
      const customerQuery = query(collection(db, "customers"));

      const customers = (await getDocs(customerQuery)).docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const regions = (await getDocs(collection(db, "regions"))).docs.map(
        (doc) => ({
          id: doc.id,
          ...doc.data(),
        })
      );

      setCustomers(customers);
      setRegions(regions);
    } catch (error) {
      snackbarContextRef.current.openSnackbar(error.message, "danger");
    }
  }, []);

  useEffect(() => {
    getCustomers();

    return () => {};
  }, [getCustomers]);

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
          <CustomerList
            customers={customers}
            regions={regions}
            getCustomers={getCustomers}
          />
        )}
      </div>
    </div>
  );
};
