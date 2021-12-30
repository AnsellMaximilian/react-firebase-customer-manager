import React, { useState, useEffect, useContext } from "react";
import CircleLoader from "react-spinners/CircleLoader";
import {
  updateDoc,
  doc,
  setDoc,
  Timestamp,
  collection,
  addDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../config/firebase";
import clearProperties from "../utils/clearProperties";
import { SnackbarContext } from "../contexts/SnackbarContext";
import { CustomerMapValue } from "./CustomerDetails/CustomerMapValue";

export const CustomerDetails = ({
  customer,
  onClose,
  isNew,
  regions,
  getCustomers,
}) => {
  const [isEditMode, setIsEditMode] = useState(isNew || false);
  const [addresses, setAddresses] = useState(null);
  const [phoneNumbers, setPhoneNumbers] = useState(null);
  const [customerName, setCustomerName] = useState("");
  const [customerRegion, setCustomerRegion] = useState(null);
  const [newAddress, setNewAddress] = useState(null);
  const [newPhoneNumber, setNewPhoneNumber] = useState(null);

  const { openSnackbar } = useContext(SnackbarContext);

  const updateCustomer = async (customerId) => {
    setIsEditMode(false);
    if (!customerName || !customerRegion) {
      openSnackbar(
        "Either customer name or region was empty. Operation was cancelled.",
        "danger"
      );
      return;
    }
    try {
      await updateDoc(doc(db, "customers", customerId), {
        name: customerName,
        region: customerRegion,
      });

      await setDoc(
        doc(db, "addresses", customerId),
        clearProperties(addresses, ["id"])
      );

      await setDoc(
        doc(db, "phoneNumbers", customerId),
        clearProperties(phoneNumbers, ["id"])
      );
      getCustomers();

      openSnackbar(`Updated customer "${customerName}"`, "success");
    } catch (error) {
      openSnackbar("Something happened. Failed to update.", "danger");
    }
  };

  const createCustomer = async () => {
    onClose();
    if (!customerName || !customerRegion) {
      openSnackbar(
        "Either customer name or region was empty. Operation was cancelled.",
        "danger"
      );
      return;
    }
    try {
      const cusDocRef = await addDoc(collection(db, "customers"), {
        name: customerName,
        region: customerRegion,
        createdAt: Timestamp.now(),
      });

      await setDoc(
        doc(db, "addresses", cusDocRef.id),
        clearProperties(addresses, ["id"])
      );

      await setDoc(
        doc(db, "phoneNumbers", cusDocRef.id),
        clearProperties(phoneNumbers, ["id"])
      );
      getCustomers();

      openSnackbar(`Added customer "${customerName}"`, "success");
    } catch (error) {
      openSnackbar("Something happened. Failed to add.", "danger");
    }
  };

  const deleteCustomer = async (customerId) => {
    const confirmed = window.confirm("Are you sure?");
    if (confirmed) {
      onClose();

      try {
        await deleteDoc(doc(db, "customers", customerId));
        getCustomers();

        openSnackbar(`Deleted customer "${customerName}"`, "success");
      } catch (error) {
        openSnackbar("Something happened. Failed to delete.", "danger");
      }
    }
  };

  useEffect(() => {
    if (customer) {
      setAddresses(customer.address);
      setPhoneNumbers(customer.phone);
      setCustomerName(customer.name);
      setCustomerRegion(customer.region);
    }
  }, [customer]);

  return customer &&
    addresses &&
    phoneNumbers &&
    customerRegion &&
    regions.length > 0 ? (
    <div>
      <div className="text-right mb-4">
        <button
          className="ml-2 hover:text-black text-gray-600"
          onClick={onClose}
        >
          Close
        </button>
      </div>
      <div className="mb-4 flex justify-between flex-col md:flex-row">
        {isEditMode ? (
          <input
            placeholder="Customer Name"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            className="rounded-md border-gray-300 border p-1 focus:shadow-[0_0_0_1px_rgb(21,_128,_61)] shadow-green-700 outline-none"
          />
        ) : (
          <h2 className="text-2xl font-bold order-1 md:order-none">
            {customerName}
          </h2>
        )}
        {!isNew && (
          <div className="text-right">
            {!isEditMode && (
              <button
                className="text-red-600 hover:text-red-700"
                onClick={() => deleteCustomer(customer.id)}
              >
                Delete
              </button>
            )}
            <button
              className="text-green-600 ml-2 hover:text-green-700"
              onClick={() => setIsEditMode(!isEditMode)}
            >
              {isEditMode ? "Cancel Edit" : "Edit"}
            </button>
          </div>
        )}
      </div>
      <CustomerMapValue
        isEditMode={isEditMode}
        map={phoneNumbers}
        mapTitle="Phone Numbers"
        setMap={setPhoneNumbers}
        newMapValue={newPhoneNumber}
        setNewMapValue={setNewPhoneNumber}
      />
      <div className="mb-4">
        <h3 className="text-lg font-bold">Region</h3>
        <div>
          {isEditMode ? (
            <select
              className="rounded-md border-gray-300 border p-1 focus:shadow-[0_0_0_1px_rgb(21,_128,_61)] shadow-green-700 outline-none"
              value={customerRegion}
              onChange={(e) => setCustomerRegion(e.target.value)}
            >
              {regions.map((region) => (
                <option key={region.id} value={region.id}>
                  {region.name}
                </option>
              ))}
            </select>
          ) : (
            <div>
              {regions.find((region) => region.id === customerRegion).name}
            </div>
          )}
        </div>
      </div>
      <CustomerMapValue
        isEditMode={isEditMode}
        map={addresses}
        mapTitle="Addresses"
        setMap={setAddresses}
        newMapValue={newAddress}
        setNewMapValue={setNewAddress}
      />
      {isEditMode && (
        <div className="text-right">
          <button
            className="px-3 py-1 rounded-md bg-green-700 text-white font-bold"
            onClick={() => {
              if (isNew) {
                createCustomer();
              } else {
                updateCustomer(customer.id);
              }
            }}
          >
            Save Changes
          </button>
        </div>
      )}
    </div>
  ) : (
    <CircleLoader />
  );
};
